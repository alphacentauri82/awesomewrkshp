import { db } from '../main'
import firebase from 'firebase'

const firebaseService = {
  getContent: () => {
    let docs = []
    const steepsRef = db.collection('steeps')

    steepsRef.orderBy('titulo').get().then((querySnapshot) => {
      console.log(querySnapshot)
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`)
        docs.push(doc.data())
      })
    })
    return docs
  },
  logIn: () => {
    return new Promise((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then(
        (user) => {
          resolve(user)
        },
        (err) => {
          reject(err)
        }
      )
    })
  },
  logOut: () => {
    firebase.auth().signOut().then((res) => {
      console.log(res)
    })
  }
}

export default firebaseService
