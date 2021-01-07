import React, { useRef , useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import {useContacts} from '../Context/ContactsProvider'
import {useConversation} from '../Context/ConversationProvider'
const NewConversationModel = ({ closeModal }) => {

    const [selectedContactIds, setSelectedContactIds] = useState([])
    // this represents the state of conversation
    // that is the conversation is represented as the contactids selected
    const {contact_lis} = useContacts();
    const {createConversation} = useConversation();
    
    function handleSubmit(e) {
        // function to submit the form 
        // to create a new conversation
        e.preventDefault();
        // console.log("submitted");
        // call to create a new conversation
        // out of currently selected contact ids
        createConversation(selectedContactIds);
        closeModal();
    }

    // function handleCheckboxChange(contactId) {
    //     setSelectedContactIds(prevSelectedContactIds => {
    //       if (prevSelectedContactIds.includes(contactId)) {
    //         return prevSelectedContactIds.filter(prevId => {
    //           return contactId !== prevId
    //         })
    //       } else {
    //         return [...prevSelectedContactIds, contactId]
    //       }
    //     })
    //   }

    function handelcheckboxChange(contanctID){
        // This function is called whenever a id 
        // is included or removed from current conversation
        // hence we need to make changes to state of conversation
        // to reflect those changes
        setSelectedContactIds(prevSelectedContactIds=> {
            if (prevSelectedContactIds.includes(contanctID)) {
                // if it already includes then we have to remove it
                return prevSelectedContactIds.filter(prev_id => {
                    return prev_id !==contanctID
                })
            }
            // else we need to just include it
            else
            {
                return [...prevSelectedContactIds,contanctID];
            }
        })
    }

    return (
        <>
            <Modal.Header closeButton>Create Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contact_lis.map(contact =>(
                        <Form.Group controlId={contact.id} key={contact.id} >
                            <Form.Check 
                                type="checkbox" 
                                label={contact.name}
                                value={selectedContactIds.includes(contact.id)}
                                onChange={() => handelcheckboxChange(contact.id)}
                            />
                        </Form.Group> 
                    ))}
                    <Button type="submit" >Submit</Button>
                </Form>
            </Modal.Body>
        </>
    );
}

export default NewConversationModel;
