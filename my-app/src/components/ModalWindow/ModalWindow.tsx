import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import canvasState from '../../store/canvasState';

function ModalWindow() {
  const [show, setShow] = useState(true);
  const [errorInput, setErrorInput] = useState<string | null>(null);

  const [userName, setUserName] = useState("");

  const handleClose = () => {
    if(userName.length > 2) {
      canvasState.setUserName(userName);
      setShow(false);
      return;
    }
    setErrorInput("Length name is not valid");
  }

  const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.currentTarget.value.length > 2) {
      setErrorInput(null);
    }
    setUserName(e.currentTarget.value);
  }
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter your name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <input onChange={onChangeUserName} value={userName} type="text" />
         {errorInput && <div style={{color: 'red'}}>{errorInput}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalWindow;