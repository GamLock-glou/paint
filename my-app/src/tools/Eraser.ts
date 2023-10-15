import Brush from "./Brush";
import Tool from "./Tool";

export default class Eraser extends Brush {

  draw(x: number, y: number) {
    if(this.ctx) {
      this.ctx.strokeStyle = "white"
      this.ctx.lineTo(x, y)
      this.ctx.stroke()
    }
  }
}