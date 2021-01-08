// Context wrapper to pass conversations and createConversations method

import React, {useContext} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ConversationContext = React.createContext()   // context for Conversation

export function useConversation(){
    // wrapper for useContext
    return useContext(ConversationContext)
}

export const ConversationProvider = ({children}) => {
    // logic of the features or function
    // to send with this context
    const [Conversation_lis,setConversation_lis]=useLocalStorage('conversations',[])

    function createConversation(recipients){
        // function to create conversation
        // we store a conversation as an object consisting of recipients and messages
        // recepient is an array of id of contacts that are part of that conversation
        setConversation_lis(prevConversations => {
            return [...prevConversations, { recipients,messages:[] }]
        })
    }

    // working with conversation as it is quite hard
    // as we get id of recipient and not name
    // so we convert it into object which has recipients as name
    const formatted_conversation=Conversation_lis.map((conversation,index) => {
        
    })

    return (
        <ConversationContext.Provider value={{Conversation_lis,createConversation}}>
            {children}
        </ConversationContext.Provider>
    );
}


