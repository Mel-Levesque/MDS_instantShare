import React from 'react';
import './styles/App.css';
import Home from './pages/Home';
import Router from './navigation/Router';

function App() {
  return (
    <div className="App">
      <body>
        <Router/>
        {/* <Home /> */}
      </body>
    </div>
    
  );
}

export default App;