import { Place } from "../../fileSearcher"

export interface MainState {
  query?: string,
  campus: string,
  results: Array<Place>
}

// TODO: initial state should depend on user config or URI
export const initialState: MainState = {
  query: "",
  campus: "SJ",
  results: []
}
