import React from 'react';
import {ListGroup} from 'react-bootstrap'
import { useContacts } from '../Context/ContactsProvider';
import {useConversation} from '../Context/ConversationProvider'
const Conversations = () => {
    const {Conversation_lis} = useConversation();
    const {contact_lis} = useContacts();
    console.log(Conversation_lis)
    // test contact_id
    const cnt_id=Conversation_lis[2].recipients[0]
    // filter to get the contact with cnt_id
    const reqd_cnt=contact_lis.filter(contact => contact.id === cnt_id);
    console.log(reqd_cnt)
    console.log(reqd_cnt[0].name)
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
