// const admin = require("firebase-admin");
// const path = require("path");
// const fs = require("fs");

// // Resolve service account relative to this file so it works regardless of CWD
// const serviceAccountPath = path.join(
//   __dirname,
//   "..",
//   "config",
//   "rapidai-cdff7-firebase-adminsdk-fbsvc-1c079b807b.json"
// );

// if (!fs.existsSync(serviceAccountPath)) {
//   throw new Error(`❌ Firebase service account not found at ${serviceAccountPath}`);
// }

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(require(serviceAccountPath)),
//     // Uses your Realtime Database URL; change here if you use a different instance
//     databaseURL: process.env.FIREBASE_DATABASE_URL || "https://rapidlearnai-default-rtdb.firebaseio.com",
//   });
// }

// module.exports = admin;



const admin = require("firebase-admin");

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error("❌ FIREBASE_SERVICE_ACCOUNT environment variable is not set");
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      process.env.FIREBASE_DATABASE_URL ||
      "https://rapidlearnai-default-rtdb.firebaseio.com",
  });
}

module.exports = admin;
