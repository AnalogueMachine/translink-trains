import { shallow } from 'enzyme';
import StationSelectForm from '../StationSelectForm';
import { Form, Row, Col, Button } from 'react-bootstrap';
import React from 'react';
import { isTSAnyKeyword, exportAllDeclaration } from '@babel/types';

const mockStations = [
    {
        "code": "3042A0",
        "name": "Adelaide"
    },
    {
        "code": "3042A1",
        "name": "Antrim"
    },
    {
        "code": "3042A3",
        "name": "Ballycarry"
    },
    {
        "code": "3042A2",
        "name": "Ballymena"
    }
];

const mockStationsAsElements = mockStations.map((station, index) => {
  return (
    <option key={index} value={station.code}>{station.name}</option>
  );
});

const mockOnSubmit = jest.fn();
const mockOnChange = jest.fn();

const mockProps = {
  stations: mockStations,
  onSubmit: mockOnSubmit,
  onChange: mockOnChange
}

describe('Station select form', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<StationSelectForm {...mockProps} />)
  });

  it('should be a react-bootstrap form element', () => {
    expect(wrapper.type()).toBe(Form);
  });

  it('should call the onSubmit prop when clicked', () => {
    expect(wrapper.props().onSubmit).toBe(mockOnSubmit);
  });

  it('should contain a Form Group element', () => {
    expect(wrapper.props().children[0].type).toBe(Form.Group);
  });

  describe('Form input group', () => {
    let formGroup;

    beforeEach(() => {
      formGroup = wrapper.props().children[0];
    });

    it('should have centred text', () => {
      expect(formGroup.props.style).toEqual({ textAlign: "center" });
    });

    it('should have a label with the appropriate text', () => {
      expect(formGroup.props.children[0].type).toBe(Form.Label);
      expect(formGroup.props.children[0].props.children).toBe('Get upcoming departures for...');
      expect(formGroup.props.children[0].props.className).toEqual('noTrains');
    });

    it('should have a Form Control element', () => {
      expect(formGroup.props.children[1].type).toBe(Form.Control);
    });

    describe('Dropdown', () => {
      let dropDown;

      beforeEach(() => {
        dropDown = formGroup.props.children[1];
      });

      it('should be a dropdown type', () => {
        expect(dropDown.props.as).toEqual('select');
      });

      it('should have the correct onChange function (passed in as prop)', () => {
        expect(dropDown.props.onChange).toBe(mockOnChange);
      });

      it('should be required', () => {
        expect(dropDown.props.required).toEqual(true);
      });

      it('should have the stations in the dropdown options', () => {
        expect(dropDown.props.children[0].props.children).toBe('Please select...');
        expect(dropDown.props.children[0].props.value).toEqual("");
        
        expect(dropDown.props.children[1].length).toEqual(4);
        expect(dropDown.props.children[1][0]).toEqual(mockStationsAsElements[0]);
        expect(dropDown.props.children[1][1]).toEqual(mockStationsAsElements[1]);
        expect(dropDown.props.children[1][2]).toEqual(mockStationsAsElements[2]);
        expect(dropDown.props.children[1][3]).toEqual(mockStationsAsElements[3]);
      });

    });

  });

  it('should have a Row for the form submit', () => {
    expect(wrapper.props().children[1].type).toBe(Row);
  });

  describe('Form submit row', () => {
    let formSubmit, centreCol;

    beforeEach(() => {
      formSubmit = wrapper.props().children[1];
      centreCol = formSubmit.props.children[1];
    });

    it('should be horizontally centred by using three Cols', () => {
      expect(formSubmit.props.children[0].type).toBe(Col);
      expect(formSubmit.props.children[1].type).toBe(Col);
      expect(formSubmit.props.children[2].type).toBe(Col);
    });

    it('should use the appropriate class for the centre Col', () => {
      expect(centreCol.props.className).toEqual("text-center");
    });

    describe('Submit button', () => {
      let submitButton;

      beforeEach(() => {
        submitButton = centreCol.props.children;
      });

      it('should be a react-bootstrap Button element', () => {
        expect(submitButton.type).toBe(Button);
      });

      it('should be the correct variant', () => {
        expect(submitButton.props.variant).toBe('outline-dark');
      });

      it('should be a submit button', () => {
        expect(submitButton.props.type).toBe("submit");
      });

      it('should have the right text', () => {
        expect(submitButton.props.children).toEqual("Submit");
      });
    });
  });
});