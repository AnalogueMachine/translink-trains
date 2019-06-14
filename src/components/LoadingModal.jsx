import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';

const LoadingModal = (props) => {
  return (
    <Modal show={props.visible} centered>
      <Modal.Body>
        <div style={{ textAlign: "center" }}>
          <Spinner animation="border" variant="dark"></Spinner>
        </div>
        <p style={{ textAlign: "center" }}>
          Loading
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default LoadingModal;