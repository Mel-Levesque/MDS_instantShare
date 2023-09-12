import "../styles/App.css";
import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  listAll,
} from "firebase/storage";
import app from "../index";
import "firebase/storage";

const ImageList = () => {
  const [img, setImg] = useState("");
  const [imgList, setImgList] = useState([]);
  const [imgLists, setImgLists] = useState([]);
  const db = getFirestore(app);
  const storage = getStorage(app);

  const addImage = async (e) => {
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
      //const imageRef = ref(storage, "8-nWkV9DHu8kMwvcj.png");

      const storageRef = ref(storage);
      const images = await listAll(storageRef);

      // Get the download URL of the file
      //const imageUrl = await getDownloadURL(imageRef);

      const imageURLs = await Promise.all(
        images.items.map(async (item) => {
          return await getDownloadURL(item);
        })
      );

      console.log("Image URL:", imageURLs);
      setImgLists(imageURLs);
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
    uploadImage(file);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    fetchImageUrl();
  }, []);

  return (
    <section>
      <div>
        <h1 className="header">Instant Share</h1>

        <h3>Ajouter une image</h3>
        <input type="file" accept="image/*" onChange={handleFileUpload} />

        <h3>Vos images</h3>
        {imgLists.length > 0 && (
          <div>
            {imgLists?.map((img, i) => (
              <div key={i}>
                <img src={img} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageList;
