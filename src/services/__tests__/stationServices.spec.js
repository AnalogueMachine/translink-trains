import { getStations, getStationInformation } from "../stationServices";

const mockFetchReturnData = { stations: "12345" };

describe("Service calls", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  describe("getStations", () => {
    it("should fetch the correct URL and return the data", async () => {
      fetch.mockResponseOnce(JSON.stringify(mockFetchReturnData));

      const result = await getStations();

      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual(
        "https://translink-proxy.herokuapp.com/stations"
      );
      expect(result).toEqual(mockFetchReturnData);
    });
  });

  describe("getStationInformation", () => {
    it("should fetch the correct URL and return the data", async () => {
      fetch.mockResponseOnce(JSON.stringify(mockFetchReturnData));
      const mockStationCode = "mockStationCode";

      const result = await getStationInformation(mockStationCode);

      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual(
        "https://translink-proxy.herokuapp.com/station/mockStationCode"
      );
      expect(result).toEqual(mockFetchReturnData);
    });
  });
});
