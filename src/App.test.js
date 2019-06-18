import React from "react";
import App from "./App";
import { shallow } from "enzyme";
import * as services from "./services/stationServices";
import Header from "./components/Header";
import LoadingModal from "./components/LoadingModal";
import { Container, Row, Col } from "react-bootstrap";
import StationSelectForm from "./components/StationSelectForm";
import ServiceModal from "./components/ServiceModal";

services.getStations = jest.fn();

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

describe("Main app", () => {
  let wrapper;

  beforeEach(() => {
    services.getStations.mockReturnValue(mockGetStationsReturn);
    wrapper = shallow(<App />);
  });

  it("renders without crashing", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("componentDidMount", () => {
    it("Should retrieve the station list and populate state", () => {
      wrapper.instance().componentDidMount();
      expect(services.getStations).toBeCalled();
      expect(wrapper.state("showLoadingModal")).toEqual(false);
      expect(wrapper.state("stations")).toEqual(mockGetStationsReturn);
    });
  });

  describe('handleSubmit', () => {
    // How do we test that setState is called with one thing first and a second time with another?
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

    it("should have a react-bootstrap container", () => {
      expect(wrapper.props().children[2].type).toBe(Container);
    });

    describe("Container", () => {
      let container;

      beforeEach(() => {
        container = wrapper.props().children[2];
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

        // More to do here
      });
    });
  });
});
