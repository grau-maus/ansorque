// NPM IMPORTS
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";

// LOCAL IMPORTS
import { postAQuestion } from "../../store/questions";
import "./PostQuestion.css";

export default function QuestionModal() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [content, setContent] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postAQuestion(content));
    setContent('');
    handleClose();
  };

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
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formQuestion">
              <Form.Control
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                minLength='4'
                maxLength='300'
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
