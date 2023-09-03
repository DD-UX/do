'use client';

import {FC} from 'react';
import {useMediaQuery, useTheme} from '@geist-ui/core';
import {AnimatePresence} from 'framer-motion';

import {LayoutContent, LayoutWrapper} from 'features/app/components/Layout';
import ProjectForm from 'features/project/components/ProjectForm';
import {ProjectContextProvider} from 'features/project/context/ProjectContext';
import TaskHeader from 'features/task/components/TaskHeader';

const ProjectDetailPage: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery('mobile');

  return (
    <ProjectContextProvider>
      <AnimatePresence mode="wait">
        <LayoutWrapper $theme={theme}>
          <TaskHeader />
          <AnimatePresence mode="wait">
            <LayoutContent $theme={theme} $fullWidth={isMobile} $noPadding>
              <ProjectForm />
            </LayoutContent>
          </AnimatePresence>
        </LayoutWrapper>
      </AnimatePresence>
    </ProjectContextProvider>
  );
};

export default ProjectDetailPage;
