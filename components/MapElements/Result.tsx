import { LatLng } from "leaflet"
import { Polygon } from "react-leaflet"
import { useAppSelector } from "../../lib/redux/hooks"
import MapMarker from "./../MapElements/Marker"

export default function ResultsComponent() {
  const results = useAppSelector(state => state.main.results)
  type Result = typeof results[0]

  function createMarker(result: Result, index: number) {
    const latLng = new LatLng(result.latLng[0], result.latLng[1])
    const marker = <MapMarker position={latLng} key={index}>
      <>{result.campus}: {result.name}</>
    </MapMarker>
    if (!result.polygon)
      return marker
    return [marker, <Polygon positions={result.polygon} key={index} />]
  }
  return <>{results.map(createMarker)}</>
}
