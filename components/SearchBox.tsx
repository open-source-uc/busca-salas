import { FormEvent, useState } from "react"
import { useAppDispatch } from "../lib/redux/hooks"
import { search, clear } from "../lib/redux/main/slice"


function SearchBox() {
  const [inputValue, setInputValue] = useState("")
  const dispatch = useAppDispatch()

  function handleSubmit(event: FormEvent) {
    dispatch(inputValue == "" ? clear() : search(inputValue))
    event.preventDefault()
    return false
  }

  return (
    <form id="search-container" onSubmit={handleSubmit}>
      <input id="search" type="text" placeholder="BuscaSalas.." value={inputValue} onChange={e => setInputValue(e.target.value)} />
    </form>
  )
}

export default SearchBox
