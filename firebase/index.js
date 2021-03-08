import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const clientCredentials = {
  apiKey: "AIzaSyAE8qWQnbMiEPckvNy10As1xvL-dfMdGc8",
  authDomain: "za-shop.firebaseapp.com",
  projectId: "za-shop",
  storageBucket: "za-shop.appspot.com",
  messagingSenderId: "937238178510",
  appId: "1:937238178510:web:a7bb81c481d5c337cebe9f",
};

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

export default firebase;
