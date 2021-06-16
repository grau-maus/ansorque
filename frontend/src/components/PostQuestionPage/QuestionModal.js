// NPM IMPORTS
import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

// LOCAL IMPORTS
import "./PostQuestion.css";

export default function QuestionModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <p className='p-q-m' onClick={handleShow}>
        What's your question?
      </p>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton id="q-m-h">
          <Modal.Title>Ask a question!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formQuestion">
              <Form.Control
                required
                minlength='4'
                maxlength='300'
                as="textarea"
                placeholder="e.g: Why do people walk? How do magnets work?" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Post question
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
