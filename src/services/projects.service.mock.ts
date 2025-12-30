import type { ProjectInterface } from '@models/project.interface';

const mockProjects: ProjectInterface[] = [
  {
    id: '1',
    title: 'Project A',
    description: 'Описание проекта A',
    wiki: 'Wiki A',
    status: 'active',
    creator: {
      id: 'alice', name: 'Alice',
      email: '',
    },
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Project B',
    description: 'Описание проекта B',
    wiki: 'Wiki B',
    status: 'archived',
    creator: {
      id: 'bob', name: 'Bob',
      email: '',
    },
    createdAt: '2023-01-02T00:00:00Z',
  },
  {
    id: '3',
    title: 'Project C',
    description: 'Описание проекта C',
    wiki: 'Wiki C',
    status: 'active',
    creator: {
      id: 'bob', name: 'Bob',
      email: '',
    },
    createdAt: '2023-01-03T00:00:00Z',
  },
];

export const projectServiceMock = {
  fetchProjectsPage: async ({ filters } = {}) => {
    let items = mockProjects;
    if (filters?.status) {
      items = items.filter(p => p.status === filters.status);
    }
    if (filters?.creatorId) {
      items = items.filter(p => p.creator.id === filters.creatorId);
    }
    return {
      items,
      lastDoc: null,
      hasMore: false,
    };
  },
  getProjectById: async (projectId: string) => mockProjects.find(p => p.id === projectId) || null,
  updateProject: async () => {},
  createProject: async () => mockProjects[0],
  deleteProject: async () => {},
};
