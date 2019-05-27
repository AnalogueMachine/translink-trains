import React from 'react';
import { Card } from 'react-bootstrap';

const ServiceCard = (props) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          Destination: {props.service.Destination1.$.name}
        </Card.Title>
        <Card.Text></Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ServiceCard;