import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useImperativeHandle } from 'react';

var firebaseConfig = {
  apiKey: "AIzaSyCOn8CINpc1usfeZ9yh1nY5j76XViT4jm4",
  authDomain: "ru-hacks-85f40.firebaseapp.com",
  databaseURL: "https://ru-hacks-85f40.firebaseio.com",
  projectId: "ru-hacks-85f40",
  storageBucket: "ru-hacks-85f40.appspot.com",
  messagingSenderId: "719594252891",
  appId: "1:719594252891:web:074034892d1f6e41896d7e",
  measurementId: "G-C03JHY2FFZ"
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
            var parent = snapshot.data();
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