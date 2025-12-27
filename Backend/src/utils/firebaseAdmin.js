const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

// Resolve service account relative to THIS file (robust for any CWD)
const serviceAccountPath = path.resolve(
  __dirname,
  "../config/rapidai-cdff7-firebase-adminsdk-fbsvc-1c079b807b.json"
);

// 🔒 Safety check: ensure file exists
if (!fs.existsSync(serviceAccountPath)) {
  throw new Error(
    `❌ Firebase service account file not found at: ${serviceAccountPath}`
  );
}

// 🔥 Initialize Firebase only once (prevents nodemon / hot-reload crashes)
if (!admin.apps.length) {
  const serviceAccount = require(serviceAccountPath);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),

    // Optional: Only needed if you actually use Realtime DB
    databaseURL:
      process.env.FIREBASE_DATABASE_URL ||
      "https://rapidai-cdff7-default-rtdb.firebaseio.com",
  });

  console.log("🔥 Firebase Admin initialized successfully");
}

module.exports = admin;
