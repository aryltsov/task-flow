import { collection, getDocs, getDoc, doc, setDoc, QueryDocumentSnapshot, query, orderBy, startAfter, limit } from 'firebase/firestore';
import { db } from '../firebase';
import type { ProjectInterface } from '@models/project.interface';

const COLLECTION_NAME = 'projects';
const PAGE_SIZE = 18;

export const projectService = {
  fetchProjectsPage: async (lastDoc?: QueryDocumentSnapshot) => {
    let q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'), limit(PAGE_SIZE));

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const snapshot = await getDocs(q);

    return {
      items: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as ProjectInterface),
      lastDoc: snapshot.docs.at(-1),
      hasMore: snapshot.size === PAGE_SIZE,
    };
  },

  getProjectById: async (projectId: string): Promise<ProjectInterface | null> => {
    const ref = doc(db, COLLECTION_NAME, projectId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as ProjectInterface;
  },

  updateProject: async (project: ProjectInterface) => {
    const ref = doc(db, COLLECTION_NAME, project.id);
    await setDoc(ref, project, { merge: true });
  },

  createProject: async (project: Omit<ProjectInterface, 'id'>): Promise<ProjectInterface> => {
    const ref = doc(collection(db, COLLECTION_NAME));
    const newProject: ProjectInterface = { id: ref.id, ...project };
    await setDoc(ref, newProject);
    return newProject;
  },
};
