import React, { useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import {useContacts} from '../Context/ContactsProvider'
const NewConversationModel = ({ closeModal }) => {

    const {contact_lis} = useContacts();
    function handleSubmit(e) {
        e.preventDefault();
        console.log("Form submitted")
    }

    

    return (
        <>
            <Modal.Header closeButton>Create Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    
                </Form>
            </Modal.Body>
        </>
    );
}

export default NewConversationModel;
