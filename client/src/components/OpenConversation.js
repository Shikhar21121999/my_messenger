import React, { useState,useCallback } from 'react';
import {Form,InputGroup,Button} from 'react-bootstrap'
import {ListGroup} from 'react-bootstrap'
import { useConversation } from '../Context/ConversationProvider';

const OpenConversation = () => {
    // fucntional component to render out right hand side of the screen
    // It basically renders out messages to or from the open conversation(currselectedVonversation)
    // also a form to let the current user type a message
    // so that it can be sent to people in the conversation

    const {sendMessage,currselectedconversation} =useConversation()
    const setRef=useCallback(
        (node) => {
            if(node){
                node.scrollIntoView({smooth:true})
            }
        },
        [],
    )

    const [text,setText]=useState('')
    function handelSubmit(e){
        e.preventDefault()
        // ensure that message is sent only if there is a currently selectedconversation
        // message is sent from current id to all the recepients of selectedConversation
        sendMessage(
            currselectedconversation.recipients.map(r => r.id),
            text
          )
        setText('')
    }
    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column 
                align-items-start justify-content-end px-3">
                    {currselectedconversation.messages.map((message,index) =>{
                        // check if the current message is lastmessage
                        const lastMessage=currselectedconversation.messages.length-1===index
                        return (
                            <div 
                            className={`my-1 d-flex flex-column
                            ${message.fromMe ? 'align-self-end' : ''}`}
                            key={index}
                            ref={lastMessage ? setRef : null}
                            >
                                <div className={` rounded px-2 py-1 
                                ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                                    {message.text}
                                </div>
                                <div className={`text-muted small 
                                ${message.fromMe ? 'text-right' : ''}`}>
                                    {message.fromMe ? 'You' : message.senderName}
                                </div>    
                            </div>
                        )
                    })}
                </div>
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
