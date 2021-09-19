import { AppProps } from "next/app"
import "../styles/_app.scss"

function App({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   document.documentElement.lang = "es-CH"
  // })
  return <Component {...pageProps} />
}

export default App
