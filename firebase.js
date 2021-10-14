var admin = require("firebase-admin");

var serviceAccount = require("./remoteworktracker.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://remoteworktracker-default-rtdb.firebaseio.com",
});

const db = admin.firestore();
module.exports = db;
