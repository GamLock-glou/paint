import express, { Express, Request, Response } from "express";
import expressWs from "express-ws";
import WebSocket from "ws";
import cors from "cors";
import fs from "fs";
import path from "path";

const { app, getWss } = expressWs(express());
const aWws = getWss();

const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

export type MessageData = ConnectionMessage | DrawMessage;

type ConnectionMessage = {
  method: "connection";
  id: number;
  userName: string;
};

export type DrawMessage = {
  method: "draw";
  id: number;
  userName: string;
  figure: FigureInDraw;
};

export type FigureInDraw = FigureBrush | FigureRect | FigureFinish

type FigureBrush = {
  type: "brush"
  x: number;
  y: number;
}

type FigureRect = {
  type: "rect"
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

type FigureFinish = {
  type: "finish"
}


app.ws("/", (wss, req) => {
  wss.on("message", (msg: string) => {
    const message: MessageData = JSON.parse(msg);
    switch (message.method) {
      case "connection":
        connectionHandler(wss, message);
        break;

      case "draw":
        broadcastConnection(wss, message);
        break;
    }
  });
});

function connectionHandler(ws: WebSocket, msg: ConnectionMessage) {
  (ws as any).id = msg.id;
  broadcastConnection(ws, msg);
}

function broadcastConnection(ws: WebSocket, msg: MessageData) {
  aWws.clients.forEach((client) => {
    if ((client as any).id === msg.id) {
      client.send(JSON.stringify(msg));
    }
  });
}

app.get('/image', (req, res) => {
  try {

    const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`))
    const data = {img: `data:image/png;base64,` + file.toString('base64')}
    res.json(data)
  } catch (e) {
      console.log(e)
      return res.status(500).json('error')
  }
})
app.post('/image', (req, res) => {
  try {
    const data = req.body.img.replace(`data:image/png;base64`, "");
    const file = path.resolve(__dirname, 'files', `${req.query.id}.jpg`);
    fs.writeFileSync(file, data, 'base64')
    return res.status(200).json({message: "good"})
  } catch (e) {
    console.log(e)
    return res.status(500).json("error")
  }
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
