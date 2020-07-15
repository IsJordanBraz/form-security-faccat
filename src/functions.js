const functions = require('firebase-functions');
const admin = require("firebase-admin");
const serviceAccount = require('./firebase-chave.json');
const fetch = require('node-fetch');
const cors =  require('cors');

const corsHandler = cors({ origin: true });

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cloudfunctions-7c349.firebaseio.com"
  });


exports.getData = functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
        res.set('Access-Control-Allow-Origin', '*');                
        try {
            getStock(res);
            return;
        } catch (error) {
            res.status(403).send('Unauthorized');
            return;
        }
    });
});

function getStock(res) {
    try {
        console.log('Acessing database');
        const snapshot = admin.database().ref('/curriculos');
        snapshot.limitToLast(5000).once('value', async snap => {
            const result = Object.entries(snap.val())
                .map(([, value]) => value)
            res.status(200).json(result);  
        });
    } catch (error) {
        console.error('Error to acess database:', error);
        res.status(403).send('Unauthorized');
        return;
    }
}