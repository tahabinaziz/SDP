import { React, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ModalPopUp = ({ display, onCloseModal, data, children }) => {
  const [show, setShow] = useState(display ? true : false);

  const handleClose = () => {
    setShow(false);
    onCloseModal();
  };

  console.log(data);
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalPopUp;
