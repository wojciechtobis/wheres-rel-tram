const tramId = 417
const baseApiUrl = 'https://api.ttss.pl/'

export function updateTram(setTram) {
    fetch(baseApiUrl+'positions/?type=t')
        .then((response) => response.json())
        .then((json) => json.pos[tramId])
        .then(tram => setTram(tram))
}

const parseRow = row => ({ "time": row.time, "stop" : row.seq + '. ' + row.name })

export function updateTimeline(tripId, setTimeline) {
    if(!tripId) return
    fetch(baseApiUrl+'trip/?type=t&id='+tripId)
      .then((response) => response.json())
      .then((json) => json.data)
      .then((data) => setTimeline(data.map(parseRow)))
}
