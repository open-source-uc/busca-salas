import { PayloadAction } from "@reduxjs/toolkit"
import fileSearch from "../../fileSearcher"
import { MainState } from "./state"

function updateURI({ query = "", campus }) {
  const uri = new URL(window.location.href)
  uri.searchParams.set("c", campus)
  query ? uri.searchParams.set("q", query) : uri.searchParams.delete("q")
  window.history.replaceState({}, "", uri.toString())
}

export function setCampus(state: MainState, { payload }: PayloadAction<string>) {
  const campusCode = payload
  state.campus = campusCode
  updateURI(state)
}

export function setQuery(state: MainState, { payload }: PayloadAction<string>) {
  const query = payload
  state.query = query
  updateURI(state)
}

export function search(state: MainState, { payload = "" }: PayloadAction<string>) {
  if (payload) {
    state.query = payload
    updateURI(state)
  }
  const { campus, query } = state
  state.results = fileSearch(query, campus)
}

export function clear(state: MainState) {
  state.results = []
  state.query = null
}
