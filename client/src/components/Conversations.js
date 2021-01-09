import React from 'react';
import {ListGroup} from 'react-bootstrap'
import { useContacts } from '../Context/ContactsProvider';
import {useConversation} from '../Context/ConversationProvider'
const Conversations = () => {
    const {frmetd_cov_lis} = useConversation();
    const {contact_lis} = useContacts();
    console.log(frmetd_cov_lis)
    
    return (
        <ListGroup>
            {frmetd_cov_lis.map(conversation => 
            <ListGroup.Item variant="flush" >
            {conversation.recipients.map(r => r.name).join(', ')}
            </ListGroup.Item>
            )}
        </ListGroup>
    );
}

export default Conversations;
