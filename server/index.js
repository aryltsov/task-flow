import express from 'express';
import cookieParser from 'cookie-parser';
import admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;

const serviceAccountRaw = fs.readFileSync(path.join(__dirname, 'task-flow-bb0fa-firebase-adminsdk-fbsvc-740ed182ff.json'), 'utf-8');

const serviceAccount = JSON.parse(serviceAccountRaw);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(express.json());
app.use(cookieParser());

app.post('/sessionLogin', async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ error: 'Missing idToken' });

  try {
    const expiresIn = 5 * 24 * 60 * 60 * 1000; // 5 дней
    const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

    res.cookie('session', sessionCookie, {
      httpOnly: true,
      secure: false,
      maxAge: expiresIn,
    });

    res.json({ status: 'success' });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.post('/sessionLogout', (req, res) => {
  res.clearCookie('session');
  res.json({ status: 'logged out' });
});

app.get('/api/me', async (req, res) => {
  const sessionCookie = req.cookies.session || '';
  if (!sessionCookie) return res.status(401).json({ error: 'Not logged in' });

  try {
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    const userRecord = await admin.auth().getUser(decodedClaims.uid);

    res.json({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
