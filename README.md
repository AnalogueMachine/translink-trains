# translink-trains [![Build Status](https://travis-ci.com/HundredPercentCoverage/translink-trains.svg?branch=master)](https://travis-ci.com/HundredPercentCoverage/translink-trains)

This project was built with [Create React App](https://facebook.github.io/create-react-app/) and [React-Bootstrap](https://react-bootstrap.github.io/)

Aim - create a simple app to read real-time passenger rail information from Translink. Serves as an exercise in consuming public APIs and proxying requests.

See the app in action here: [https://hundredpercentcoverage.github.io/translink-trains/](https://hundredpercentcoverage.github.io/translink-trains/)

### Proxying
There is an issue with this app whereby accessing the information from the Translink APIs directly results in a CORS error. To get around this, a proxy needs to be used. The app can either use the [cors.io](http://cors.io/) proxy, which is useful for running the app on GitHub pages (but unreliable if the proxy goes down), a custom quick-and-dirty proxy I have hosted on Heroku, or via a [local proxy](https://github.com/HundredPercentCoverage/translink-proxy) which of course only works if running the app locally.

The Heroku proxy keeps itself alive for as long as possible, but currently runs only on the free tier offered be Heroku and thus will go to sleep towards the end of the month (550 hours).

## To run locally:
Step 1:
- Clone this repo
- Run `npm install` within root directory
- Run `npm run start` to run the app frontend

Step 2 (do this in a separate terminal):
- Clone the [proxy repo](https://github.com/HundredPercentCoverage/translink-proxy)
- Run `npm install` within the proxy directory
- Run `npm run offline` in the proxy directory - note that this script is configured for Windows and may need modified on your machine.

Step 3 (until I figure out env vars):
- In the `stationServices.js` file, ensure the appropriate calls are uncommented from the two calls to the proxy / API. There are currently three:
  - Calls to [cors.io](https://cors.io/) which was useful during development but prone to breaking. Note that these calls includes logic to extract the data.
  - Calls to `/stations` and `/station/{code}`, which assume that the proxy is running.
  - Calls to the proxy on **Heroku**. Please don't break it.
