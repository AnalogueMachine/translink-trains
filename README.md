# translink-trains

This project was built with [Create React App](https://facebook.github.io/create-react-app/) and [React-Bootstrap](https://react-bootstrap.github.io/)

Aim - create a simple app to read real-time passenger rail information from Translink. Serves as an exercise in consuming public APIs and proxying requests.

### Proxying
There is an issue with this app whereby accessing the information from the Translink APIs results in a CORS error. To get around this, a proxy needs to be used. The app can either use the [cors.io](http://cors.io/) proxy, which is useful for running the app on GitHub pages (but unreliable if the proxy goes down), or via a [local proxy](https://github.com/AnalogueMachine/translink-proxy) which of course only works if running the app locally. I haven't figured out a better solution to this yet that doesn't involve deploying a proxy somewhere which might cost money. Suggestions welcome!

## To run locally:
Step 1:
- Clone this repo
- Run `npm install` within root directory
- Run `npm run start` to run the app frontend

Step 2 (do this in a separate terminal):
- Clone the [proxy repo](https://github.com/AnalogueMachine/translink-proxy)
- Run `npm install` within the proxy directory
- Run `npm run offline` in the proxy directory - note that this script is configured for Windows and may need modified on your machine.