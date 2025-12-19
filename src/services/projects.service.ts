import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import type { ProjectInterface } from '@models/project.interface.ts';

export async function getProjects(): Promise<ProjectInterface[]> {
  const snapshot = await getDocs(collection(db, 'projects'));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ProjectInterface[];
}

export async function getProjectById(projectId: string): Promise<ProjectInterface | null> {
  const ref = doc(db, 'projects', projectId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  } as ProjectInterface;
}
