import { FormEvent } from "react"
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks"
import { setQuery, search } from "../lib/redux/main/slice"



function SearchBox() {
  const dispatch = useAppDispatch()
  const value = useAppSelector(state => state.main.query)
  const setValue = (v: string) => dispatch(setQuery(v))

  function handleSubmit(event: FormEvent) {
    dispatch(search())
    event.preventDefault()
    return false
  }

  return (
    <form id="search-container" onSubmit={handleSubmit}>
      <input id="search" type="text" placeholder="BuscaSalas.." value={value} onChange={e => setValue(e.target.value)} />
    </form>
  )
}

export default SearchBox
