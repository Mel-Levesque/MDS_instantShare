import "../styles/App.css";
import { getImageList, postImage } from "../services/FirestoreService.js";

const PrivateSpace = () => {
  let imageList = [];
  getImageList();

  function getImageList() {
    imageList = getImageList;
  }

  return <div>{imageList}</div>;
};

export default PrivateSpace;
