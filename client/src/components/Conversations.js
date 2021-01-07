import React from 'react';
import {ListGroup} from 'react-bootstrap'
import {useConversation} from '../Context/ConversationProvider'
const Conversations = () => {
    const {Conversation_lis} = useConversation();
    console.log(Conversation_lis)
    return (
        <ListGroup>
            {Conversation_lis.map(conversation => 
            <ListGroup.Item variant="flush" >
            {conversation.recipients.map(r => r.name).join(', ')}
            </ListGroup.Item>
            )}
        </ListGroup>
    );
}

export default Conversations;
