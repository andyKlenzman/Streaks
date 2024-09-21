const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

const db = admin.firestore();

exports.createUserDoc = functions.auth.user().onCreate(async (user) => {
  functions.logger.info("New user created:", { user });

  const data = {
    email: user.email,
    uid: user.uid,
  };

  try {
    const res = await db.collection('users').add(data);
    functions.logger.info('User document added:', res.id); 
  } catch (error) {
    functions.logger.error('Error occurred while adding user document:', error);
  }
});

exports.deleteUserDoc = functions.auth.user().onDelete(async (user) => {
  functions.logger.info("User deleted:", { user });

  try {
    const snapshot = await db.collection('users').where('uid', '==', user.uid).get();
    if (!snapshot.empty) {
      snapshot.forEach(doc => {
        doc.ref.delete();
        functions.logger.info(`Deleted document for user: ${user.uid}`);
      });
    } else {
      functions.logger.warn(`No document found for user: ${user.uid}`);
    }
  } catch (error) {
    functions.logger.error('Error occurred while deleting user document:', error);
  }
});