function triggerSearch() {
  console.log("should search here")
}

import { useState, FormEvent } from "react"
function handleSubmit(event: FormEvent) {
  event.preventDefault()
  triggerSearch()
}

function SearchBox({ searchValue = "" }: { searchValue?: string }) {
  const [value, setValue] = useState(searchValue)

  return (
    <form id="search-container" onSubmit={handleSubmit}>
      <input id="search" type="text" placeholder="BuscaSalas.." value={value} onChange={e => setValue(e.target.value)} />
    </form>
  )
}

export default SearchBox
