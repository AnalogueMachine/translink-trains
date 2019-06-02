export const getStations = async () => {
  let stationsArray;
    // Handled by proxy locally - may need to uncomment in production
    await fetch("https://apis.opendatani.gov.uk/translink/")
      .then(results => {
        return results.json();
      })
      .then(data => {
        stationsArray = data.stations;
      });

    return stationsArray;
}