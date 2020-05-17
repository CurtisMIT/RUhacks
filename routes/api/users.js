const express = require('express');
const router = express.Router();
// const admin = require('firebase-admin');
var firebase = require("firebase/app");
var app = require('firebase/app');
require('firebase/auth');
require('firebase/database');
require('firebase/firestore');



// var Firebase = require('../../frontend/src/firebase/firebase')
// @route    POST api/users/
// @desc     Register user
// @access   Public

const firebaseConfig = {
  apiKey: "AIzaSyCOn8CINpc1usfeZ9yh1nY5j76XViT4jm4",
  authDomain: "ru-hacks-85f40.firebaseapp.com",
  databaseURL: "https://ru-hacks-85f40.firebaseio.com",
  projectId: "ru-hacks-85f40",
  storageBucket: "ru-hacks-85f40.appspot.com",
  messagingSenderId: "719594252891",
  appId: "1:719594252891:web:01f245a1f73cb2a3896d7e",
  measurementId: "G-0Y0178S941"
};


firebase.initializeApp(firebaseConfig)
var db = firebase.firestore();
var auth = firebase.auth();

router.get(
  '/',
  async (req, res) => {

    console.log("yo", req.body)
    var arr = [];

    db.collection('tickets').get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
        
          // console.log(doc.id, '=>', doc.data().location);
          // location.push(doc.data().location);
          //arr.push("hello");

          arr.push({data: doc.data()});
        });
        res.send({arr});
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });


    // return res.status(200).json({ msg: "successfully retrieved data from firestore" })
    //return res.status(200).json({ msg: json})
    // arr.push("hello");
    // for (var i = 0; i < arr.length; i++) {
    //   console.log(arr[i]);
    // }
    // return  res.end();


  }
);




module.exports = router;