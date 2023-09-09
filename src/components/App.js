import React, { useState, useEffect } from 'react'

import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Map from './Map';
import TramTimeline from './TramTimeline'
import { updateTram, updateTimeline } from '../services/ttss';

function App() {
  const [timeline, setTimeline] = useState()
  const [tram, setTram] = useState({ lat: 50.04, lon: 19.96 })

  useEffect(() => {
    updateTram(setTram)
  }, [])

  useEffect(() => {
    updateTimeline(tram.trip, setTimeline)
  }, [tram.trip])

  return (
    <div className='app'>
      <div className='header'>
        {tram.line} {tram.dir}
      </div>
      <div className='content'>
        <Map position={[tram.lat, tram.lon]} />
        <TramTimeline timeline={timeline}/>
      </div>
    </div>
  );
}

export default App;
