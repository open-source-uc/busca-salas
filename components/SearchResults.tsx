import { Place } from "../lib/fileSearcher"

function ResultElement({ name }: Place) {
  return (
    <li className="search-result">{name}</li>
  )
}

export default function SearchResults({ results }: { results: Array<Place> }) {
  return (
    <ol>
      {results.map((result, index) => <ResultElement {...result} key={index} />)}
    </ol>
  )
}
