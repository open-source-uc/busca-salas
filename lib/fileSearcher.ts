import places from "../assets/seeds/places.json"

export type Place = typeof places[0]

function search(query: string, campus: string): Array<Place> {
  const searchFilter = (place: Place) => (
    place.name.toLowerCase().includes(query.toLowerCase())
    && (campus === place.parent.campus)
  )
  return places.filter(searchFilter)
}

export default search
