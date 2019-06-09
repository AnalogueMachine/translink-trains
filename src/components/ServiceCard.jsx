import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const ServiceCard = (props) => {
  return (
    <Card style={{ margin: "10px 0 10px 0", boxShadow: "2px 4px 4px #888888"}} onClick={() => props.onClick(props.service)} value={props.index}>
      <Card.Body>
        <Card.Text style={{ fontSize: "small" }}>
          <Row>
            <Col xs={6}>
              <span>{props.service.Destination1.$.name}</span>
            </Col>
            <Col xs={3}>
              <span>{props.service.ServiceStatus.$.Status}</span>
            </Col>
            <Col xs={3} style={{ textAlign: "center" }}>
              {(props.service.ServiceStatus.$.Status === "Delayed") ?
                <span style={{ color: "red" }}>{props.service.ExpectedDepartTime.$.time}</span>
              :
                <span>{props.service.DepartTime.$.time}</span>
              }
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ServiceCard;