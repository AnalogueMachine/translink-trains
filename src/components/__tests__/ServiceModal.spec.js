import { shallow } from 'enzyme';
import ServiceModal from '../ServiceModal';
import { Modal } from 'react-bootstrap';
import React from 'react';

const mockSelectedService = {
  Destination1: {
    $: {
      name: "Carrickfergus",
      etarr: "1425"
    }
  },
  Dest1CallingPoints: {
    $: {
      NumCallingPoints: "2"
    },
    CallingPoint: [
      {
        $: {
          Name: "Antrim",
          etarr: "1413"
        }
      },
      {
        $: {
          Name: "Belfast",
          etarr: "1420"
        }
      }
    ]
  },
};

const mockOnHide = jest.fn();

const mockProps = {
  service: mockSelectedService,
  show: true,
  onHide: mockOnHide
}

describe('Service Modal', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ServiceModal {...mockProps} />);
  });

  it('should be a react-bootstrap Modal', () => {
    expect(wrapper.type()).toBe(Modal);
  });

  it('should have the right props', () => {
    expect(wrapper.props().show).toEqual(true);
    expect(wrapper.props().onHide).toEqual(mockOnHide);
    expect(wrapper.props().centered).toEqual(true);
  });

  describe('Modal Header', () => {
    let header;

    beforeEach(() => {
      header = wrapper.props().children[0];
    });

    it('should be a modal header component', () => {
      expect(header.type).toBe(Modal.Header);
    });

    it('should have a close button', () => {
      expect(header.props.closeButton).toEqual(true);
    });

    it('should contain the service destination in the header', () => {
      expect(header.props.children.type).toBe(Modal.Title);
      expect(header.props.children.props.children).toEqual(mockSelectedService.Destination1.$.name);
    });
  });

  describe('Modal body', () => {
    let body;

    beforeEach(() => {
      body = wrapper.props().children[1];
    });

    it('should be a modal body component', () => {
      expect(body.type).toBe(Modal.Body);
    });

    it('should contain a list of all the stops of the selected service', () => {
      expect(body.props.children[0].type).toBe('div');
      expect(body.props.children[0].props.children[0]).toBe("1413");
      expect(body.props.children[0].props.children[1]).toBe(" - ");
      expect(body.props.children[0].props.children[2]).toBe("Antrim");

      expect(body.props.children[1].type).toBe('div');
      expect(body.props.children[1].props.children[0]).toBe("1420");
      expect(body.props.children[1].props.children[1]).toBe(" - ");
      expect(body.props.children[1].props.children[2]).toBe("Belfast");
    });

    it('should contain the destination stop in the list of stops', () => {
      expect(body.props.children[2].type).toBe('div');
      expect(body.props.children[2].props.children[0]).toBe("1425");
      expect(body.props.children[2].props.children[1]).toBe(" - ");
      expect(body.props.children[2].props.children[2]).toBe("Carrickfergus");
    });

    it('should correctly handle a service with only one calling point', () => {
      const mockServiceOneCallingPoint = {
        Destination1: {
          $: {
            name: "Carrickfergus",
            etarr: "1425"
          }
        },
        Dest1CallingPoints: {
          $: {
            NumCallingPoints: "1"
          },
          CallingPoint: {
            $: {
              Name: "Antrim",
              etarr: "1413"
            }
          }
        },
      };

      const mockPropsOneCallingPoint = {
        service: mockServiceOneCallingPoint,
        show: true,
        onHide: mockOnHide
      }

      wrapper = shallow(<ServiceModal {...mockPropsOneCallingPoint} />);
      body = wrapper.props().children[1];

      expect(body.props.children[0].type).toBe('div');
      expect(body.props.children[0].props.children[0]).toBe("1413");
      expect(body.props.children[0].props.children[1]).toBe(" - ");
      expect(body.props.children[0].props.children[2]).toBe("Antrim");

      expect(body.props.children[1].type).toBe('div');
      expect(body.props.children[1].props.children[0]).toBe("1425");
      expect(body.props.children[1].props.children[1]).toBe(" - ");
      expect(body.props.children[1].props.children[2]).toBe("Carrickfergus");
    });

    it('should correctly handle a service with no calling points', () => {
      const mockServiceNoCallingPoints = {
        Destination1: {
          $: {
            name: "Carrickfergus",
            etarr: "1425"
          }
        },
        Dest1CallingPoints: {
          $: {
            NumCallingPoints: "0"
          }
        },
      };

      const mockPropsNoCallingPoints = {
        service: mockServiceNoCallingPoints,
        show: true,
        onHide: mockOnHide
      }

      wrapper = shallow(<ServiceModal {...mockPropsNoCallingPoints} />);
      body = wrapper.props().children[1];

      expect(body.props.children[0].type).toBe('div');
      expect(body.props.children[0].props.children[0]).toBe("1425");
      expect(body.props.children[0].props.children[1]).toBe(" - ");
      expect(body.props.children[0].props.children[2]).toBe("Carrickfergus");
    });
  })
});