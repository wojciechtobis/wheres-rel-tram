import React, { useState, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks'
import L from 'leaflet';

import './App.css';

function UpdateMapComponent({center}) {
  const map = useMap()
  useEffect(() => {
    console.log('In MyComponent')
    map.setView(center, 15)
  }, [center])
  return null
}

function App() {
  const initialPosition = [50.04, 19.96]
  const [position, setPosition] = useState(initialPosition)

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

  useEffect(() => {
    fetch('https://api.ttss.pl/positions/?type=t')
      .then((response) => response.json())
      .then((json) => json.pos['413'])
      .then(currentPosition => setPosition([currentPosition.lat, currentPosition.lon]))
      .then(() => console.log('In fetch'))
  }, [])

  console.log('position:::', position)

  return (
    <div className='map-container-wrapper'>
      <MapContainer center={position} zoom={12} className='map-container'>
        <UpdateMapComponent center={position}/>
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
