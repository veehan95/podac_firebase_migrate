const firebase = require('firebase')
require('firebase/storage')
const firebaseConfig = require('../firebase.json')

firebase.initializeApp(firebaseConfig)

const db = firebase.database()
const storage = firebase.storage()

module.exports = { db, storage, }
