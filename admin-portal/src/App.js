import React from 'react'
import { formatDate } from '@univ/common'
import { Don } from '@univ/common-ui'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Admin Portal</p>
        {formatDate('Alex')}
        <Don greeting="Hola" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
