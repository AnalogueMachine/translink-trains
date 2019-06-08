import { shallow } from 'enzyme';
import ServiceCard from '../ServiceCard';
import { Card, Row, Col } from 'react-bootstrap';
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

const mockOnClick = jest.fn();

const mockIndex = 0;

const mockProps = {
  service: mockService,
  onClick: mockOnClick,
  index: mockIndex
}

describe('ServiceCard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ServiceCard {...mockProps}/>);
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

  it('should call onclick when clicked', () => {
    wrapper.simulate('click');
    expect(mockOnClick).toBeCalledWith(mockIndex);
  });

  describe('Card body', () => {
    let body;

    beforeEach(() => {
      body = wrapper.props().children;
    });

    it('should be a React-Bootstrap Card Body type', () => {
      expect(body.type).toBe(Card.Body);
    });

    it('should contain a Text element', () => {
      expect(body.props.children.type).toBe(Card.Text);
    });

    describe('Card text', () => {
      let cardText;

      beforeEach(() => {
        cardText = body.props.children;
      });

      it('should have some text styling', () => {
        expect(cardText.props.style).toEqual({ fontSize: "large" });
      });

      it('should contain a row with two cols', () => {
        expect(cardText.props.children.type).toBe(Row);
        expect(cardText.props.children.props.children[0].type).toBe(Col);
        expect(cardText.props.children.props.children[2].type).toBe(Col);
      });

      it('should have a pipe between the two cols', () => {
        expect(cardText.props.children.props.children[1].type).toBe('span');
        expect(cardText.props.children.props.children[1].props.children).toBe('|');
      });

      describe('First col', () => {
        let col;

        beforeEach(() => {
          col = cardText.props.children.props.children[0];
        });

        it('should have the correct size', () => {
          expect(col.props.xs).toEqual(8);
        });

        it('should contain a span with the service destination', () => {
          expect(col.props.children.type).toBe('span');
          expect(col.props.children.props.children).toEqual("Carrickfergus");
        });
      });

      describe('Second col', () => {
        let col;

        beforeEach(() => {
          col = cardText.props.children.props.children[2];
        });

        it('should have the correct style', () => {
          expect(col.props.style).toEqual({ textAlign: "center" });
        });

        it('should contain a span with the service arrive time', () => {
          expect(col.props.children.type).toBe('span');
          expect(col.props.children.props.children).toEqual("1100");
        });
      });
    });
  });
});