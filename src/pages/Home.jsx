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
  let imageList = [];
  const [imgList, setImgList] = useState([]);

  getImages();

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

  function addImage() {
    const isValid = postImage();
  }

  function getImages() {
    imageList = getImageList;
    console.log(imageList);
  }

  const fetchPost = async () => {
    const db = getFirestore(app);
    await getDocs(collection(db, "img")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setImgList(newData);
      console.log(imgList, newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);
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
      <div>
        {imgList?.map((img, i) => (
          <p key={i}>{img.url}</p>
        ))}
      </div>
      {imageList}
      <button onClick={addImage}>Ajouter une image</button>
    </div>
  );
};

export default Home;
