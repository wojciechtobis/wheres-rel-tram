const tramId = 417

export function updateTramPosition(setPosition, setTripId) {
    fetch('https://api.ttss.pl/positions/?type=t')
        .then((response) => response.json())
        .then((json) => json.pos[tramId])
        .then(tram => {
        setPosition([tram.lat, tram.lon])
        setTripId(tram.trip)
        })
}

const parseRow = row => ({ "time": row.time, "stop" : row.seq + '. ' + row.name })

export function updateTimeline(tripId, setTimeline) {
    if(!tripId) return
    fetch('https://api.ttss.pl/trip/?type=t&id='+tripId)
      .then((response) => response.json())
      .then((json) => json.data)
      .then((data) => setTimeline(data.map(parseRow)))
}
