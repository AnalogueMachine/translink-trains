import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const ServiceCard = (props) => {
  return (
    <Card style={{ margin: "10px 0 10px 0", boxShadow: "2px 4px 4px #888888"}} onClick={() => props.onClick(props.service)} value={props.index}>
      <Card.Body>
        <Card.Text style={{ fontSize: "large" }}>
          <Row>
            <Col xs={8}>
              <span>{props.service.Destination1.$.name}</span>
            </Col>
            <Col>
              <span>{props.service.ServiceStatus.$.Status}</span>
            </Col>
            <span>|</span>
            <Col style={{ textAlign: "center" }}>
              {(props.service.ServiceStatus.$.Status === "Delayed") ?
                <span style={{ color: "red" }}>{props.service.ExpectedDepartTime.$.Time}</span>
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