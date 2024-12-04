import Head from "next/head"
import dynamic from "next/dynamic"
import { useEffect } from "react"
import { Provider } from "react-redux"
import { useRouter } from "next/dist/client/router"
import MainMenu from "../components/MainMenu"
// import AboutAndConfigModal from "../components/AboutAndConfigModal"
import AppMetaTags, { MetaTagsData } from "../components/AppMetaTags"
import store from "../lib/redux/store"


const metaTagData: MetaTagsData = {
  domain: "UbiCate.osuc.dev",
  shortName: "UbiCate",
  title: "Ubicate: Mapa de la UC",
  description: "Buscador de lugares de interés de la UC",
  themeColor: "#2e3440",
  twitter: {
    creator: "@benjavicenteg",
    site: "@OpenSource_eUC"
  },
  images: {
    large: "img/tw.png",
    small: "img/icon/main.png",
    apple: {
      icon: {
        "152x152": "img/apple/icon/152.png",
        "167x167": "img/apple/icon/167.png",
        "180x180": "img/apple/icon/180.png",
      },
      splash: {
        "1125x2436": "img/apple/splash/1125x2436.png",
        "1242x2208": "",
        "1536x2048": "",
        "1668x2224": "",
        "2048x2732": "",
        "640x1136": "",
        "750x1334": "",
      }
    }
  }
}


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

  // Show the information modal page as a component
  const router = useRouter()
  const { modal } = router.query


  return (
    <Provider store={store}>
      {/* { modal ? <AboutAndConfigModal/> : null } */}
      <main id="app">
        <Head>
          <meta charSet="UTF-8" />
          <title>UbiCate</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <AppMetaTags {...metaTagData}/>
        </Head>
        <Map />
        <MainMenu />
      </main>
    </Provider>
  )
}
