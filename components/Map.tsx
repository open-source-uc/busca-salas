import { MapContainer, TileLayer, AttributionControl } from "react-leaflet"
import { LatLng } from "leaflet"
import MapMarker from "./MapElements/Marker"
import MapInfo from "./MapElements/Info"
import LocationMarker from "./MapElements/Location"
import "leaflet/dist/leaflet.css"


const SAN_JOAQUIN_CORDS = new LatLng(-33.498, -70.612)


type MapArguments = { centerAt?: LatLng, markers?: Array<LatLng> }

export default function Map({ centerAt = SAN_JOAQUIN_CORDS, markers = [SAN_JOAQUIN_CORDS] }: MapArguments) {
  return (
    <div id="map-container">
      <MapInfo message="debug info" />
      <MapContainer id="map" center={centerAt} zoom={16} attributionControl={false} whenCreated={map => map.locate()}>
        <LocationMarker />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AttributionControl position="topright" />
        {markers.map((value, index) => <MapMarker position={value} key={index}>Popup de ejemplo</MapMarker>)}
      </MapContainer>
    </div>
  )
}
