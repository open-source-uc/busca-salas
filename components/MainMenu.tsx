import Link from "next/link"
import PillSelect from "./SegmentedControl"
import SearchBox from "./SearchBox"
import CardContainer from "./SearchCards"
import SearchResults, { Result } from "./SearchResults"

function unsplash(str: TemplateStringsArray) {
  return `https://source.unsplash.com/${str[0]}/400x300`
}

const CAMPUSES = [
  { name: "San Joaquín", code: "SJ" },
  { name: "Casa Central", code: "CC" },
  { name: "Lo Contador", code: "LC" }
]

const CARDS = [
  { name: "Salas de estudio", img: unsplash`s9CC2SKySJM` },
  { name: "Donde comer", img: unsplash`tKN1WXrzQ3s` },
  { name: "Baños", img: unsplash`d6LzDABxP6I` },
  { name: "Puntos de reciclaje", img: unsplash`aI4RJ--Mw4I` },
  { name: "Donde dormir", img: unsplash`6I6r7c_0JRU` },
]

function Footer() {
  return (
    <footer>
      <div>
        Creado por Benjamín Vicente.
      </div>
      <div>
        <Link href="/about">
          <a>Más información</a>
        </Link>
      </div>
    </footer>
  )
}

const exampleResults: Result[] = [{ name: 'A12', location: [1, 1] }]

export default function MainMenu({ results = [] }: { results?: Result[] }) {
  return (
    <nav id="main-menu">
      <hr id="dragger-indicator" />
      <PillSelect campuses={CAMPUSES} />
      <SearchBox />
      <div id="search-result-area">
        {results.length ? <SearchResults results={results} /> : <CardContainer cards={CARDS} />}
      </div>
      <Footer />
    </nav>
  )
}
