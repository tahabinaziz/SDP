import { React, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
const ModalPopUp = ({ display, onCloseModal, data, loadQuiz,children }) => {
  const [show, setShow] = useState(display ? true : false);
  let history = useHistory();
  const handleClose = () => {
    setShow(false);
    onCloseModal();
  };
  const onSubmit = async (e) => {
    e.preventDefault();
   console.log(data);

   let edit = await axios.patch(`http://localhost:5000/api/question/${data._id}`, data);
   console.log(edit)
   if(edit.status==200){
     loadQuiz(true);
   }
   else{
    loadQuiz(false);
   }
     history.push("/viewQuestion");
  };

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
          <Button variant="primary" onClick={onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalPopUp;
