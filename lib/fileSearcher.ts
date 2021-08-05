import Fuse from "fuse.js"
import places_data from "../assets/data.json"
import { Place } from "./types"

const fuse_options: Fuse.IFuseOptions<unknown> = {
  keys: [
    { name: "name", weight: 5 },
    { name: "categories", weight: 1 },
    { name: "description", weight: 2 }
  ]
}

const fuse = new Fuse(places_data, fuse_options)

function search(query: string, campus: string): Array<Place> {
  fuse.setCollection(places_data.filter(e => e.location.campus == campus))
  const results = fuse.search(query)
  return results.map(e => (e.item as Place))
}

export default search
