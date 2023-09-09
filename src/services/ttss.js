const tramId = 417
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
    
    // TO REMOVE
    const dateToCompare = new Date()
    dateToCompare.setHours(9)
    dateToCompare.setMinutes(15)
    //

    return parsedStopTime < dateToCompare;
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
