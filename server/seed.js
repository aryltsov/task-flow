import admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import serviceAccount from './task-flow-bb0fa-firebase-adminsdk-fbsvc-8c6b61dc77.json' assert { type: 'json' };

// ------------------------------------
// Firebase init
// ------------------------------------
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// ------------------------------------
// USERS (50)
// ------------------------------------
const users = Array.from({ length: 50 }, () => {
  const id = uuidv4();
  return {
    id,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatarUrl: faker.image.avatar(),
  };
});

// ------------------------------------
// PROJECTS (10)
// first 3 = active, rest = closed
// ------------------------------------
const projects = Array.from({ length: 10 }, (_, i) => {
  const creator = faker.helpers.arrayElement(users);

  return {
    id: uuidv4(),
    title: faker.company.name(),
    description: faker.company.catchPhrase(),
    status: i < 3 ? 'active' : 'closed',
    creator: {
      id: creator.id,
      name: creator.name,
      email: creator.email,
      avatarUrl: creator.avatarUrl,
    },
  };
});

// ------------------------------------
// TASKS (30) only for first 3 projects
// ------------------------------------
const STATUSES = ['backlog', 'todo', 'progress', 'done', 'blocked'];
const PRIORITIES = ['low', 'medium', 'high', 'urgent'];

const tasks = Array.from({ length: 30 }, (_, i) => {
  const project = projects[i % 3];
  const creator = faker.helpers.arrayElement(users);

  let assignee;
  do {
    assignee = faker.helpers.arrayElement(users);
  } while (assignee.id === creator.id);

  const commentsCount = faker.number.int({ min: 1, max: 4 });

  const comments = Array.from({ length: commentsCount }, () => {
    const author = faker.helpers.arrayElement(users);
    return {
      id: uuidv4(),
      author: author.name,
      date: faker.date.recent().toISOString(),
      text: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
    };
  });

  return {
    id: uuidv4(),
    projectId: project.id,
    title: faker.hacker.phrase(),
    description: faker.lorem.paragraph(),
    status: faker.helpers.arrayElement(STATUSES),
    priority: faker.helpers.arrayElement(PRIORITIES),
    creator: {
      id: creator.id,
      name: creator.name,
      email: creator.email,
      avatarUrl: creator.avatarUrl,
    },
    assignee: {
      id: assignee.id,
      name: assignee.name,
      email: assignee.email,
      avatarUrl: assignee.avatarUrl,
    },
    comments,
  };
});

// ------------------------------------
// SEED FUNCTION
// ------------------------------------
async function seedCollection(name, items) {
  console.log(`Seeding ${name} (${items.length})`);
  for (const item of items) {
    await db.collection(name).doc(item.id).set(item);
  }
}

async function seed() {
  try {
    await seedCollection('users', users);
    await seedCollection('projects', projects);
    await seedCollection('tasks', tasks);

    console.log('✅ FIRESTORE SEEDED SUCCESSFULLY');
    process.exit(0);
  } catch (e) {
    console.error('❌ SEED FAILED', e);
    process.exit(1);
  }
}

seed();
