import {useEffect, useMemo, useState} from 'react';
import {useToasts} from '@geist-ui/core';
import {PostgrestError} from '@supabase/postgrest-js/dist/module/types';

import {getProject, ProjectProps} from 'lib/sdk/projects/client/get';
import {TaskProps} from 'lib/sdk/tasks/client/get';

type UseProjectByTaskValues = {
  project: (ProjectProps & {tasks: TaskProps[]}) | null;
  error: PostgrestError | null;
  isLoadingProject: boolean;
  refreshProject(): void;
};

/*
 * This Hook will pull down a project and all the tasks
 */
function useProjectByTask(task: TaskProps | null): UseProjectByTaskValues {
  const {setToast} = useToasts();
  const [projectData, setProjectData] = useState<UseProjectByTaskValues['project']>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [isLoadingProject, setIsLoadingProject] = useState(false);

  const loadProject = async () => {
    if (!task?.project_id) {
      return;
    }
    try {
      setIsLoadingProject(true);
      const {project, error} = await getProject<UseProjectByTaskValues['project']>({
        id: String(task?.project_id),
        pickProps: ['*', 'tasks(id, title, status)']
      });
      setError(error);
      setProjectData(project);
    } catch (error) {
      setToast({
        text: 'An error occurred while loading task.',
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
