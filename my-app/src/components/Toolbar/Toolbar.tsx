import React from 'react';
import styles from './toolbar.module.scss';
import toolState, { setFillColor, setStrokeColor, setTool } from '../../store/toolState';
import Brush from '../../tools/Brush';
import canvasState, { canvas } from '../../store/canvasState';
import Rect from '../../tools/Rect';
import Circle from '../../tools/Circle';
import Eraser from '../../tools/Eraser';

type ToolbarType = 'brush' | 'rect' | 'circle' | 'eraser'

export const Toolbar = () => {

  const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStrokeColor(e.target.value)
    setFillColor(e.target.value)
  }

  const download = () => {
    const dataUrl = canvasState.canvas?.toDataURL()
    const a = document.createElement('a')
    a.href = dataUrl!;
    a.download = canvasState.sessionId + ".jpg"
    a.click();
  }

  const handleTool = (value: ToolbarType) => {
    if(!canvasState.socket) {
      return;
    }

    if(canvasState.canvas) {
      switch (value) {
        case 'brush':
          setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionId));
          break;
        case 'rect':
          setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionId));
          break;
        case 'circle':
          setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionId));
          break;
        case 'eraser':
          setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionId));
          break;
        default:
          break;
      }
    }
  }
  return (
    <div className={styles.container}>
      <button
        className={`${styles.container__btn} ${styles.brush}`}
        onClick={() => handleTool('brush')}
      />
      <button
        className={`${styles.container__btn} ${styles.rect}`}
        onClick={() => handleTool('rect')}

      />
      <button
        className={`${styles.container__btn} ${styles.circle}`}
        onClick={() => handleTool('circle')}

      />
      <button
        className={`${styles.container__btn} ${styles.eraser}`}
        onClick={() => handleTool('eraser')}
      />
      <button
        className={`${styles.container__btn} ${styles.line}`}
      />
      <input
        type='color' className={styles.color}
        onChange={changeColor}

      />
      <button
        className={`${styles.container__btn} ${styles.undo}`}
        onClick={() => canvasState.undo()}
      />
      <button
        className={`${styles.container__btn} ${styles.redo}`}
        onClick={() => canvasState.redo()}

      />
      <button
        className={`${styles.container__btn} ${styles.save}`}
        onClick={download}
      />
    </div>
  )
}
