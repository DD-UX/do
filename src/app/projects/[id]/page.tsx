'use client';

import {FC} from 'react';
import {useTheme} from '@geist-ui/core';
import {AnimatePresence} from 'framer-motion';

import AppNavigation from 'features/app/components/common/AppNavigation';
import {LayoutWrapper} from 'features/app/components/common/Layout';
import LayoutContent from 'features/app/components/common/LayoutContent';
import ProjectForm from 'features/project/components/ProjectForm';
import ProjectHeader from 'features/project/components/ProjectHeader';
import {ProjectContextProvider} from 'features/project/context/ProjectContext';

const ProjectDetailPage: FC = () => {
  const theme = useTheme();

  return (
    <ProjectContextProvider>
      <AnimatePresence mode="wait">
        <LayoutWrapper $theme={theme}>
          <AppNavigation />
          <ProjectHeader />
          <AnimatePresence mode="wait">
            <LayoutContent noPadding>
              <ProjectForm />
            </LayoutContent>
          </AnimatePresence>
        </LayoutWrapper>
      </AnimatePresence>
    </ProjectContextProvider>
  );
};

export default ProjectDetailPage;
