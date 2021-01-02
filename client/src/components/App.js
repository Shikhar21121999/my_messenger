import Login from './Login';
import React, { useState } from 'react';
function App() {

  const [id,Setid]=useState()

  return (
    <>
      <p>{id}</p>
      <Login submit_id={Setid}/>
    </>
  );
}

export default App;
