const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { onSchedule } = require("firebase-functions/v2/scheduler");
const {logger} = require("firebase-functions");



admin.initializeApp();

const db = admin.firestore();

exports.createUserDoc = functions.auth.user().onCreate(async (user) => {
  functions.logger.info("New user created:", { user });

  const data = {
    email: user.email,
    uid: user.uid,
  };

  try {
    const res = await db.collection('users').add(data);
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



// Hilfsfunktion zur Berechnung der verbleibenden Zeit
function getTimeUntilStreakBroken(lastTimeUpdated) {
  const now = new Date();
  const streakDuration = 24 * 60 * 60 * 1000; // Annahme: 24 Stunden für einen Streak
  const expirationTime = lastTimeUpdated.getTime() + streakDuration;
  return expirationTime - now.getTime();
}


exports.onStreakWrite = functions.firestore.document("streaks/{docId}").onWrite((change, context) => {
        const beforeData = change.before.data(); 
        const afterData = change.after.data();

        console.log("Daten geändert:", beforeData, "zu", afterData);
        return null;
    });

  
exports.checkStreak = functions.https.onRequest(async (req, res) => {
    try {
        const userId = req.query.userId;
        if (!userId) {
            return res.status(400).send({ error: 'User ID is required' });
        }

        const userDoc = await admin.firestore().collection('users').doc(userId).get();
        if (!userDoc.exists) {
            return res.status(404).send({ error: 'User not found' });
        }

        const userData = userDoc.data();
        const lastActive = userData.lastActive.toDate(); // Annahme: 'lastActive' ist ein Firestore-Timestamp
        const currentDate = new Date();

        // Berechnung der Differenz in Tagen
        const diffTime = Math.abs(currentDate - lastActive);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let streakStatus;
        if (diffDays > 1) {
            streakStatus = 'unterbrochen';
            // Optional: Setzen Sie die Serie zurück
            await admin.firestore().collection('users').doc(userId).update({ streak: 0 });
        } else {
            streakStatus = 'aktiv';
        }

        return res.status(200).send({ streakStatus: streakStatus });
    } catch (error) {
        console.error('Fehler beim Überprüfen der Serie:', error);
        return res.status(500).send({ error: 'Interner Serverfehler' });
    }
});