import {useEffect, useMemo, useState} from 'react';
import {useToasts} from '@geist-ui/core';
import {PostgrestError} from '@supabase/postgrest-js/dist/module/types';

import {getProject, ProjectProps} from 'lib/sdk/projects/client/get';

type UseProjectByIdProps = {
  projectId: string;
  withTasks?: boolean;
};

type UseProjectByIdValues<ProjectCustomProps = ProjectProps> = {
  project: ProjectCustomProps | null;
  error: PostgrestError | null;
  isLoadingProject: boolean;
  refreshProject(): void;
};

/*
 * This Hook will pull down all the project
 */
function useProjectById<ProjectCustomProps = ProjectProps>({
  projectId,
  withTasks = false
}: UseProjectByIdProps): UseProjectByIdValues<ProjectCustomProps> {
  const {setToast} = useToasts();
  const [projectsData, setProjectData] = useState<ProjectCustomProps | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [isLoadingProject, setIsLoadingProject] = useState(false);
  // Request tasks basic properties if needed
  const pickProps = useMemo(() => {
    const props = ['*'];
    if (withTasks) {
      props.push('tasks(id, title, status, assignee_id)');
    }

    return props;
  }, [withTasks]);

  const loadProject = async () => {
    if (!projectId) {
      return;
    }

    try {
      setIsLoadingProject(true);
      const {project, error} = await getProject<ProjectCustomProps>({
        id: projectId,
        pickProps
      });
      setError(error);
      setProjectData(project);
    } catch (error) {
      setToast({
        text: 'An error occurred while loading project.',
        type: 'error'
      });
    } finally {
      setIsLoadingProject(false);
    }
  };

  useEffect(() => {
    loadProject();
  }, [projectId]);

  const memoizedReturnValue: UseProjectByIdValues<ProjectCustomProps> = useMemo(() => {
    return {
      project: projectsData,
      error,

      isLoadingProject,
      refreshProject: loadProject
    };
  }, [projectsData, isLoadingProject]);

  return memoizedReturnValue;
}

export default useProjectById;
