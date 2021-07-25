import { CAMPUSES, CARDS } from "../lib/constants"
import PillSelect from "./SegmentedControl"
import SearchBox from "./SearchBox"
import CardContainer from "./SearchCards"
import SearchResults, { Result } from "./SearchResults"
import Footer from "./Footer"

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
