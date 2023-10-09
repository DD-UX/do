'use client';

import {FC, useContext} from 'react';

import {LayoutHeader, LayoutHeading} from 'features/app/components/common/Layout';
import {ProjectsContext} from 'features/app/context/ProjectsContext';
import AddProjectForm from 'features/project/components/AddProjectForm';

const ProjectsHeader: FC = () => {
  const {refreshProjects} = useContext(ProjectsContext);

  return (
    <>
      <LayoutHeader $fullWidth>
        <LayoutHeading>Projects</LayoutHeading>
        <AddProjectForm onCreate={refreshProjects} />
      </LayoutHeader>
    </>
  );
};

export default ProjectsHeader;
