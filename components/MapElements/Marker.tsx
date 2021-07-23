import { Icon, LatLngExpression, PointTuple } from "leaflet"
import { Popup, Marker } from "react-leaflet"

interface MapMarkerProps {
  children: string | JSX.Element
  position: LatLngExpression
}

const iconSize: PointTuple = [40, 40]

export const markerIcon = new Icon({
  iconUrl: "/assets/place.svg",
  iconSize: iconSize,
  iconAnchor: [iconSize[0] * 0.5, iconSize[0] * 0.9]
})


export default function MapMarker({ children, position }: MapMarkerProps) {
  return (
    <Marker position={position} icon={markerIcon}>
      <Popup>
        {children}
      </Popup>
    </Marker>
  )
}
