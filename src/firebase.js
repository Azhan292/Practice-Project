import firebase from 'firebase';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: 'AIzaSyAQHWQJokGrFy48gOi5BLjQVJRL_mjyjbA',
  authDomain: 'dsprconnect.firebaseapp.com',
  projectId: 'dsprconnect',
  storageBucket: 'dsprconnect.appspot.com',
  messagingSenderId: '64925468479',
  appId: '1:64925468479:web:1e183ec9e4b3ecf0b6358a',
  measurementId: 'G-1KZB6HKVRQ',
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

//for initialize auth
const auth = firebase.auth();
const db = app.database();
const storage = firebase.storage();
export {auth, db, storage};