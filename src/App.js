import React, { useState, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks'
import L from 'leaflet';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent, { timelineContentClasses } from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
  const [tripId, setTripId] = useState()
  const [timeline, setTimeline] = useState()

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
      .then((json) => json.pos['417'])
      .then(tram => {
        setPosition([tram.lat, tram.lon])
        setTripId(tram.trip)
      })
      .then(() => console.log('In fetch'))
  }, [])

  const mapTimelineRow = row => ({ "time": row.time, "stop" : row.seq + '. ' + row.name })

  useEffect(() => {
    if(!tripId) return
    fetch('https://api.ttss.pl/trip/?type=t&id='+tripId)
      .then((response) => response.json())
      .then((json) => json.data)
      .then((data) => setTimeline(data.map(mapTimelineRow)))
  }, [tripId])

  console.log('position:::', position)
  console.log('timeline:::', timeline)

  return (
    <div className='app'>
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
      <div className='timeline'>
        <Timeline>
          {(timeline ?? []).map(row => {
            return (
              <TimelineItem>
                <TimelineOppositeContent color="textSecondary">
                  {row.time}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>{row.stop}</TimelineContent>
              </TimelineItem>
            )
          })}
        </Timeline>
      </div>
    </div>
  );
}

export default App;
