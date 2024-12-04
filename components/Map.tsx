import "leaflet/dist/leaflet.css"
import "font-awesome/css/font-awesome.min.css"

import { MapContainer, TileLayer, AttributionControl, useMapEvents } from "react-leaflet"
import { LatLng, Map } from "leaflet"
import Locate from "leaflet.locatecontrol"
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

function onMapCreation(map: Map) {
  // https://github.com/domoritz/leaflet-locatecontrol#possible-options
  // TODO: config this
  // @ts-ignore
  (new Locate({flyTo: true})).addTo(map)
}

export default function MapComponent({ centerAt = SAN_JOAQUIN_CORDS }: MapArguments) {

  return (
    <div id="map-container">
      <a href="https://ubicate.osuc.dev" style={{display: "flex", flexDirection: "column", justifyItems: "center", width: "100%", justifyContent: "center", padding: "0.5rem 2rem", textAlign: "center", textDecoration: "none"}}>
        <p style={{ margin: 0, color: "oklab(0.72 0 -0.09)", fontWeight: "800" }}>Ir a <span style={{color: "oklab(0.55 -0.07 -0.18)", textDecoration: "underline"}}>ubicate.osuc.dev</span></p>
        <p style={{ fontSize: "0.75rem", color: "oklab(0.73 -0.03 -0.05)", textWrap: "balance", margin: 0 }}>
          Ubicaciones actualizadas y aplicación mantenida
        </p>
      </a>
      <MapContainer id="map" center={centerAt} zoom={16} attributionControl={false} whenCreated={onMapCreation} >
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
