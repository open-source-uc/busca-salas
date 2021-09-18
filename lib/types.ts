type Category = (
  | "microwaves"
  | "lookers"
  | "recyclingPoint"
  | "trashPoint"
  | "classroom"
  | "studyRooms"
  | "campus"
  | "faculty"
  | "bathroom"
  | "restaurant"
  | "computers"
  | "napSpot"
  | "ATM"
  | "laboratory"
  | "bicycleParking"
  | "carParking"
  | "photocopy"
  | "printer"
  | "shop"
  | "other"
)

type LatLng = [number, number]

// At least a triangle
type Polygon = [LatLng, LatLng, LatLng, ...LatLng[]]

export type Place = {
  id: number
  name: string
  categories: string[]
  alternativeNames?: string[]
  description?: string
  campus: string
  latLng: LatLng
  floor?: number
  parentId?: string
  polygon?: Polygon
  contact?: {
    [key: string]: string
  }
}
