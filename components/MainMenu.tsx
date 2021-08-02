import { useAppSelector } from "../lib/redux/hooks"
import { CAMPUSES, CARDS } from "../lib/constants"
import PillSelect from "./SegmentedControl"
import SearchBox from "./SearchBox"
import CardContainer from "./SearchCards"
import SearchResults from "./SearchResults"
import Footer from "./Footer"


export default function MainMenu() {
  const searching = useAppSelector(state => state.main.searching)

  return (
    <nav id="main-menu">
      <hr id="dragger-indicator" />
      <PillSelect campuses={CAMPUSES} />
      <SearchBox />
      <div id="search-result-area">
        {searching ? <SearchResults /> : <CardContainer cards={CARDS} />}
      </div>
      <Footer />
    </nav>
  )
}
