import ReactDOMServer from 'react-dom/server';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import './App.css';

function App() {
  const position = [50.01563262939453, 20.024200439453126]

  const iconSize = 40

  const src = '/marker.svg'

  const elem = <div>
    <img src={process.env.PUBLIC_URL + src} alt="" style={{width: iconSize}} />
  </div>

  const icon = new L.divIcon({
    html: ReactDOMServer.renderToStaticMarkup(elem),
    className: null,
    iconSize: [iconSize, iconSize],
    iconAnchor: [iconSize / 2, iconSize / 2],
  })

  return (
    <div className='map-container-wrapper'>
      <MapContainer center={position} zoom={15} className='map-container'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={icon} />
      </MapContainer>
    </div>
  );
}

export default App;
