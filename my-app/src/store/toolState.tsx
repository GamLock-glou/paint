import { makeAutoObservable } from "mobx";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";

type ToolType = Brush | Rect | Circle | Eraser | null

class ToolState {
  tool: ToolType = null
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }
  setTool(tool: ToolType) {
    this.tool = tool
  }
  setFillColor(color: string | CanvasGradient | CanvasPattern) {
    if(this.tool) {
      this.tool.fillColor = color
    }
  }
  setStrokeColor(color: string | CanvasGradient | CanvasPattern) {
    if(this.tool) {
      this.tool.strokeColor = color
    }
  }
  setLineWidth(width: number) {
    if(this.tool) {
      this.tool.lineWidth = width
    }
  }
}
const toolState = new ToolState();

export const {setFillColor, setLineWidth, setStrokeColor, setTool, tool} = toolState;
export default toolState;