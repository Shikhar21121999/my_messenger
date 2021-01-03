import React , {useState} from 'react';
import {Tab, Nav, Button,Modal} from 'react-bootstrap';
import Conversations from './Conversations.js';
import Contacts from './Contacts.js';
import NewContactModel from './NewContactModel.js';
import NewConversationModel from './NewConversationModel.js';

const CONVERSATIONS_KEY='conversation'
const CONTACTS_KEY='contacts'


const Sidebar = ({id}) => {

    const [activeKey,setActiveKey]=useState(CONVERSATIONS_KEY)
    const conversationsOpen = activeKey === CONVERSATIONS_KEY
    const [show,setShow]=useState(false)

    const closeModal=() =>{
        setShow(false)
    }

    return (
        <div style={{width: '250px' }} className="d-flex flex-column">
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                        <Conversations />
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTACTS_KEY}>
                        <Contacts />
                    </Tab.Pane>
                </Tab.Content>
                <div className="p-2 border-top border-right small">
                    Your Id: <span className="text-muted">{id}</span>
                </div>
                <Button onClick={() => setShow(true)} className="rounded-0">
                    New {conversationsOpen ? 'Conversation' : 'Contact'}
                </Button>
            </Tab.Container>
            <Modal show={show} onHide={closeModal}>
                    {conversationsOpen ?
                        <NewConversationModel closeModal={closeModal}/> :
                        <NewContactModel closeModal={closeModal}/>  
                    }
            </Modal>
        </div>
    );
}

export default Sidebar;
