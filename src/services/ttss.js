const tramId = 413
const baseApiUrl = 'https://api.ttss.pl'

export function updateTram(setTram) {
    fetch(`${baseApiUrl}/positions/?type=t`)
        .then((response) => response.json())
        .then((json) => json.pos[tramId])
        .then(tram => setTram(tram))
}

function isVisited(stopTime) {
    const parts = stopTime.split(':')
    const parsedStopTime = new Date()
    parsedStopTime.setHours(parts[0])
    parsedStopTime.setMinutes(parts[1])

    return parsedStopTime < new Date();
}

const parseRow = row => ({ 
    time: row.time,
    stop : row.seq + '. ' + row.name,
    isVisited: isVisited(row.time) 
})

export function updateTimeline(tripId, setTimeline) {
    if(!tripId) return
    fetch(`${baseApiUrl}/trip/?type=t&id=${tripId}`)
      .then((response) => response.json())
      .then((json) => json.data)
      .then((data) => setTimeline(data.map(parseRow)))
}
