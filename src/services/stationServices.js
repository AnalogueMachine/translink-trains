import { xml2json } from 'xml-js';

export const getStations = async () => {
  let stationsArray;
    // cors.io version - only use if cors.io is working
    await fetch("https://cors.io/?https://apis.opendatani.gov.uk/translink/")
      .then(results => {
        return results.json();
      })
      .then(data => {
        stationsArray = data.stations;
      });

    // Proxy version - proxy must be running
    // await fetch("/stations")
    //   .then(results => { return results.json(); })
    //   .then(data => { stationsArray = data; });
    

    return stationsArray;
}

export const getStationInformation = async (stationCode) => {
  let stationInformation;

  // cors.io version - only use if cors.io is working
  await fetch(
    `https://cors.io/?https://apis.opendatani.gov.uk/translink/${stationCode}.xml`,
    {
      method: "GET",
      headers: {
        Accept: "application/xml"
      }
    }
  ).then(response => {
      return response.text();
    }
  ).then(xml => {
      // console.log(xml);
      stationInformation = JSON.parse(
        xml2json(xml, {
          compact: true,
          textKey: "_",
          attributesKey: "$",
          commentKey: "value"
        })
      );
    }
  );

  // Local call (proxy must be running)
  // await fetch(`/station/${stationCode}`)
  //   .then(response => { return response.json() })
  //   .then(stationInfo => { stationInformation = stationInfo });

  return stationInformation;
}