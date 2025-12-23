import { useEffect, useState } from 'react';
import { projectService } from '@services/projects.service.ts';
import type { ProjectInterface } from '@models/project.interface.ts';
import ProjectView from '@pages/dashboard/projects/project-view.tsx';
import { ProjectDetailsSkeleton } from '@pages/dashboard/projects/project-details-skeleton.tsx';
import { useAuth } from '@hooks/use-auth.ts';
import type { AuthContextType } from '@models/auth-context-type.interface.ts';
import EditProject from '@pages/dashboard/projects/edit-project.tsx';
import ModalButtons from '@components/modal-buttons.tsx';
import { useBoardStore } from '@stores/board.store.ts';
import { CreatorClass } from '@models/creator.ts';

type ProjectDetailsProps = {
  projectId?: string;
  isNew: boolean;
  onClose: () => void;
};

export default function ProjectDetails({ projectId, isNew, onClose }: ProjectDetailsProps) {
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const auth: AuthContextType = useAuth();
  const { projects, updateProject } = useBoardStore();
  const [project, setProject] = useState<ProjectInterface | null>(null);

  const isCreator = project?.creator.email === auth.user?.email;

  useEffect(() => {
    if (isNew) {
      setProject({ creator: new CreatorClass(auth.user!) } as ProjectInterface);
      setLoading(false);
      setEdit(true);
      return;
    }

    const fetchProject = async () => {
      setLoading(true);
      try {
        let data = projects.find((p) => p.id === projectId) || null;

        if (!data) {
          data = await projectService.getProjectById(projectId!);
        }

        setProject(data);
      } finally {
        setLoading(false);
      }
    };

    if (!isNew && projectId) {
      fetchProject();
    }
  }, [projectId, projects]);

  const saveProject = async (res: ProjectInterface) => {
    setEdit(false);
    setLoading(true);

    try {
      if (isNew) {
        const plainProject = {
          ...res,
          creator: { ...res.creator },
        };
        await projectService.createProject(plainProject);
      } else {
        updateProject(res);
        await projectService.updateProject(res);
      }
      setProject(res);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ProjectDetailsSkeleton />;
  if (edit) return <EditProject project={project!} onSave={saveProject} onCancel={() => setEdit(false)} />;

  return (
    <>
      <ProjectView project={project!} />
      <ModalButtons extended={isCreator} onClose={onClose} onEdit={() => setEdit(true)} />
    </>
  );
}
