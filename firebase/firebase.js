import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkFWsGygllForJ1r4u9x3IcosoqBVCxq0",
  authDomain: "semana-utn-c9f91.firebaseapp.com",
  databaseURL: "https://semana-utn-c9f91.firebaseio.com",
  projectId: "semana-utn-c9f91",
  storageBucket: "semana-utn-c9f91.appspot.com",
  messagingSenderId: "385895562914"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

const firebaseApp = firebase;

export default firebaseApp;