import { useAppSelector } from "../lib/redux/hooks"
import { Place } from "../lib/types"

function ResultElement({ name, description }: Place) {
  return (
    <li className="search-result">
      {name}: {description}
    </li>
  )
}

export default function SearchResults() {
  const results = useAppSelector(state => state.main.results)
  return (
    <ol>
      {results.map((result, index) => <ResultElement {...result} key={index} />)}
    </ol>
  )
}
