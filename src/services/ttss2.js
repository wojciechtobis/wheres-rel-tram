const parseStop = singleStop => ({
    time: singleStop.departure_time,
    stop: singleStop.stop_sequence + '. ' + singleStop.stop_name,
    isVisited: singleStop.old
});

export function updateTram(setTram, relPosition) {
    fetch('https://wheres-rel-tram.azurewebsites.net/api/proxy')
        .then((response) => response.json())
        .then((json) => json.vehicle)
        .then(tram => {
            if(!!tram) return ({
                line: tram.route_short_name,
                dir: tram.trip_headsign,
                lat: tram.latitude,
                lon: tram.longitude,
                timeline: tram.stop_times.map(parseStop)
            })
        })
        .then(tram => setTram(tram))
        .catch(error => {
            console.log('Error:::', error)
            setTram({ 
                lat: relPosition[0],
                lon: relPosition[1],
                line: '',
                dir: 'Error while fetching data',
                timeline: []
            })
        })
}