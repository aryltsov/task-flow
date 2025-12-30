import {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  query,
  orderBy,
  startAfter,
  limit,
  where,
  deleteDoc,
} from 'firebase/firestore';

import { db } from '../firebase';
import { formatCreatedAt } from '@utils/utils';

import type { ProjectService } from '@models/project-service.interface';
import type { ProjectInterface } from '@models/project.interface';
import type { FetchProjectsArgs } from '@models/project-service.interface';

const COLLECTION_NAME = 'projects';
const PAGE_SIZE = 18;

const firestoreProjectService: ProjectService = {
  async fetchProjectsPage({ lastDoc, filters }: FetchProjectsArgs = {}) {
    let q = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc'),
      limit(PAGE_SIZE),
    );

    if (filters?.status) {
      q = query(q, where('status', '==', filters.status));
    }

    if (filters?.creatorId) {
      q = query(q, where('creator.id', '==', filters.creatorId));
    }

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const snapshot = await getDocs(q);

    return {
      items: snapshot.docs.map(
        (d) => ({ id: d.id, ...d.data() }) as ProjectInterface,
      ),
      lastDoc: snapshot.docs.at(-1),
      hasMore: snapshot.size === PAGE_SIZE,
    };
  },

  async getProjectById(projectId) {
    const ref = doc(db, COLLECTION_NAME, projectId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;

    return { id: snap.id, ...snap.data() } as ProjectInterface;
  },

  async updateProject(project) {
    project.createdAt = formatCreatedAt();
    const ref = doc(db, COLLECTION_NAME, project.id);
    await setDoc(ref, project, { merge: true });
  },

  async createProject(project) {
    project.createdAt = formatCreatedAt();
    const ref = doc(collection(db, COLLECTION_NAME));
    const newProject: ProjectInterface = { id: ref.id, ...project };
    await setDoc(ref, newProject);
    return newProject;
  },

  async deleteProject(projectId) {
    const ref = doc(db, COLLECTION_NAME, projectId);
    await deleteDoc(ref);
  },
};

export function getProjectService(): ProjectService {
  if (typeof window !== 'undefined' && window.__E2E_PROJECTS_MOCK__) {
    return window.__E2E_PROJECTS_MOCK__;
  }

  return firestoreProjectService;
}
