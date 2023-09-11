import React, { useEffect } from 'react'
import ReactDOMServer from 'react-dom/server';

import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks'
import L from 'leaflet';

import './Map.css';

function UpdateMapComponent({center}) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, 15)
  }, [center, map])
  return null
}

function Map({tramPosition, relPosition, path}) {
  function getIcon(image) {
    const iconSize = 40

    const elem = <div>
      <img src={process.env.PUBLIC_URL + image} alt="" style={{width: iconSize}} />
    </div>
  
    return new L.divIcon({
      html: ReactDOMServer.renderToStaticMarkup(elem),
      className: null,
      iconSize: [iconSize, iconSize],
      iconAnchor: [iconSize / 2, iconSize / 2],
    })
  }
  
  const tramMarker = getIcon('/marker.svg')
  const relMarker = getIcon('/relativity.svg')

  return (
    <div className='map-container-wrapper'>
          <MapContainer center={tramPosition} zoom={12} className='map-container'>
            <UpdateMapComponent center={tramPosition}/>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={tramPosition} icon={tramMarker} />
            <Marker position={relPosition} icon={relMarker} />
            <Polyline positions={path} color={'blue'} opacity="0.5" weight="5"/>
          </MapContainer>
        </div>
  );
}
export default Map;
