import { useEffect, useState } from 'react';
import { getProjectService } from '@services/projects.service.ts';
import type { ProjectInterface } from '@models/project.interface.ts';
import ProjectView from '@pages/dashboard/projects/project-view.tsx';
import { ProjectDetailsSkeleton } from '@pages/dashboard/projects/project-details-skeleton.tsx';
import { useAuth } from '@hooks/use-auth.ts';
import type { AuthContextType } from '@models/auth-context-type.interface.ts';
import EditProject from '@pages/dashboard/projects/edit-project.tsx';
import ModalButtons from '@components/modal-buttons.tsx';
import { useBoardStore } from '@stores/board.store.ts';
import { useToast } from '@contexts/toast-context.tsx';

type ProjectDetailsProps = {
  projectId?: string;
  isNew: boolean;
  onClose: () => void;
};

export default function ProjectDetails({ projectId, isNew, onClose }: ProjectDetailsProps) {
  const { showToast } = useToast();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [project, setProject] = useState<ProjectInterface | null>(null);
  const auth: AuthContextType = useAuth();
  const { projects } = useBoardStore();
  const [localIsNew, setLocalIsNew] = useState(isNew);
  const isCreator = project?.creator.email === auth.user?.email;

  useEffect(() => {
    if (localIsNew) {
      setProject({
        creator: {
          id: auth.user!.uid,
          email: auth.user!.email,
          // Since I don't have a real API that would return user data after authorization,
          // I hardcoded some of the data. This shouldn't happen in a real project, of course.
          name: 'Ryltsov Anton',
          avatarUrl: 'https://lh3.googleusercontent.com/a/ACg8ocLPgen7KROmMikMXoAa1d-vE00v-tdtPgoYa0BU-I9ukUzy3P7y=s576-c-no',
        },
      } as ProjectInterface);
      setLoading(false);
      setEdit(true);
      return;
    }

    if (!projectId) return;

    const fetchProject = async () => {
      setLoading(true);
      try {
        let data = projects.find((p) => p.id === projectId) || null;
        if (!data && projectId) {
          data = await getProjectService().getProjectById(projectId);
        }
        setProject(data);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, projects, localIsNew]);

  const saveProject = async (res: ProjectInterface, isAutosave = false) => {
    setLoading(true);

    try {
      if (localIsNew) {
        setLocalIsNew(false);
        const createdProject = await useBoardStore.getState().createProject(res);
        setProject(createdProject);
        showToast('Project created');
      } else {
        useBoardStore.getState().updateProject(res);
        setProject(res);
        showToast('Project updated');
      }

      if (!isAutosave) setEdit(false);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async () => {
    if (!project?.id) return;
    setLoading(true);
    try {
      await getProjectService().deleteProject(project.id);
      useBoardStore.getState().deleteProjectFromStore(project.id);
      showToast('Project deleted successfully');
      onClose();
    } catch (err) {
      console.error(err);
      showToast('Failed to delete project', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ProjectDetailsSkeleton />;

  if (edit && project) return <EditProject project={project} onSave={saveProject} onCancel={() => setEdit(false)} />;

  return (
    <>
      {project && <ProjectView project={project} />}
      <ModalButtons extended={isCreator} onClose={onClose} onDelete={() => setShowConfirmDelete(true)} onEdit={() => setEdit(true)} />

      {showConfirmDelete && (
        <div className='modal modal-open'>
          <div className='modal-box'>
            <h3 className='font-bold text-lg'>Are you sure you want to delete the project?</h3>
            <div className='modal-action'>
              <button
                className='btn btn-error'
                onClick={async () => {
                  await deleteProject();
                  setShowConfirmDelete(false);
                }}>
                Delete
              </button>
              <button className='btn' onClick={() => setShowConfirmDelete(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
