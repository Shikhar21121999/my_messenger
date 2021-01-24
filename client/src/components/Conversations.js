import React from 'react';
import {ListGroup} from 'react-bootstrap'
import { useContacts } from '../Context/ContactsProvider';
import {useConversation} from '../Context/ConversationProvider'
const Conversations = () => {
    /*
    This component is used to render out conversation list
    this is also used to make a conversation selected
    */
    const {frmetd_cov_lis,setSelectedConversationIndex,selectedConversationIndex} = useConversation();
    console.log(frmetd_cov_lis)
    console.log(selectedConversationIndex)

    return (
        <ListGroup>
            {frmetd_cov_lis.map((conversation,index) => 
            <ListGroup.Item variant="flush" action 
            active={conversation.isSelected}
            onClick={() => setSelectedConversationIndex(index)}
            key={index}
            >
            {conversation.recipients.map(r => r.name).join(', ')}
            </ListGroup.Item>
            )}
        </ListGroup>
    );
}

export default Conversations;
