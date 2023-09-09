import React, { useEffect } from 'react'
import ReactDOMServer from 'react-dom/server';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks'
import L from 'leaflet';

import './Map.css';

function UpdateMapComponent({center}) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, 15)
  }, [center])
  return null
}

function Map({position}) {
  const iconSize = 40

  const elem = <div>
    <img src={process.env.PUBLIC_URL + '/marker.svg'} alt="" style={{width: iconSize}} />
  </div>

  const icon = new L.divIcon({
    html: ReactDOMServer.renderToStaticMarkup(elem),
    className: null,
    iconSize: [iconSize, iconSize],
    iconAnchor: [iconSize / 2, iconSize / 2],
  })

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
export default Map;
