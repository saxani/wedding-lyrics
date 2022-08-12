import React, { useState, useEffect } from 'react';
import Lyrics from './components/Lyrics';
import Submit from './components/Submit';
import './App.css';

const App = () => {
  const [serverData, setServerData] = useState('');

  useEffect(() => {
    callBackendAPI()
      .then(res => setServerData(res.lyrics))
      .catch(err => console.log(err));
  }, []);

  const callBackendAPI = async () => {
    const response = await fetch('/fetch_lyrics');
    const body = await response.json();
    
    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  return (
    <div className="app">
        {serverData && <Lyrics data={serverData} />}
        <Submit />
    </div>
  );
}

export default App;