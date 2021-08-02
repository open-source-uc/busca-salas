import { useAppSelector } from "../lib/redux/hooks"
import { Place } from "../lib/fileSearcher"

function ResultElement({ name }: Place) {
  return (
    <li className="search-result">{name}</li>
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
