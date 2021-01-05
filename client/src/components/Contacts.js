import React from 'react';
import {ListGroup} from 'react-bootstrap'
import {useContacts} from '../Context/ContactsProvider'
const Contacts = () => {
    const {contact_lis} = useContacts();
    return (
        <ListGroup>
            {contact_lis.map(contact => 
            <ListGroup.Item variant="flush" key={contact.id}>
                {contact.name}
            </ListGroup.Item>
            )}
        </ListGroup>
    );
}

export default Contacts;
