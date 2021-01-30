// Context wrapper to pass conversations and createConversations method

import React, {useContext, useState,useEffect,useCallback} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';


const ConversationContext = React.createContext()   // context for Conversation

export function useConversation(){
    // wrapper for useContext
    return useContext(ConversationContext)
}

export const ConversationProvider = ({id,children}) => {
    // logic of the features or function
    // to send with this context
    const [Conversation_lis,setConversation_lis]=useLocalStorage('conversations',[])
    const {contact_lis} = useContacts();
    const [selectedConversationIndex,setSelectedConversationIndex]=useState(-1)  // state to store currently selected conversation initially none is selected
    const socket=useSocket()
    function createConversation(recipients){
        // function to create conversation
        // we store a conversation as an object consisting of recipients and messages
        // recipients is an array of id of contacts that are part of that conversation
        // this internally calls setConversation_lis to change state of conversation_lis
        setConversation_lis(prevConversations => {
            return [...prevConversations, { recipients,messages:[] }]
        })
    }

    // working with conversation as it is quite hard
    // as we get id of recipient and not name
    // so we convert it into object which has recipients as name
    // we also add an attribute selected which is a boolean denoting wether element is selected
    const frmetd_cov_lis=Conversation_lis.map((conversation,index) => {
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
        const messages = conversation.messages.map(message => {
            const link_cnt=contact_lis.find(contact => {
                return contact.id===message.sender
            })
            const name= (link_cnt && link_cnt.name) || message.sender
            const fromMe = id ===message.sender
            return {...message,senderName:name,fromMe }
        })
        const isSelected=selectedConversationIndex===index;
        return {...conversation, messages, recipients, isSelected}
    })

    // function addmessagetoConversation(message){
    //     // here we assume that a conversation is selected
    //     // and we send the message from current user
    //     // to all the recipients of the currently selected conversation
    //     // for this we make changes to the message array of the currently selected conversation
    //     // and add an aditional entry to it that is of message text and sender

    //     console.log("before adding")
    //     // lets make a message object
    //     const msg_obj={sender:id,message}

    //     // create a copy of conversation_lis
    //     let conv_lis=Conversation_lis;

    //     // add the message object to current_conversation in the list
    //     conv_lis[selectedConversationIndex].messages.push(msg_obj)
        
    //     // change state of conversation_lis to this new lis
    //     setConversation_lis(conv_lis)

    // }

    const addMessageToConversation=useCallback(({recipients,text,sender
    }) => {
        // not gonna get this portion
        setConversation_lis(prevConversations => {
            let madeChange = false
            const newMessage = {sender,text}
            const newConversations = prevConversations.map
            (conversation => {
                if (arrayEquality(conversation.recipients,recipients))
                {
                    madeChange = true
                    return {
                        ...conversation,
                        messages: [...conversation.messages, newMessage]
                    }
                }

                return conversation
            })

            if (madeChange) {
                return newConversations
            }   else {
                return [...prevConversations, 
                    {recipients,messages: [newMessage]}
                ]
            }
        })
    },[setConversation_lis])

    
    useEffect(() => {
        if (socket == null) return
        socket.on('receive-message',addMessageToConversation)
        return () => {
            socket.off('receive-message')
        };
    }, [socket,addMessageToConversation]);

    function sendMessage(recipients, text) {
        // socket.emit('send-message', { recipients, text })
        socket.emit('send-message', { recipients, text })
        addMessageToConversation({ recipients, text, sender: id })
    }

    const value={
        frmetd_cov_lis, // list of formatted conversation
        setSelectedConversationIndex,   // function to change state of selectedConversation index
        selectedConversationIndex,      // variable to store state of current selected conversation (index) in the list of frmted conversation
        currselectedconversation:frmetd_cov_lis[selectedConversationIndex], // stores currently selected conversation(object)
        sendMessage,    // wrapper function to send message to all the recipients of the conversation
        createConversation  // function to create a new conversation 
    }

    return (
        <ConversationContext.Provider value={value}>
            {children}
        </ConversationContext.Provider>
    );
}

function arrayEquality(a,b) {
    if (a.length !== b.length) return false

    a.sort()
    b.sort()

    return a.every((element,index) => {
        return element === b[index]
    })
}
