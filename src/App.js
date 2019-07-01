import React, { Component } from "react";
import Header from './components/Header';
import { Container, Row, Col, Modal } from "react-bootstrap";
import ServiceCard from "./components/ServiceCard";
import ServiceModal from "./components/ServiceModal";
import { getStations, getStationInformation } from "./services/stationServices";
import LoadingModal from "./components/LoadingModal";
import StationSelectForm from "./components/StationSelectForm";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stations: [],
      selectedStation: "None selected",
      stationInformation: "",
      selectedService: null,
      showStationModal: false,
      showLoadingModal: true,
      proxyDown: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.viewStops = this.viewStops.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  async componentDidMount() {
    let stations = await getStations();

    if(!stations.length) {
      this.setState({
        showLoadingModal: false,
        proxyDown: true
      });
    } else {
      this.setState({
        stations: stations,
        showLoadingModal: false
      });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ showLoadingModal: true });
    const info = await getStationInformation(this.state.selectedStation);

    this.setState({
      stationInformation: info,
      showLoadingModal: false
    });
  }

  viewStops(selectedService) {
    this.setState({ selectedService: selectedService });
    this.setState({ showStationModal: true });
  }

  handleModalClose() {
    this.setState({ showStationModal: false });
  }

  renderServices() {
    let serviceElements;

    if (this.state.stationInformation && this.state.stationInformation.StationBoard.Service) {
      
      const services = this.state.stationInformation.StationBoard.Service;

      if(services.length) {
        serviceElements = services.map((service, index) => {
          return (
            <ServiceCard key={index} service={service} onClick={this.viewStops} index={index} />
          );
        });
      } else {
        serviceElements = <ServiceCard index={0} service={services} onClick={this.viewStops} />
      }      
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
        <LoadingModal visible={this.state.showLoadingModal} />
        <Modal show={this.state.proxyDown} centered>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              This app uses a proxy hosted on a free Heroku service, which has a limit on how long it can run per month.
            </p>
            <p>
              As this is just a side project for me and I'm a bit skint, I only use the free service, so it is likely that 
              the app will go down towards the end of the month.
            </p>
            <p>
              You're seeing this error message because, in all likelihood, the proxy has reached the limit for the free tier and isn't running, so the app won't work.
            </p>
          </Modal.Body>
        </Modal>
        <Container>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <StationSelectForm onChange={this.handleChange} onSubmit={this.handleSubmit} stations={this.state.stations} />
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
        {this.state.selectedService &&
          <ServiceModal service={this.state.selectedService} show={this.state.showStationModal} onHide={this.handleModalClose} />
        }
      </div>
    );
  }
}

export default App;
