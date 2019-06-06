import React from 'react';
import { Modal } from 'react-bootstrap';

const showStops = (service) => {
  let stops =[];

  if(+service.Dest1CallingPoints.$.NumCallingPoints > 1) {
    stops = service.Dest1CallingPoints.CallingPoint.map((stop, index) => {
        return (
          <div key={index}>{stop.$.etarr} - {stop.$.Name}</div>
        );
      }
    );
  } else if(+service.Dest1CallingPoints.$.NumCallingPoints === 1) {
    stops = [<div key="onlystop">{service.Dest1CallingPoints.CallingPoint.$.etarr} - {service.Dest1CallingPoints.CallingPoint.$.Name}</div>];
  }

  stops.push(<div key="destination">{service.Destination1.$.etarr} - {service.Destination1.$.name}</div>)

  return stops;
}

const ServiceModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.service.Destination1.$.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showStops(props.service)}
      </Modal.Body>
    </Modal>
  )
}

export default ServiceModal;