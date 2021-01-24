import React from 'react';
import { useConversation } from '../Context/ConversationProvider';
import OpenConversation from './OpenConversation';
import Sidebar from './Sidebar';

export default function Dashboard({id}){
    // functional component to render out dashboard
    // we render sidebar with given id
    // also we render OpenConversation only if a conversation is currently selected
    const {currselectedconversation} = useConversation()
    console.log("currently selected conversation is")
    console.log(currselectedconversation)
    
    return(
        <div className="d-flex" style={{ height: '100vh' }}>
            <Sidebar id={id} />
            {currselectedconversation && <OpenConversation/>}
        </div>
    )
}