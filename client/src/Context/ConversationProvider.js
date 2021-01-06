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
        // function to create contact
        setConversation_lis(prevConversations => {
            return [...prevConversations, { recipients,messages:[] }]
        })
    }

    return (
        <ConversationContext.Provider value={{Conversation_lis,createConversation}}>
            {children}
        </ConversationContext.Provider>
    );
}


