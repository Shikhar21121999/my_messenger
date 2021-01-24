import React, { useState } from 'react';
import {Form,InputGroup,Button} from 'react-bootstrap'
import {ListGroup} from 'react-bootstrap'
import { useConversation } from '../Context/ConversationProvider';

const OpenConversation = () => {
    // fucntional component to render out right hand side of the screen
    // It basically renders out messages to or from the open conversation(currselectedVonversation)
    // also a form to let the current user type a message
    // so that it can be sent to people in the conversation

    const {sendMessage,currselectedconversation} =useConversation()

    function handelSubmit(e){
        e.preventDefault()
        // message is sent from current id to all the recepients of selectedConversation
        sendMessage(currselectedconversation.recipients.map(r=>r.id),
        text
        )
        setText('')
    }

    const [text,setText]=useState('')
    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
            </div>
            <Form onSubmit={handelSubmit}>
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            value={text}
                            onChange={e => setText(e.target.value)}
                            style={{ height :"75px" , resize : "none" }}
                            />
                        <InputGroup.Append>
                            <Button type="submit">Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    );
}

export default OpenConversation;
