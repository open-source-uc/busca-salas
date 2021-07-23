import { useEffect, useState } from "react"
import { Marker, useMapEvents } from "react-leaflet"
import { markerIcon } from "./Marker"

export default function LocationMarker() {
  const [position, setPosition] = useState(null)

  const map = useMapEvents({
    locationfound: (event) => {
      console.log("location found:", location)
      setPosition(event.latlng)
    },
    locationerror: (event) => {
      console.log("error:", event)
    }
  })

  // Get user location every second
  useEffect(() => {
    const interval = setInterval(() => {
      map.locate()
    }, 5000)
    return () => clearInterval(interval)
  })

  return position === null ? null : (
    <Marker position={position} icon={markerIcon} />
  )
}
