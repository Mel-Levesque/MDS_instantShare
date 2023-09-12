//import { useNavigate } from "react-router-dom";
import { getImageList, postImage } from "../services/FirestoreService.js";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import app from "../index";
import ImageList from "../components/ImageList";

//Generate 'token' link
const { lib } = require("crypto-js");

const Home = () => {
  //const navigate = useNavigate();
  let goToLink = null;

  const PrivateSpaceLink = () => {
    const token = generateRandomToken(16);
    const privateSpaceUrl = `/private-space?token=${token}`;

    console.log(privateSpaceUrl);

    goToLink = (
      <div>
        <p>Copier l'url de votre page privée: {privateSpaceUrl}</p>
        <a href={privateSpaceUrl}>Access Private Space</a>
      </div>
    );
  };

  function generateRandomToken(length) {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomToken = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(lib.WordArray.random(1) * charset.length);
      randomToken += charset.charAt(randomIndex);
    }
    return randomToken;
  }

  return (
    <div>
      <ImageList />
      <header>
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>Edit <code>src/App.js</code> and save to reload.</p> */}

        <button onClick={PrivateSpaceLink}>
          Générer une page de partage privée
        </button>
        {/* <button onClick={() => navigate(`/privateSpace`)}>
          Go to private space
        </button> */}
        {/* {goToLink && (
          <div>
            <h1>Messages:</h1>
            {goToLink}
          </div>
        )} */}
      </header>
    </div>
  );
};

export default Home;
