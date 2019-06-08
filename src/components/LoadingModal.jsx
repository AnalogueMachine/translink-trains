import React from 'react';
import { Modal, Spinner, Row, Col } from 'react-bootstrap';

const LoadingModal = (props) => {
  return (
    <Modal show={props.visible} centered>
      <Modal.Body>
        <Spinner animation="border" variant="primary"></Spinner>
        <p style={{ textAlign: "center" }}>
          Loading
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default LoadingModal;