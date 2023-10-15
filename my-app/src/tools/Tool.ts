export default class Tool {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  socket: WebSocket;
  id: string;
  constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
    this.canvas = canvas;
    this.socket = socket;
    this.id = id;
    this.ctx = canvas.getContext('2d');
    this.destroyEvents()
  }

  set fillColor(color: string | CanvasGradient | CanvasPattern) {
    if(this.ctx?.fillStyle) {
      this.ctx.fillStyle = color
    }
  }

  set strokeColor(color: string | CanvasGradient | CanvasPattern) {
    if(this.ctx?.fillStyle) {
      this.ctx.strokeStyle = color
    }
  }

  set lineWidth(width: number) {
    if(this.ctx?.fillStyle) {
      this.ctx.lineWidth = width;
    }
  }

  destroyEvents() {
    this.canvas.onmousemove = null
    this.canvas.onmousedown = null
    this.canvas.onmouseup = null
  }
}