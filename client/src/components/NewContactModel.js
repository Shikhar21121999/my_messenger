import React , {useState,useRef} from 'react';
import {Modal, Button,Form} from 'react-bootstrap';
const NewContactModel = ({closeModal}) => {


    function handleSubmit(e) {
        e.preventDefault();
    }

    const idRef=useRef()
    const nameRef=useRef()

    return (
        <>
            <Modal.Header closeButton>Contact</Modal.Header>
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
                </Form>
            </Modal.Body>
        </>
    );
}

export default NewContactModel;
