import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA0QxSUDYR0MRrdNiA9duFvPz42I28LqE8",
    authDomain: "chatapp-react-native-e43d9.firebaseapp.com",
    projectId: "chatapp-react-native-e43d9",
    storageBucket: "chatapp-react-native-e43d9.appspot.com",
    messagingSenderId: "107138939059",
    appId: "1:107138939059:web:4489ba03cb411a599ed8c6"
  };

let app;

if( firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {db, auth};