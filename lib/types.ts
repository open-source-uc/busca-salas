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

type Campus = "SJ" | "CS" | "LC" | "OR"

type LatLng = [number, number]

// At least a triangle
type Polygon = [LatLng, LatLng, LatLng, ...LatLng[]]

export type Place = {
  id: string
  name: string
  categories: [Category, ...Category[]]
  alternativeNames?: string[]
  description?: string
  location: {
    campus: Campus
    latLng: LatLng
    floor?: number
    parentId?: string
    polygon?: Polygon
  };
  contact?: {
    url?: string
    phone?: string
    email?: string
    instagram?: string
    twitter?: string
    facebook?: string
  }
}
