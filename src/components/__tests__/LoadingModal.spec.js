import { shallow } from 'enzyme';
import LoadingModal from '../LoadingModal';
import { Modal, Spinner } from 'react-bootstrap';
import React from 'react';

describe('Loading modal', () => {
  let wrapper;

  const mockProps = {
    visible: true
  }

  beforeEach(() => {
    wrapper = shallow(<LoadingModal {...mockProps} />);
  });

  it('should be a Modal', () => {
    expect(wrapper.type()).toBe(Modal);
  });

  it('have the correct props', () => {
    expect(wrapper.props().show).toEqual(true);
    expect(wrapper.props().centered).toEqual(true);
  });

  it('should have a body only', () => {
    expect(wrapper.props().children.type).toBe(Modal.Body);
  });

  // describe('Modal body', () => {
  //   let body;

  //   beforeEach(() => {
  //     body = wrapper.props().children;
  //   });

  //   it('should contain a paragraph element for the spinner', () => {
  //     expect(body.props.children[0].type).toBe('p');
  //     expect(body.props.children[0].props.style).toEqual({ textAlign: "center" });
  //   });

  //   describe('Spinner', () => {
  //     let spinner;

  //     beforeEach(() => {
  //       spinner = body.props.children[0].props.children;
  //     });

  //     it('should be a Spinner', () => {
  //       expect(spinner.type).toBe(Spinner);
  //     });

  //     it('should be border type', () => {
  //       expect(spinner.props.animation).toBe('border');
  //     });

  //     it('should be the primary variant', () => {
  //       expect(spinner.props.variant).toBe('primary');
  //     });
  //   });

  //   it('should contain a paragraph element for the text', () => {
  //     expect(body.props.children[1].type).toBe('p');
  //     expect(body.props.children[1].props.style).toEqual({ textAlign: "center" });
  //   });

  //   it('should say Loading', () => {
  //     expect(body.props.children[1].props.children).toBe('Loading');
  //   });
  // });
});