const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");

const firebaseConfig = {
    apiKey: "AIzaSyBhUU1aWm1D9enXt7VnjbC1eG3I4tsNcrg",
    authDomain: "vue-face-goog.firebaseapp.com",
    databaseURL: "https://vue-face-goog.firebaseio.com",
    projectId: "vue-face-goog",
    storageBucket: "vue-face-goog.appspot.com",
    messagingSenderId: "289045593920",
    appId: "1:289045593920:web:5d2a22fe7ec7dace"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { firebase }
export { db }
export { auth }
export { storage }