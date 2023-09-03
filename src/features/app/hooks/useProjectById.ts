import {useEffect, useMemo, useState} from 'react';
import {useToasts} from '@geist-ui/core';
import {PostgrestError} from '@supabase/postgrest-js/dist/module/types';

import {getProject, ProjectProps} from 'lib/sdk/projects/client/get';

type UseProjectByIdValues = {
  project: ProjectProps | null;
  error: PostgrestError | null;
  isLoadingProject: boolean;
  refreshProject(): void;
};

/*
 * This Hook will pull down all the project
 */
function useProjectById(projectId: ProjectProps['id']): UseProjectByIdValues {
  const {setToast} = useToasts();
  const [projectsData, setProjectData] = useState<ProjectProps | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [isLoadingProject, setIsLoadingProject] = useState(false);

  const loadProject = async () => {
    try {
      setIsLoadingProject(true);
      const {project, error} = await getProject({id: projectId});
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
  }, []);

  const memoizedReturnValue: UseProjectByIdValues = useMemo(() => {
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
