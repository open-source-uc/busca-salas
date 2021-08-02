import { createSlice } from "@reduxjs/toolkit"
import { initialState } from "./state"
import * as reducers from "./reducers"

const slice = createSlice({ name: "main", initialState, reducers })

export const { clear, search, setCampus, setQuery } = slice.actions
export default slice.reducer
