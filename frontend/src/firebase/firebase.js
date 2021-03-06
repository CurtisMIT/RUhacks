import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useImperativeHandle } from 'react';

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

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.db = app.firestore();
    this.auth = app.auth();
  }

  // *** Auth API ***
  createUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  signInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signOut = () => this.auth.signOut();

  sendPasswordResetEmail = email => this.auth.sendPasswordResetEmail(email);

  updatePassword = password => this.auth.currentUser.updatePassword(password);

  createTicket = (latitude, longitude, descritption, helperName) => {
      const docData = {
      helper: "",
      helpme: helperName,
      latitude: latitude,
      longitude: longitude,
      order: descritption,
    }

    this.db.collection("tickets").doc().set(docData)
  }

  updateTicket = (needHelperName, helperName) => {
    let ticketsRef = this.db.collection('tickets');
    let query = ticketsRef.where('helpme', '==', needHelperName).get()
      .then(snapshot => {
        if (snapshot.empty) {
            console.log('No matching documents.');
          return;
        }
        // const dbUser = snapshot.data(); 
        console.log(snapshot)
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        let ticketRef = doc.ref;
        ticketRef.update({helper: helperName});
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
  }

  deleteTicket = (Helper) => {
    let ticketsRef = this.db.collection('tickets');
    ticketsRef.where('helper', '==', Helper).delete();
  }

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(user => {
      if (user) {

        this.user(user.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();
            next({
              uid: user.uid,
              email: user.email,
              ...dbUser,
            });
            console.log(dbUser)
            var parent = snapshot.data();
            console.log(parent)
            var role = parent.roles.HELPER;
            console.log(parent.roles.HELPER)
            console.log(role)
            console.log(dbUser)
            if (role == 'HELPER'){
              console.log(user)
              this.db.collection("helper").add({
                email: user.email,
                username: dbUser.username
              });
            } else {
              this.db.collection("nonhelper").add({
                email: user.email,
                username: dbUser.username
              });
            }
          });
      } else {
        fallback();
      }
    });

  // *** User API ***
  user = uid => this.db.doc(`/users/${uid}`);

  users = () => this.db.collection(`users`);
}

export default Firebase;