import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, AttributionControl, useMapEvents } from "react-leaflet"
import { LatLng } from "leaflet"
import MapInfo from "./MapElements/Info"
import LocationMarker from "./MapElements/Location"
import ResultsComponent from "./MapElements/Result"

const IN_PRODUCTION = process.env.NODE_ENV === "development"
const SAN_JOAQUIN_CORDS = new LatLng(-33.498, -70.612)

type MapArguments = { centerAt?: LatLng, markers?: Array<LatLng> }


function CopyLocationEventHandler() {
  useMapEvents({
    contextmenu(event) {
      const { lat, lng } = event.latlng
      alert(`[${lat}, ${lng}]`)
    }
  })
  return null
}

export default function Map({ centerAt = SAN_JOAQUIN_CORDS }: MapArguments) {

  return (
    <div id="map-container">
      <MapInfo message="debug info" />
      <MapContainer id="map" center={centerAt} zoom={16} attributionControl={false} whenCreated={map => map.locate()}>
        <LocationMarker />
        {IN_PRODUCTION ? <CopyLocationEventHandler /> : null}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AttributionControl position="topright" />
        <ResultsComponent />
      </MapContainer>
    </div>
  )
}
