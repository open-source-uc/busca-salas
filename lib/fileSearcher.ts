import Fuse from "fuse.js"
import { getOwnPropertyDescriptors } from "immer/dist/internal"
import data from "../assets/data.json"
import { Place } from "./types"

type Mapping<T> = {[key: string]: T}

// It's assumed that the data follows the schema
const allPlaces = data.places as unknown as Place[]

const queryRE = /(?<tag>\w+):(?<subQuery>[^:\s]+)/g

const campusPlaces: Mapping<Place[]> = {}
const fuseInstances: Mapping<Fuse<Place>> = {}

const fuseOptions: Fuse.IFuseOptions<Place> = {
  keys: [
    { name: "name", weight: 5 },
    { name: "categories", weight: 3 },
    { name: "description", weight: 2 }
  ]
}



function getOrCreate<T>(collection: Mapping<T>, key: string, create: (key: string) => T) {
  return collection[key] || (collection[key] = create(key))
}

type SearchOptions = {limit?: number}

function search(query: string, campus: string, options: SearchOptions = {}): Array<Place> {
  // First create or get the campus's places
  let places = getOrCreate(campusPlaces, campus, c => allPlaces.filter(e => e.campus == c))

  // Then filter tags
  for (const {groups: {tag, subQuery}} of query.matchAll(queryRE)) {
    // Filter by tha tag subquery
    console.log(subQuery)
    places = places.filter(place =>  {
      if (["c", "category"].some((e) => e == tag)) {
        return place.categories.some((e) => e == subQuery)
      }
      return false
    })
  }

  // Remove the tag from the main query
  query = query.replaceAll(queryRE, "")

  // If there isn't a query left, return the results
  if (query.length == 0) return places

  // Finally fussy-search tha main query
  const fuse = getOrCreate(fuseInstances, campus, c => new Fuse(campusPlaces[c], fuseOptions))
  fuse.setCollection(places)
  const results = fuse.search(query, {limit: options.limit || 100})
  return results.map(e => e.item)
}

export default search
