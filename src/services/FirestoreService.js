// Read data from Firestore
process.env.FIRESTORE.collection("yourCollection").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  });
  
  // Write data to Firestore
  firestore.collection("yourCollection").add({
    field1: "value1",
    field2: "value2"
  })
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
  