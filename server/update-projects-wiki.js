// server/update-projects-wiki.js
import admin from 'firebase-admin';
import serviceAccount from './task-flow-bb0fa-firebase-adminsdk-fbsvc-dbcaa7f6c0.json' assert { type: 'json' };

// ------------------------------------
// Firebase init
// ------------------------------------
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const generateWiki = (project) => {
  // Можно заменить на свою генерацию, если нужно что-то другое
  return `# ${project.title}

**Статус:** ${project.status}
**Создатель:** ${project.creator?.name || 'N/A'}

## Описание
${project.description || 'Описание отсутствует.'}
`;
};

async function updateProjectsWiki() {
  try {
    const projectsRef = db.collection('projects');
    const snapshot = await projectsRef.get();

    if (snapshot.empty) {
      console.log('No projects found.');
      process.exit(0);
    }

    let updated = 0;
    for (const doc of snapshot.docs) {
      const project = doc.data();
      const wiki = generateWiki(project);

      await doc.ref.update({ wiki });
      updated++;
      console.log(`Updated project ${project.title} (${doc.id})`);
    }

    console.log(`✅ Updated wiki for ${updated} projects`);
    process.exit(0);
  } catch (e) {
    console.error('❌ UPDATE FAILED', e);
    process.exit(1);
  }
}

updateProjectsWiki();
