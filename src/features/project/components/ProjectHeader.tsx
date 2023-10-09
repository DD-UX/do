'use client';

import {FC, useContext} from 'react';
import {AnimatePresence} from 'framer-motion';

import {LayoutHeader, LayoutHeading} from 'features/app/components/common/Layout';
import AddProjectForm from 'features/project/components/AddProjectForm';
import ProjectTasksColumn from 'features/project/components/ProjectTasksColumn';
import {ProjectContext} from 'features/project/context/ProjectContext';

const ProjectHeader: FC = () => {
  const {project} = useContext(ProjectContext);

  return (
    <>
      <LayoutHeader $fullWidth>
        <LayoutHeading>{project?.title}</LayoutHeading>
        <AddProjectForm autoFocus={false} />
      </LayoutHeader>
      <AnimatePresence mode="wait">
        <ProjectTasksColumn />
      </AnimatePresence>
    </>
  );
};

export default ProjectHeader;
