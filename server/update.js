import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import serviceAccount from './task-flow-bb0fa-firebase-adminsdk-fbsvc-8c6b61dc77.json' assert { type: 'json' };

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

/**
 * Генерирует случайную дату в диапазоне последних 2 лет
 */
function randomDate() {
  const start = new Date();
  start.setFullYear(start.getFullYear() - 2);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function updateProjects() {
  const snapshot = await db.collection('projects').get();

  console.log(`🔹 Found ${snapshot.size} projects`);

  const batch = db.batch();

  snapshot.forEach((doc) => {
    batch.update(doc.ref, {
      createdAt: Timestamp.fromDate(randomDate()),
    });
  });

  await batch.commit();
  console.log('✅ All projects updated with createdAt');
}

updateProjects().catch(console.error);
