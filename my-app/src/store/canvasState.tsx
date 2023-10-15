import { makeAutoObservable } from "mobx";

class CanvasState {
  canvas: HTMLCanvasElement | null = null
  undoList: string[] = []
  redoList: string[] = []
  socket: WebSocket | undefined
  sessionId: string = ""
  userName: string = ""
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setCanvas(canvas: HTMLCanvasElement | null) {
    this.canvas = canvas
  }

  setUserName(userName: string) {
    this.userName = userName
  }

  setSessionId(sessionId: string) {
    this.sessionId = sessionId
  }

  setSocket(socket: WebSocket) {
    this.socket = socket
  }

  pushToUndo(data: string) {
    this.undoList.push(data)
  }

  pushToRedo(data: string) {
    this.redoList.push(data)
  }

  undo() {
    if(!this.canvas) {
      return;
    }
    const ctx = this.canvas.getContext('2d');
    const width = this.canvas.width;
    const height = this.canvas.height;
    if(this.undoList.length > 0) {
      const dataUrl = this.undoList.pop();
      this.redoList.push(this.canvas.toDataURL());
      const img = new Image();
      img.src = dataUrl ?? '';
      img.onload = () => {
        ctx?.clearRect(0, 0, width, height)
        ctx?.drawImage(img, 0, 0, width, height)
      }
      return;
    }
    ctx?.clearRect(0, 0, width, height)
  }

  redo() {
    if(!this.canvas) {
      return;
    }
    const ctx = this.canvas.getContext('2d');
    const width = this.canvas.width;
    const height = this.canvas.height;
    if(this.redoList.length > 0) {
      const dataUrl = this.redoList.pop();
      this.undoList.push(this.canvas.toDataURL());
      const img = new Image();
      img.src = dataUrl ?? '';
      img.onload = () => {
        ctx?.clearRect(0, 0, width, height)
        ctx?.drawImage(img, 0, 0, width, height)
      }
    }
  }
}
const canvasState = new CanvasState();

export const {setCanvas, canvas} = canvasState;

export default canvasState