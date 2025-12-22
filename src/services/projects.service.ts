import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import type { ProjectInterface } from '@models/project.interface.ts';

const COLLECTION_NAME = 'projects';
export const projectService = {
  getProjects: async (): Promise<ProjectInterface[]> => {
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ProjectInterface[];
  },

  getProjectById: async (projectId: string): Promise<ProjectInterface | null> => {
    const ref = doc(db, COLLECTION_NAME, projectId);
    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    return {
      id: snap.id,
      ...snap.data(),
    } as ProjectInterface;
  },
};
