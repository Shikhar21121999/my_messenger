import Login from './Login';
import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard from './Dashboard';
import {ContactsProvider} from '../Context/ContactsProvider';
import { ConversationProvider } from '../Context/ConversationProvider';


function App() {

  const [id,Setid]=useLocalStorage('id',)
  
  return (
    <>
      <ContactsProvider>
      <ConversationProvider>
      {id ? <Dashboard id={id} /> : <Login submit_id={Setid} /> }
      {/* Setid is passed as arguement
          in Login component which is then
          used to change state of id
          that is whenever submit_id is called
          it will set the value to the id state
      */}

      </ConversationProvider>
      </ContactsProvider>
    </>
  );
}

export default App;
