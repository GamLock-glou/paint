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
