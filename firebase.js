import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//paste in from firebase console

const firebaseApp = firebase.initializeApp(firebaseConfig);

// set up realtime db
const db = firebaseApp.firestore();

//set up auth
const auth = firebase.auth();

export { db, auth };
