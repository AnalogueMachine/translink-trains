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
  });
});