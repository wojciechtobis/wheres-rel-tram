import React, { useState, useEffect } from 'react'

import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Map from './Map';
import TramTimeline from './TramTimeline'
import { updateTram } from '../services/ttss2';

function App() {
  const relPosition = [50.05895385940277, 19.962704]
  const [time, setTime] = useState(Date.now())
  const [tram, setTram] = useState({ lat: relPosition[0], lon: relPosition[1], line: '', dir: 'Vehicle is not logged into GTFS Realtime system', timeline: [] })

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 60000);
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    updateTram(setTram, relPosition)
  }, [time])

  return (
    <div className='app'>
      <div className='header'>
        {tram.line} {tram.dir}
      </div>
      <div className='content'>
        <Map tramPosition={[tram.lat, tram.lon]} relPosition={relPosition}/>
        <TramTimeline timeline={tram.timeline}/>
      </div>
    </div>
  );
}

export default App;
