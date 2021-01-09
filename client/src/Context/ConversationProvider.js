// Context wrapper to pass conversations and createConversations method

import React, {useContext} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';

const ConversationContext = React.createContext()   // context for Conversation

export function useConversation(){
    // wrapper for useContext
    return useContext(ConversationContext)
}

export const ConversationProvider = ({children}) => {
    // logic of the features or function
    // to send with this context
    const [Conversation_lis,setConversation_lis]=useLocalStorage('conversations',[])
    const {contact_lis} = useContacts();

    function createConversation(recipients){
        // function to create conversation
        // we store a conversation as an object consisting of recipients and messages
        // recipients is an array of id of contacts that are part of that conversation
        setConversation_lis(prevConversations => {
            return [...prevConversations, { recipients,messages:[] }]
        })
    }

    // working with conversation as it is quite hard
    // as we get id of recipient and not name
    // so we convert it into object which has recipients as name
    const frmetd_cov_lis=Conversation_lis.map(conversation => {
        // for each conversation we get recipeints
        const recipients=conversation.recipients.map(cnt_id =>{
            // recipients was initially an array of id of contact
            // now we want to make it an array of object 
            // with id:cnt_id and a name:"name linked to that id in contact"

            // we search the contact_lis to get the contact linked to cnt_id
            const link_cnt=contact_lis.find(contact => {
                return contact.id===cnt_id
            })

            // put name as contact_name if found else put it as id
            const name=(link_cnt && link_cnt.name) || cnt_id

            // at last return an object with id equal to the id cnt_id
            // and name
            return {id: cnt_id, name}

        })
        return {...conversation,recipients}
    })

    return (
        <ConversationContext.Provider value={{frmetd_cov_lis,createConversation}}>
            {children}
        </ConversationContext.Provider>
    );
}


