import { shallow } from 'enzyme';
import ServiceCard from '../ServiceCard';
import { Card, Row, Col } from 'react-bootstrap';
import React from 'react';

const mockServiceDelayed = {
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
  ExpectedDepartTime: {
    $: {
      time: "1105"
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

const mockServiceOnTime = {
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
      Status: "On time"
    }
  }
};

const mockOnClick = jest.fn();

const mockIndex = 0;

const defaultMockProps = {
  service: mockServiceDelayed,
  onClick: mockOnClick,
  index: mockIndex
}

describe('ServiceCard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ServiceCard {...defaultMockProps} />);
  });

  it('should be a React-Bootstrap Card element', () => {
    expect(wrapper.type()).toBe(Card);
  });

  it('should call onClick when clicked, sending the selected service', () => {
    wrapper.simulate('click');
    expect(mockOnClick).toBeCalledWith(mockServiceDelayed);
  });

  it('should have the right css classes', () => {
    expect(wrapper.props().className).toBe('servicecard');
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

      it('should contain a row with three cols', () => {
        expect(cardText.props.children.type).toBe(Row);
        expect(cardText.props.children.props.children[0].type).toBe(Col);
        expect(cardText.props.children.props.children[1].type).toBe(Col);
        expect(cardText.props.children.props.children[2].type).toBe(Col);
      });


      describe('First col', () => {
        let col;

        beforeEach(() => {
          col = cardText.props.children.props.children[0];
        });

        it('should have the correct size', () => {
          expect(col.props.xs).toEqual(6);
        });

        it('should contain a span with the service destination', () => {
          expect(col.props.children.type).toBe('span');
          expect(col.props.children.props.children).toEqual("Carrickfergus");
        });
      });

      describe('Second col', () => {
        let col;

        beforeEach(() => {
          col = cardText.props.children.props.children[1];
        });

        it('should have the correct size', () => {
          expect(col.props.xs).toEqual(3);
        });

        it('should have the correct style prop', () => {
          expect(col.props.style).toEqual({ paddingLeft: 'inherit' });
        })

        it('should contain a span with the service status', () => {
          expect(col.props.children.type).toBe('span');
          expect(col.props.children.props.children).toEqual("Delayed");
        });
      });

      describe('Third col', () => {
        let col;

        beforeEach(() => {
          col = cardText.props.children.props.children[2];
        });

        it('should have the correct size', () => {
          expect(col.props.xs).toEqual(3);
        });

        it('should have the correct style', () => {
          expect(col.props.style).toEqual({ textAlign: "center" });
        });

        it('should contain a span', () => {
          expect(col.props.children.type).toBe('span');
        });

        it('should display the correct departure time in red if the train is delayed', () => {
          expect(col.props.children.props.children).toEqual("1105");
          expect(col.props.children.props.style).toEqual({ color: "red" });
        });

        it('should display the correct departure time if the train is not delayed', () => {
          wrapper.setProps({ service: mockServiceOnTime });
          col = wrapper.props().children.props.children.props.children.props.children[2];
          expect(col.props.children.props.children).toEqual("1100");
        });
      });
    });
  });
});