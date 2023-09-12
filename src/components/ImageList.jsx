import "../styles/App.css";
import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import app from "../index";
import "firebase/storage";

const Todo = () => {
  const [img, setImg] = useState("");
  const [imgList, setImgList] = useState([]);
  const [imgLists, setImgLists] = useState([]);
  const db = getFirestore(app);
  const storage = getStorage(app);

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      console.log("12345");
      const docRef = await addDoc(collection(db, "image_user"), {
        url: img,
      });
      console.log("54321");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const fetchPost = async () => {
    await getDocs(collection(db, "image_user")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setImgList(newData);
      console.log(imgList, newData);
    });
  };

  const fetchImageUrl = async () => {
    try {
      // Replace 'images/my-image.jpg' with the path to your file in Firestore Storage
      const imageRef = ref(storage, "8-nWkV9DHu8kMwvcj.png");

      // Get the download URL of the file
      const imageUrl = await getDownloadURL(imageRef);

      console.log("Image URL:", imageUrl);
      //setImgLists(imageUrl);
      return (
        <div>
          {imgLists?.map((img, i) => (
            <img src={img} alt="" />
          ))}
        </div>
      );
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const uploadImage = async (file) => {
    try {
      // Generate a reference to the location where you want to store the file in Firestore Storage
      const storageRef = ref(storage, `${file.name}`);

      // Upload the file to Firestore Storage
      const snapshot = await uploadBytes(storageRef, file);

      console.log("File uploaded successfully!", snapshot);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    uploadImage(file); // Call the upload function with the selected file
  };

  useEffect(() => {
    fetchPost();
    fetchImageUrl();
  }, []);

  return (
    <section className="todo-container">
      <div className="todo">
        <h1 className="header">Image app</h1>

        <h3>Ajouter une image</h3>
        <input type="file" accept="image/*" onChange={handleFileUpload} />

        <h3>Test</h3>
        <div>
          <div>
            <input
              type="text"
              placeholder="Lien de l'image à partager"
              onChange={(e) => setImg(e.target.value)}
            />
          </div>

          <div className="btn-container">
            <button type="submit" className="btn" onClick={addTodo}>
              Submit
            </button>
          </div>
        </div>

        <h3>Vos images</h3>
        <div className="todo-content">
          {imgList?.map((img, i) => (
            <p key={i}>{img.url}</p>
          ))}
        </div>

        <div>
          {imgLists?.map((img, i) => (
            <img src={img} alt="" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Todo;
