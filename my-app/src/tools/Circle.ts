import Tool from "./Tool";

export default class Circle extends Tool {
  mouseDown: boolean = false;
  startY: number = 0;
  startX: number = 0;
  saved: string = '';
  constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
    super(canvas, socket, id);
    this.listen()
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
  }

  mouseUpHandler(e: MouseEvent) {
    this.mouseDown = false
  }

  mouseDownHandler(e: MouseEvent) {
    this.mouseDown = true
    this.ctx?.beginPath()
    this.startX = e.offsetX;
    this.startY = e.offsetY;
    this.saved = this.canvas.toDataURL()
  }

  mouseMoveHandler(e: MouseEvent) {
    if(this.mouseDown) {
      const width = e.offsetX - this.startX;
      this.draw(this.startX, this.startY, width)
    }
  }

  draw(x: number, y: number, r: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx?.beginPath()
      this.ctx?.arc(x, y, Math.abs(r), 0, 2 * Math.PI, false)
      this.ctx?.fill();
      this.ctx?.stroke();
    }
  }
}