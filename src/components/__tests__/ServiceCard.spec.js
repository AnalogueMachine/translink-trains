import { shallow } from 'enzyme';
import ServiceCard from '../ServiceCard';
import { Card } from 'react-bootstrap';
import React from 'react';

const mockService = {
  Destination1: {
    $: {
      name: "Carrickfergus"
    }
  },
  Origin1: {
    $: {
      name: "Belfast Central"
    }
  },
  ArriveTime: {
    $: {
      time: "1100"
    }
  },
  DepartTime: {
    $: {
      time: "1100"
    }
  },
  ServiceStatus: {
    $: {
      Status: "Delayed"
    }
  },
  Delay: {
    $: {
      Minutes: 5
    }
  },
  Platform: {
    $: {
      Number: "1"
    }
  }
};

describe('ServiceCard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ServiceCard service={mockService} />);
  });

  it('should be a React-Bootstrap Card element', () => {
    expect(wrapper.type()).toBe(Card);
  });

  it('should have appropriate styling', () => {
    const cardStyle = {
      margin: '10px 0 10px 0',
      boxShadow: '2px 4px 4px #888888'
    };

    expect(wrapper.props().style).toEqual(cardStyle);
  });

  describe('Card body', () => {
    let body;

    beforeEach(() => {
      body = wrapper.props().children;
    });

    it('should be a React-Bootstrap Card Body type', () => {
      expect(body.type).toBe(Card.Body);
    });

    it('should contain a Title element', () => {
      expect(body.props.children[0].type).toBe(Card.Title);
    });

    it('should have the destination in the title', () => {
      expect(body.props.children[0].props.children[0]).toEqual("Destination: ");
      expect(body.props.children[0].props.children[1]).toEqual("Carrickfergus");
    });

    it('should contain a Body element', () => {
      expect(body.props.children[1].type).toBe(Card.Text);
    });

    describe('Card text', () => {
      let cardText;

      beforeEach(() => {
        cardText = body.props.children[1];
      });

      it('should contain the train origin', () => {
        expect(cardText.props.children[0]).toBe('Origin: ');
        expect(cardText.props.children[1]).toBe(mockService.Origin1.$.name);
      });

      it('should contain the due time for the train', () => {
        expect(cardText.props.children[3]).toBe('Due: ');
        expect(cardText.props.children[4]).toBe(mockService.ArriveTime.$.time);
      });

      it('should contain the departure time for the train', () => {
        expect(cardText.props.children[6]).toBe('Departing: ');
        expect(cardText.props.children[7]).toBe(mockService.DepartTime.$.time);
      });

      it('should contain the train status', () => {
        expect(cardText.props.children[9]).toBe('Status: ');
        expect(cardText.props.children[10]).toBe(mockService.ServiceStatus.$.Status);
      });

      it('should contain the train delay time in minutes', () => {
        expect(cardText.props.children[12]).toBe('Delay: ');
        expect(cardText.props.children[13]).toBe(mockService.Delay.$.Minutes);
        expect(cardText.props.children[14]).toBe(' minutes');
      });

      it('should contain the train platform number', () => {
        expect(cardText.props.children[16]).toBe('Platform: ');
        expect(cardText.props.children[17]).toBe(mockService.Platform.$.Number);
      });
    });
  });
});