import { useEffect, useState } from 'react';
import { projectService } from '@services/projects.service.ts';
import type { ProjectInterface } from '@models/project.interface.ts';
import ProjectView from '@pages/dashboard/projects/project-view.tsx';
import { ProjectDetailsSkeleton } from '@pages/dashboard/projects/project-details-skeleton.tsx';
import { useAuth } from '@hooks/use-auth.ts';
import type { AuthContextType } from '@models/auth-context-type.interface.ts';
import EditProject from '@pages/dashboard/projects/edit-project.tsx';
import ModalButtons from '@components/modal-buttons.tsx';

type ProjectDetailsProps = {
  projectId: string;
  onClose: () => void;
};

export default function ProjectDetails({ projectId, onClose }: ProjectDetailsProps) {
  const [project, setProject] = useState<ProjectInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const auth: AuthContextType = useAuth();
  const isCreator = project?.creator.email === auth.user?.email;

  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      setLoading(true);
      try {
        const data = await projectService.getProjectById(projectId);
        setProject(data);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const saveProject = (res: ProjectInterface) => {
    console.log('saveProject');
    console.log('res', res);
  };

  if (loading || !project) {
    return <ProjectDetailsSkeleton />;
  }
  if (edit) {
    return <EditProject project={project!} onSave={(res) => saveProject(res)} onCancel={() => setEdit(false)} />;
  }

  return (
    <>
      <ProjectView project={project!} />
      <ModalButtons extended={isCreator} onClose={onClose} onEdit={() => setEdit(true)} />
    </>
  );
}
