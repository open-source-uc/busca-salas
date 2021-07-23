// A simple message box for debugging purposes
export default function MapInfo({ message = "" }: { message: string }) {
  return <div id="map-info" style={message === "" ? { height: 0 } : {}}>
    {message}
  </div>
}
