import React , {useState,useRef,useContext} from 'react';
import {Modal, Button,Form} from 'react-bootstrap';
import {useContacts} from '../Context/ContactsProvider'

const NewContactModel = ({closeModal}) => {
    // this is a functional component which is used
    // to render out a Model and in turn is used to create a contact

    function handleSubmit(e) {
        // function to create a new contact and then close the model
        e.preventDefault();
        createContact(idRef.current.value,nameRef.current.value);
        closeModal();

        // create contact
    }

    const idRef=useRef()
    const nameRef=useRef()
    const {createContact} =useContacts()

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
                    <Button type="submit" >Submit</Button>
                </Form>
            </Modal.Body>
        </>
    );
}

export default NewContactModel;
