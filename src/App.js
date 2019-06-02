import React, { Component } from "react";
import Header from './components/Header';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import ServiceCard from "./components/ServiceCard";
import ServiceModal from "./components/ServiceModal";
import { getStations, getStationInformation } from "./services/stationServices";
//import { xml2json } from "xml-js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStation: "None selected",
      stationInformation: "",
      selectedService: null,
      showStationModal: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.viewStops = this.viewStops.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  async componentDidMount() {
    // let stations = await this.getStations();
    let stations = await getStations(); // Try this with GH Pages
    stations = await stations.map((station, index) => {
      return (
        <option key={index} value={station.code} onClick={this.handleClick}>
          {station.name}
        </option>
      );
    });

    this.setState({
      stations: stations
    });
  }

  getStations = async () => { // Only use this locally
    let stationsArray;
    // Handled by proxy locally - may need to uncomment in production
    // await fetch("https://cors.io/?https://apis.opendatani.gov.uk/translink/")
    //   .then(results => {
    //     return results.json();
    //   })
    //   .then(data => {
    //     stationsArray = data.stations;
    //   });

    // Calling proxy
    await fetch("/stations")
      .then(results => { return results.json(); })
      .then(data => { stationsArray = data; });
    
    return stationsArray;
  };

  handleClick(event) {
    this.setState({ selectedStation: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // Handled by proxy locally
    // fetch(
    //   `https://cors.io/?https://apis.opendatani.gov.uk/translink/${this.state.selectedStation}.xml`,
    //   {
    //     method: "GET",
    //     headers: {
    //       Accept: "application/xml"
    //     }
    //   }
    // ).then(response => {
    //     return response.text();
    //   }
    // ).then(xml => {
    //     // console.log(xml);
    //     const json = JSON.parse(
    //       xml2json(xml, {
    //         compact: true,
    //         textKey: "_",
    //         attributesKey: "$",
    //         commentKey: "value"
    //       })
    //     );
    //     this.setState({ stationInformation: json });
    //   }
    // );
    // fetch(`/station/${this.state.selectedStation}`)
    //   .then(response => { return response.json() })
    //   .then(stationInformation => { this.setState({ stationInformation: stationInformation })});
    this.setState({ stationInformation: getStationInformation() });
  }

  viewStops(event) {
    console.log(this.state.stationInformation.StationBoard.Service[event.target.value]);
    this.setState({ selectedService: this.state.stationInformation.StationBoard.Service[event.target.value] });
    this.setState({ showStationModal: true });
  }

  handleModalClose() {
    this.setState({ showStationModal: false });
  }

  renderServices() {
    const services = this.state.stationInformation.StationBoard.Service;
    let serviceElements;

    if (services) {
      serviceElements = services.map((service, index) => {
        return (
          <ServiceCard key={index} service={service} onClick={this.viewStops} index={index} />
        );
      });
    } else {
      serviceElements = <p className="noTrains">No trains due here for at least 90min.</p>
    }

    return serviceElements;
  }

  render() {
    return (
      <div>
        <Header />
        {this.state.selectedService &&
          <ServiceModal service={this.state.selectedService} show={this.state.showStationModal} onHide={this.handleModalClose} />
        }
        <Container>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group style={{ textAlign: "center" }}>
                  <Form.Label>Choose your station...</Form.Label>
                  <Form.Control as="select">
                    <option>Please select...</option>
                    {this.state.stations}
                  </Form.Control>
                </Form.Group>
                <Row>
                  <Col />
                  <Col className="text-center">
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Col>
                  <Col />
                </Row>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              {this.state.stationInformation.StationBoard && (
                <div>{this.renderServices()}</div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
