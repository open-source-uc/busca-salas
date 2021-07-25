import { MainState } from "./state"

function updateURI({ query = "", campus }) {
  const uri = new URL(window.location.href)
  uri.searchParams.set("c", campus)
  query ? uri.searchParams.set("q", query) : uri.searchParams.delete("q")
  window.history.replaceState({}, "", uri.toString())
}

export function setCampus(state: MainState, { payload }) {
  const campusCode = payload
  state.campus = campusCode
  updateURI(state)
}

export function setQuery(state: MainState, { payload }) {
  const query = payload
  state.query = query
  updateURI(state)
}

export function search(state: MainState) {
  const { campus, query } = state
  console.log("Searching with state", campus, query)
  state.results = []
}

export function clear(state: MainState) {
  state.results = []
  state.query = null
}
