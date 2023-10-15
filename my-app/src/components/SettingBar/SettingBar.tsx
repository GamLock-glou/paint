import React from "react";
import styles from "./settingBar.module.scss";
import toolState, { setStrokeColor } from "../../store/toolState";

export const SettingBar = () => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStrokeColor(e.target.value)
  }
  return (
    <div className={styles.container}>
      <label htmlFor="line-width">Толщина линии</label>
      <input
        onChange={e => toolState.setLineWidth(+e.target.value)}
        className={styles.lineWidthInput}
        id="line-width"
        type="number"
        defaultValue={1}
        min={1}
        max={50}
      />
      <label htmlFor="stroke-color">Цвет обводки</label>
      <input
        id="stroke-color"
        type="color"
        onChange={onChange}
      />
    </div>
  );
};
