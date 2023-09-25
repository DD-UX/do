'use client';

import {FC, useContext} from 'react';
import {useTheme} from '@geist-ui/core';

import {LayoutHeader, LayoutHeading} from 'features/app/components/common/Layout';
import {ProjectsContext} from 'features/app/context/ProjectsContext';
import SignOutButton from 'features/auth/components/SignOutButton';
import AddProjectForm from 'features/project/components/AddProjectForm';

const ProjectsHeader: FC = () => {
  const theme = useTheme();
  const {refreshProjects} = useContext(ProjectsContext);

  return (
    <>
      <LayoutHeader $theme={theme} $fullWidth>
        <LayoutHeading>Projects</LayoutHeading>
        <AddProjectForm onCreate={refreshProjects} />
        <SignOutButton />
      </LayoutHeader>
    </>
  );
};

export default ProjectsHeader;
