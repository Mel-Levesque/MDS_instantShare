// Read data from Firestore
export const getImageList = () => {
    process.env.FIRESTORE.collection("instantsharebase").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
        });
      });
}
  
  // Write data to Firestore
export const postImage = () => {
process.env.FIRESTORE.collection("instantsharebase").add({
        field1: "value1",
        field2: "value2"
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
}
 


  