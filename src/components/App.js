import React, { useState, useEffect } from 'react'

import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Map from './Map';
import TramTimeline from './TramTimeline'
import { updateTramPosition, updateTimeline } from '../services/tram';

function App() {
  const initialPosition = [50.04, 19.96]
  const [position, setPosition] = useState(initialPosition)
  const [tripId, setTripId] = useState()
  const [timeline, setTimeline] = useState()

  useEffect(() => {
    updateTramPosition(setPosition, setTripId)
  }, [])

  useEffect(() => {
    updateTimeline(tripId, setTimeline)
  }, [tripId])

  return (
    <div className='app'>
      <Map position={position} />
      <TramTimeline timeline={timeline}/>
    </div>
  );
}

export default App;
