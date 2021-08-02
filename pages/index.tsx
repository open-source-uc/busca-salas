import Head from "next/head"
import dynamic from "next/dynamic"
import { useEffect } from "react"
import { Provider } from "react-redux"
import MainMenu from "../components/MainMenu"
import store from "../lib/redux/store"

export default function MainApp() {
  // The Map component should be imported dynamically
  // since it needs to interact with the DOM
  const Map = dynamic(() => import("../components/Map"), { ssr: false })

  // Since there is no css way of dealing with the real 100vh
  // size of browsers with the search-bar on top, it has to be
  // adjusted manually. Google Maps does something similar.
  // `useEffect` is used to avoid re-rendering the component.
  useEffect(() => {
    function handleWindowHeightChange() {
      const app_element = document.getElementById("app")
      app_element.style.height = `${window.innerHeight}px`
    }
    handleWindowHeightChange()
    window.addEventListener("resize", handleWindowHeightChange)
    return () => window.removeEventListener("resize", handleWindowHeightChange)
  })

  return (
    <Provider store={store}>
      <main id="app">
        <Head>
          <meta charSet="UTF-8" />
          <title>Mapas UC</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Map />
        <MainMenu />
      </main>
    </Provider>
  )
}
