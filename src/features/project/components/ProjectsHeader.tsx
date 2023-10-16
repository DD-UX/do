'use client';

import {FC, useContext} from 'react';
import {Navbar} from 'flowbite-react';

import {ProjectsContext} from 'features/app/context/ProjectsContext';
import AddProjectForm from 'features/project/components/AddProjectForm';

const ProjectsHeader: FC = () => {
  const {refreshProjects} = useContext(ProjectsContext);

  return (
    <Navbar fluid>
      <h4 className="text-sm m-0 truncate text-gray-600 dark:text-gray-200">Projects</h4>
      <AddProjectForm onCreate={refreshProjects} />
    </Navbar>
  );
};

export default ProjectsHeader;
