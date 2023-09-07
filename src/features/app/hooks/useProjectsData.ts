import {useEffect, useMemo, useState} from 'react';
import {useToasts} from '@geist-ui/core';
import {PostgrestError} from '@supabase/postgrest-js/dist/module/types';

import {getProjects, ProjectProps} from 'lib/sdk/projects/client/get';

type UseProjectsDataValues = {
  projects: ProjectProps[] | null;
  error: PostgrestError | null;
  isLoadingProjects: boolean;
  setSearch(projectName: string): void;
  refreshProjects(): void;
};

/*
 * This Hook will pull down all the projects
 */
function useProjectsData(): UseProjectsDataValues {
  const {setToast} = useToasts();
  const [projectsData, setProjectsData] = useState<ProjectProps[] | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [search, setSearch] = useState('');
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);

  const loadProjects = async () => {
    try {
      setIsLoadingProjects(true);
      const {projects: projectsList, error} = await getProjects({search});
      setError(error);
      setProjectsData(projectsList);
    } catch (error) {
      setToast({
        text: 'An error occurred while loading projects.',
        type: 'error'
      });
    } finally {
      setIsLoadingProjects(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const memoizedReturnValue: UseProjectsDataValues = useMemo(() => {
    return {
      projects: projectsData,
      error,

      isLoadingProjects,
      refreshProjects: loadProjects,
      setSearch
    };
  }, [projectsData, isLoadingProjects]);

  return memoizedReturnValue;
}

export default useProjectsData;
