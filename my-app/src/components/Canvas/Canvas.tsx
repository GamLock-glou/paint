import React, { useEffect, useRef } from "react";
import styles from "./canvas.module.scss";
import { observer } from "mobx-react-lite";
import canvasState, { setCanvas } from "../../store/canvasState";
import { setTool } from "../../store/toolState";
import Brush from "../../tools/Brush";
import ModalWindow from "../ModalWindow/ModalWindow";
import { useParams } from "react-router-dom";
import { DrawMessage, MessageData } from "../../types/types";
import Rect from "../../tools/Rect";
import axios from "axios";

type ParamTypes = {
  id: string;
};

export const Canvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    setCanvas(canvasRef.current);
    let ctx = canvasRef?.current?.getContext('2d')
    axios.get(`http://192.168.100.9:5000/image?id=${id}`)
      .then(response => {
        const img = new Image()
        img.src = response.data.img
        img.onload = () => {
          // @ts-ignore
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
          // @ts-ignore
          ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
        }
      })
  }, []);
  const { id } = useParams<ParamTypes>();
  useEffect(() => {
    if (!id) return;
    if (canvasState.userName) {
      const socket = new WebSocket(`ws://192.168.100.9:5000/`);
      canvasState.setSocket(socket);
      canvasState.setSessionId(id);
      if (canvasRef.current) {
        setTool(new Brush(canvasRef.current, socket, id));
      }
      socket.onopen = () => {
        console.log("Connected");
        socket.send(
          JSON.stringify({
            id: id,
            userName: canvasState.userName,
            method: "connection",
          })
        );
      };

      socket.onmessage = (event) => {
        const msg: MessageData = JSON.parse(event.data);
        switch (msg.method) {
          case "connection":
            console.log(`${msg.userName} is connected`);
            break;
          case "draw":
            drawHandler(msg);
            break;
        }
      };
    }
  }, [canvasState.userName]);

  const drawHandler = (msg: DrawMessage) => {
    const figure = msg.figure;
    const ctx = canvasState.canvas?.getContext("2d") || null;
    switch (figure.type) {
      case "brush":
        Brush.draw(ctx, figure.x, figure.y);
        break;

      case "rect":
        Rect.draw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)
        ctx?.beginPath()
        break;

      case "finish":
        ctx?.beginPath()
        break;
    }
  };

  const onMouseDown = () => {
    if (canvasRef.current) {
      canvasState.pushToUndo(canvasRef.current.toDataURL());
    }
  };
  const onMouseUp = () => {
    if (canvasRef.current) {
      axios.post(`http://192.168.100.9:5000/image?id=${id}`, {img: canvasRef.current.toDataURL()})
      .then(console.log)
    }
  }
  return (
    <div className={styles.container}>
      <ModalWindow />
      <canvas
        className={styles.canvasWrapper}
        width={600}
        height={400}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        ref={canvasRef}
      />
    </div>
  );
});
