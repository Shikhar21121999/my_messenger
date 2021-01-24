import React from 'react';
import {ListGroup} from 'react-bootstrap'
import {useContacts} from '../Context/ContactsProvider'
const Contacts = () => {
    /*
    This is component which is used to display contacts in the list
    */
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
