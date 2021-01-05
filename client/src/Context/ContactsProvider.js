import React, {useContext} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ContactContext = React.createContext()

export function useContacts(){
    return useContext(ContactContext)
}

export const ContactsProvider = ({children}) => {
    // logic of the features or function
    // to send with this context
    const [contact_lis,setContact]=useLocalStorage('contacts',[])

    function createContact(id,name){
        // function to create contact
        setContact(prevContacts => {
            return [...prevContacts, { id, name }]
        })
    }

    return (
        <ContactContext.Provider value={{contact_lis,createContact}}>
            {children}
        </ContactContext.Provider>
    );
}


