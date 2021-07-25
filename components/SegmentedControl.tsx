// https://github.com/laurasandoval/iOS13SegmentedControl

import { useAppDispatch, useAppSelector } from "../lib/redux/hooks"
import style from "../styles/segmented_control.module.scss"
import { setCampus } from "../lib/redux/main/slice"

export default function SegmentedControl({ campuses }) {
  const dispatch = useAppDispatch()
  const campus = useAppSelector(state => state.main.campus)
  const selectedIndex = campuses.map(c => c.code).indexOf(campus)

  const setCampusWithIndex = (index: number) => () => {
    dispatch(setCampus(campuses[index].code))
  }

  return (
    <div id="segmented-control" className={style.segmented_control}>
      <span className={style.selection} style={{ transform: `translateX(${selectedIndex * 100}%)` }} />
      {campuses.map((campus, index) =>
        <span className={style.option} key={index}>
          <input type="radio" name="campus" value={campus.code} id={campus.code} onChange={setCampusWithIndex(index)} />
          <label htmlFor={campus.code}><span>{campus.name}</span></label>
        </span>
      )}
    </div>
  )
}
