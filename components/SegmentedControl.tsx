// https://github.com/laurasandoval/iOS13SegmentedControl

import React, { useState } from "react"
import style from "../styles/segmented_control.module.scss"

export default function SegmentedControl({ campuses, selected = 0 }) {
  const [selectedIndex, setSelectedIndex] = useState(selected)

  return (
    <div id="segmented-control" className={style.segmented_control}>
      <span className={style.selection} style={{ transform: `translateX(${selectedIndex * 100}%)` }} />
      {campuses.map((campus, index) =>
        <span className={style.option} key={index}>
          <input type="radio" name="campus" value={campus.code} id={campus.code} onChange={() => setSelectedIndex(index)} />
          <label htmlFor={campus.code}><span>{campus.name}</span></label>
        </span>
      )}
    </div>
  )
}
