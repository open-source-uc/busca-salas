import { configureStore } from "@reduxjs/toolkit"
import main from "./main/slice"

const store = configureStore({ reducer: { main } })

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
