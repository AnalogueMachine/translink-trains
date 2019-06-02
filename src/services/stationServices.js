const xmljs = require('xml-js');

export const getStations = async () => {
  let stationsArray;
    // Handled by proxy locally - may need to uncomment in production
    await fetch("https://cors.io/?https://apis.opendatani.gov.uk/translink/")
      .then(results => {
        return results.json();
      })
      .then(data => {
        stationsArray = data.stations;
      });

    return stationsArray;
}

export const getStationInformation = async (stationCode) => {
  let stationInformation;
   // Handled by proxy locally
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
        xmljs.xml2json(xml, {
          compact: true,
          textKey: "_",
          attributesKey: "$",
          commentKey: "value"
        })
      );
      // this.setState({ stationInformation: json });
    }
  );

  return stationInformation;
}