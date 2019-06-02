import React from 'react';
import { Modal } from 'react-bootstrap';

const ServiceModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.service.Destination1.$.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.service.Dest1CallingPoints.CallingPoint.map((stop, index) => {
          return (
            <div key={index}>{stop.$.etarr} - {stop.$.Name}</div>
          );
        })}
      </Modal.Body>
    </Modal>
  )
}

export default ServiceModal;