import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDZWDhKncgdsG7tu_Y_WmamwNYCGegUFfM",
    authDomain: "make-money-4300c.firebaseapp.com",
    databaseURL: "https://make-money-4300c.firebaseio.com",
    projectId: "make-money-4300c",
    storageBucket: "make-money-4300c.appspot.com",
    messagingSenderId: "285532478995",
    appId: "1:285532478995:web:f7530b72aa552f050229e6",
    measurementId: "G-RJFZSZSX7V"
};

firebase.initializeApp(firebaseConfig);

export default firebase;