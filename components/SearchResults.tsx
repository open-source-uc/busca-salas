export type Result = { name: string, location }


function ResultElement({ name }: Result) {
  return (
    <li className="search-result">{name}</li>
  )
}

export default function SearchResults({ results = [] }: { results?: Result[] }) {
  return (
    <ol>
      {results.map((result, index) => <ResultElement {...result} key={index} />)}
    </ol>
  )
}
