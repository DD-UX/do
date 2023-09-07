import {useEffect, useMemo, useState} from 'react';
import {useToasts} from '@geist-ui/core';
import {PostgrestError} from '@supabase/postgrest-js/dist/module/types';

import {getProject, ProjectWithTasksProps} from 'lib/sdk/projects/client/get';
import {TaskProps} from 'lib/sdk/tasks/client/get';

type UseProjectByTaskValues = {
  project: ProjectWithTasksProps | null;
  error: PostgrestError | null;
  isLoadingProject: boolean;
  refreshProject(): void;
};

/*
 * This Hook will pull down a project and all the tasks
 */
function useProjectByTask(task: TaskProps | null): UseProjectByTaskValues {
  const {setToast} = useToasts();
  const [projectData, setProjectData] = useState<ProjectWithTasksProps | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [isLoadingProject, setIsLoadingProject] = useState(false);

  const loadProject = async () => {
    if (!task?.project_id) {
      return;
    }
    try {
      setIsLoadingProject(true);
      const {project, error} = await getProject<ProjectWithTasksProps>({
        id: String(task?.project_id),
        pickProps: ['*', 'tasks(id, title, status)']
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
  }, [task?.project_id]);

  const memoizedReturnValue: UseProjectByTaskValues = useMemo(() => {
    return {
      project: projectData,
      error,

      isLoadingProject,
      refreshProject: loadProject
    };
  }, [projectData, isLoadingProject]);

  return memoizedReturnValue;
}

export default useProjectByTask;
