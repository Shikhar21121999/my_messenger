import React ,{useRef} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
const NewConversationModel = ({closeModal}) => {

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Form submitted")
    }

    const idRef=useRef()
    const nameRef=useRef()

    return (
        <>
            <Modal.Header closeButton>Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>ID</Form.Label>
                        <Form.Control ref={idRef} type="text" ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref={nameRef} type="text" ></Form.Control>
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                </Form>
            </Modal.Body>
        </>
    );
}

export default NewConversationModel;
