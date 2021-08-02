import { MapContainer, TileLayer, AttributionControl } from "react-leaflet"
import { LatLng } from "leaflet"
import { useAppSelector } from "../lib/redux/hooks"
import MapMarker from "./MapElements/Marker"
import MapInfo from "./MapElements/Info"
import LocationMarker from "./MapElements/Location"
import "leaflet/dist/leaflet.css"


const SAN_JOAQUIN_CORDS = new LatLng(-33.498, -70.612)

type MapArguments = { centerAt?: LatLng, markers?: Array<LatLng> }

function ResultsComponent() {
  const results = useAppSelector(state => state.main.results)
  type Result = typeof results[0]

  function createMarker(result: Result, index: number) {
    const latLng = new LatLng(result.location.coordinates[0], result.location.coordinates[1])
    return <MapMarker position={latLng} key={index}>
      <>{result.parent.campus}: {result.name}</>
    </MapMarker>
  }

  return <>{results.map(createMarker)}</>
}


export default function Map({ centerAt = SAN_JOAQUIN_CORDS }: MapArguments) {

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
        <ResultsComponent />
      </MapContainer>
    </div>
  )
}
