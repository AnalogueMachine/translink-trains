import React from "react";
import App from "./App";
import { shallow } from "enzyme";
import * as services from "./services/stationServices";
import Header from "./components/Header";
import LoadingModal from "./components/LoadingModal";
import { Container, Row, Col, Modal } from "react-bootstrap";
import StationSelectForm from "./components/StationSelectForm";
import ServiceModal from "./components/ServiceModal";
import ServiceCard from "./components/ServiceCard";
import { wrap } from "module";

const mockGetStationsReturn = [
  {
    code: "3042A0",
    name: "Adelaide"
  },
  {
    code: "3042A1",
    name: "Antrim"
  }
];

services.getStations = jest.fn();
services.getStationInformation = jest.fn();

describe("Main app", () => {
  let wrapper;

  beforeEach(() => {
    //services.getStations.mockReturnValue(mockGetStationsReturn);
    services.getStations.mockImplementationOnce(() => Promise.resolve(mockGetStationsReturn));
    wrapper = shallow(<App />);
  });

  it("renders without crashing", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("componentDidMount", () => {
    it("Should retrieve the station list and populate state", async () => {
      services.getStations.mockImplementationOnce(() => Promise.resolve(mockGetStationsReturn));
      
      await wrapper.instance().componentDidMount();

      expect(services.getStations).toBeCalled();
      expect(wrapper.state("showLoadingModal")).toEqual(false);
      expect(wrapper.state("stations")).toEqual(mockGetStationsReturn);
    });

    it('should set the proxyDown state to true if the station list response is empty', async () => {
      services.getStations.mockImplementationOnce(() => Promise.resolve([]));
      services.getStations.mockReturnValueOnce([]);

      wrapper = shallow(<App />);

      await wrapper.instance().componentDidMount();

      expect(wrapper.state("showLoadingModal")).toEqual(false);
      expect(wrapper.state("proxyDown")).toEqual(true);
      expect(wrapper.state("stations")).toEqual([]);
    });
  });

  describe('handleSubmit', () => {
    // How do we test that setState is called with one thing first and a second time with another?
    it('should retrieve station information for the chosen station and update state', async () => {
      const mockGetStationInformationReturn = { StationBoard: "Test Station Board" };
      services.getStationInformation.mockImplementationOnce(() => Promise.resolve(mockGetStationInformationReturn));
      const mockSelectedStation = 'A01234';
      const mockEvent = {preventDefault: jest.fn(), target: { value: mockSelectedStation }};
      

      wrapper.instance().handleChange(mockEvent); // Simulates station selection
      await wrapper.instance().handleSubmit(mockEvent); // Simulates form submission
    
      expect(mockEvent.preventDefault).toBeCalled();
      expect(services.getStationInformation).toBeCalledWith(mockSelectedStation);
      expect(wrapper.state('stationInformation')).toEqual(mockGetStationInformationReturn);
      expect(wrapper.state('showLoadingModal')).toEqual(false);
    });
  });

  describe('viewStops', () => {
    it('should set the state appropriately', () => {
      const mockService = 'A0123';

      wrapper.instance().viewStops(mockService);

      expect(wrapper.state('selectedService')).toEqual(mockService);
      expect(wrapper.state('showStationModal')).toEqual(true);
      expect(wrapper.find(ServiceModal).exists()).toBeTruthy();
    });
  });

  describe('handleModalClose', () => {
    it('should set the state appropriately', () => {
      wrapper.instance().handleModalClose();

      expect(wrapper.state('showStationModal')).toEqual(false);
      expect(wrapper.find(ServiceModal).exists()).toBeFalsy();
    })
  });

  describe('renderServices', () => {
    // Not sure where to begin here
    it('should return no trains if there are no services in state (null)', () => {
      const result = wrapper.instance().renderServices();

      expect(result).toEqual(<p className="noTrains">No trains due here for at least 90min.</p>);
    });

    it('should return no trains if there are no services in state (empty)', () => {
      wrapper.setState({ stationInformation: { StationBoard: { Service: null }}});
      const result = wrapper.instance().renderServices();

      expect(result).toEqual(<p className="noTrains">No trains due here for at least 90min.</p>);
    });

    it('should return one ServiceCard if there is only one service', () => {
      wrapper.setState({ stationInformation: { StationBoard: { Service: { name: "Single Service" } }}});

      const result = wrapper.instance().renderServices();
      
      expect(result.type).toBe(ServiceCard);
      expect(result.props.index).toEqual(0);
      expect(result.props.service).toEqual({name: "Single Service"});
      expect(result.props.onClick).toBe(wrapper.instance().viewStops);
    });

    it('should return multiple service cards if there is more than one service', () => {
      wrapper.setState({ stationInformation: { StationBoard: { Service: [
        { name: "Service One" },
        { name: "Service Two" }
      ]}}});

      const result = wrapper.instance().renderServices();

      expect(result.length).toEqual(2);
      expect(result[0].props.index).toEqual(0);
      expect(result[0].props.service).toEqual({name: "Service One"});
      expect(result[0].props.onClick).toBe(wrapper.instance().viewStops);

      expect(result[1].props.index).toEqual(1);
      expect(result[1].props.service).toEqual({name: "Service Two"});
      expect(result[1].props.onClick).toBe(wrapper.instance().viewStops);
    });
  });

  describe('handleChange', () => {
    it('should update the state correctly', () => {
      wrapper.instance().handleChange({ target: { value: "Test Station" } });
      expect(wrapper.state("selectedStation")).toEqual("Test Station");
    });
  })

  describe("Render", () => {
    it("should contain a Header component first", () => {
      expect(wrapper.props().children[0].type).toBe(Header);
    });

    it("should contain a loading modal", () => {
      expect(wrapper.props().children[1].type).toBe(LoadingModal);
    });

    it("should contain an error modal", () => {
      expect(wrapper.props().children[2].type).toBe(Modal);
    });

    it("should have a react-bootstrap container", () => {
      expect(wrapper.props().children[3].type).toBe(Container);
    });

    describe("Container", () => {
      let container;

      beforeEach(() => {
        container = wrapper.props().children[3];
      });

      it("should contain two rows", () => {
        expect(container.props.children[0].type).toBe(Row);
        expect(container.props.children[1].type).toBe(Row);
      });

      describe("First row - dropdown", () => {
        let row;

        beforeEach(() => {
          row = container.props.children[0];
        });

        it("should contain a Col with correct size", () => {
          expect(row.props.children.type).toBe(Col);
          expect(row.props.children.props.md).toEqual({ span: 8, offset: 2 });
        });

        it("should have the StationSelectForm in the Col", () => {
          expect(row.props.children.props.children.type).toBe(StationSelectForm);
        });

        it("should have the right stations in the form", () => {
          const form = row.props.children.props.children;

          expect(form.props.stations).toEqual(wrapper.state('stations'));
        });

        it("should have the correct onChange and onSubmit props", () => {
          const form = wrapper.find(StationSelectForm);
          expect(form.props().onChange).toBe(wrapper.instance().handleChange);
          expect(form.props().onSubmit).toBe(wrapper.instance().handleSubmit);
        });
      });

      describe("Second row - services", () => {
        let row;

        beforeEach(() => {
          row = container.props.children[1];
        });

        it("should contain a Col with correct size", () => {
          expect(row.props.children.type).toBe(Col);
          expect(row.props.children.props.md).toEqual({ span: 8, offset: 2 });
        });
        // More to do here
      });
    });
  });
});
