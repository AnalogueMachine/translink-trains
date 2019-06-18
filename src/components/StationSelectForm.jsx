import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const StationSelectForm = (props) => {
  return (
    <Form onSubmit={props.onSubmit}>
      <Form.Group style={{ textAlign: "center" }}>
        <Form.Label>Get me upcoming departures for...</Form.Label>
        <Form.Control as="select" onChange={props.onChange} required>
          <option value="">Please select...</option>
          {props.stations.map((station, index) => {
            return (
              <option key={index} value={station.code}>{station.name}</option>
            )
          })}
        </Form.Control>
      </Form.Group>
      <Row>
        <Col />
        <Col className="text-center">
          <Button variant="outline-dark" type="submit">Submit</Button>
        </Col>
        <Col />
      </Row>
    </Form>
  )
}

export default StationSelectForm;