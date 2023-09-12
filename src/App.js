import logo from './logo.svg';
import './App.css';
//Generate 'token' link
const crypto = require('crypto');

function App() {

  const PrivateSpaceLink = () => {
    const token = generateUniqueToken(16);
    const privateSpaceUrl = `/private-space?token=${token}`;
  
    return (
      <div>
        <p>Copier l'url de votre page privée: {privateSpaceUrl}</p>
        <a href={privateSpaceUrl}>Access Private Space</a>
      </div>
    );
  }

  function generateUniqueToken(length) {
    return crypto.randomBytes(length).toString('hex');
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          <button onClick={PrivateSpaceLink()}>Générer une page de partage privée</button>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
