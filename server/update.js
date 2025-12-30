import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from './task-flow-bb0fa-firebase-adminsdk-fbsvc-8c6b61dc77.json' assert { type: 'json' };

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const COLLECTION_NAME = 'tasks';
const BATCH_SIZE = 500;

/**
 * Генерирует sortIndex для задач в каждой колонке
 */
async function migrateTasksSortIndex() {
  console.log('🚀 Start migrating tasks sortIndex...');

  let lastDoc = null;
  let totalUpdated = 0;

  while (true) {
    let query = db.collection(COLLECTION_NAME).orderBy('__name__').limit(BATCH_SIZE);

    if (lastDoc) {
      query = query.startAfter(lastDoc);
    }

    const snapshot = await query.get();

    if (snapshot.empty) {
      break;
    }

    // группируем задачи по статусу
    const tasksByStatus = {};
    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      const status = data.status || 'unknown';
      if (!tasksByStatus[status]) tasksByStatus[status] = [];
      tasksByStatus[status].push({ ref: doc.ref, data });
    });

    const batch = db.batch();

    // для каждой колонки проставляем sortIndex
    Object.values(tasksByStatus).forEach((tasks) => {
      tasks.sort((a, b) => {
        // если уже есть sortIndex — можно сортировать по нему, иначе по созданию
        return (a.data.sortIndex ?? 0) - (b.data.sortIndex ?? 0);
      });

      tasks.forEach((task, index) => {
        batch.update(task.ref, { sortIndex: index });
        totalUpdated++;
      });
    });

    await batch.commit();

    lastDoc = snapshot.docs[snapshot.docs.length - 1];
    console.log(`✅ Processed ${snapshot.size} docs (total updated: ${totalUpdated})`);
  }

  console.log('🎉 Migration finished');
}

migrateTasksSortIndex().catch((err) => {
  console.error('❌ Migration failed:', err);
});
