import React, { Component } from "react";
import Header from './components/Header';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import ServiceCard from "./components/ServiceCard";
import ServiceModal from "./components/ServiceModal";
import { getStations, getStationInformation } from "./services/stationServices";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStation: "None selected",
      stationInformation: "",
      selectedService: null,
      showStationModal: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.viewStops = this.viewStops.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  async componentDidMount() {
    let stations = await getStations(); // Try this with GH Pages
    stations = await stations.map((station, index) => {
      return (
        <option key={index} value={station.code}>
          {station.name}
        </option>
      );
    });

    this.setState({ stations: stations });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const info = await getStationInformation(this.state.selectedStation);

    this.setState({ stationInformation: info });
  }

  viewStops(event) {
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

  handleChange(event) {
    this.setState({ selectedStation: event.target.value });
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
                  <Form.Control as="select" onChange={this.handleChange}>
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
