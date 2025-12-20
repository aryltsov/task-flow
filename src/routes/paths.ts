const DASHBOARD = 'dashboard';
const PROJECTS = 'projects';
const TASKS = 'tasks';
const USERS = 'users';

export const ROUTES = {
  dashboard: {
    root: `/${DASHBOARD}`,

    projects: {
      root: `/${DASHBOARD}/${PROJECTS}`,
      view: (projectId: string) => `/${DASHBOARD}/${PROJECTS}/${projectId}/view`,
      edit: (projectId: string) => `/${DASHBOARD}/${PROJECTS}/${projectId}/edit`,
      tasks: {
        root: (projectId: string) => `/${DASHBOARD}/${PROJECTS}/${projectId}`,
        view: (projectId: string, taskId: string) => `/${DASHBOARD}/${PROJECTS}/${projectId}/${TASKS}/${taskId}/view`,
        edit: (projectId: string, taskId: string) => `/${DASHBOARD}/${PROJECTS}/${projectId}/${TASKS}/${taskId}/edit`,
      },
    },

    users: {
      root: `/${DASHBOARD}/${USERS}`,
      profile: (userId: string) => `/${DASHBOARD}/${USERS}/${userId}`,
    },
  },

  auth: {
    login: '/login',
    register: '/register',
  },
} as const;

export const ROUTE_PATTERNS = {
  dashboard: {
    root: `/${DASHBOARD}`,
    projects: {
      root: `/${DASHBOARD}/${PROJECTS}`,
      list: `/${DASHBOARD}/${PROJECTS}/`,

      view: `/${DASHBOARD}/${PROJECTS}/:projectId/view`,
      edit: `/${DASHBOARD}/${PROJECTS}/:projectId/edit`,
      tasks: {
        root: `/${DASHBOARD}/${PROJECTS}/:projectId`,
        view: `/${DASHBOARD}/${PROJECTS}/:projectId/${TASKS}/:taskId/view`,
        edit: `/${DASHBOARD}/${PROJECTS}/:projectId/${TASKS}/:taskId/edit`,
      },
    },
    users: {
      root: `/${DASHBOARD}/${USERS}`,
      profile: `/${DASHBOARD}/${USERS}/:userId`,
    },
  },

  auth: {
    login: '/login',
    register: '/register',
  },

  projects: {
    root: PROJECTS,
    view: `${PROJECTS}/:projectId/view`,
    tasks: {
      root: `${PROJECTS}/:projectId`,
      view: `${PROJECTS}/:projectId/${TASKS}/:taskId/view`,
    },
  },
} as const;
