'use client';

import {FC, useContext} from 'react';
import {Navbar} from 'flowbite-react';

import AddProjectForm from 'features/project/components/AddProjectForm';
import {ProjectContext} from 'features/project/context/ProjectContext';

const ProjectHeader: FC = () => {
  const {project} = useContext(ProjectContext);

  return (
    <Navbar>
      <h4 className="text-sm m-0 truncate text-gray-600 dark:text-gray-200">{project?.title}</h4>
      <AddProjectForm autoFocus={false} />
    </Navbar>
  );
};

export default ProjectHeader;
