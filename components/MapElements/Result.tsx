import { LatLng } from "leaflet"
import { Polygon } from "react-leaflet"
import { useAppSelector } from "../../lib/redux/hooks"
import MapMarker from "./../MapElements/Marker"

export default function ResultsComponent() {
  const results = useAppSelector(state => state.main.results)
  type Result = typeof results[0]

  function createMarker(result: Result, index: number) {
    const latLng = new LatLng(result.location.latLng[0], result.location.latLng[1])
    const marker = <MapMarker position={latLng} key={index}>
      <>{result.location.campus}: {result.name}</>
    </MapMarker>
    if (!result.location.polygon)
      return marker
    return [marker, <Polygon positions={result.location.polygon} key={index} />]
  }
  return <>{results.map(createMarker)}</>
}
