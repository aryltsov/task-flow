import { collection, getDocs, getDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import type { Task } from '@models/task.interface';

const COLLECTION_NAME = 'tasks';

export const taskService = {
  getTasksByProject: async (projectId: string): Promise<Task[]> => {
    const q = query(collection(db, COLLECTION_NAME), where('projectId', '==', projectId));

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Task[];
  },

  getTaskById: async (taskId: string): Promise<Task | null> => {
    const docRef = doc(db, COLLECTION_NAME, taskId);
    const snap = await getDoc(docRef);

    if (!snap.exists()) return null;

    return {
      id: snap.id,
      ...snap.data(),
    } as Task;
  },
};
