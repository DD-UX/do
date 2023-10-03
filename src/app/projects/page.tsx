'use client';

import {FC} from 'react';
import {useTheme} from '@geist-ui/core';
import {AnimatePresence} from 'framer-motion';

import AppNavigation from 'features/app/components/common/AppNavigation';
import {LayoutContent, LayoutWrapper} from 'features/app/components/common/Layout';
import ProjectsContent from 'features/project/components/ProjectsContent';
import ProjectsHeader from 'features/project/components/ProjectsHeader';

const ProjectsPage: FC = () => {
  const theme = useTheme();

  return (
    <AnimatePresence mode="wait">
      <LayoutWrapper $theme={theme}>
        <AppNavigation />
        <ProjectsHeader />
        <AnimatePresence mode="wait">
          <LayoutContent $theme={theme} $fullWidth>
            <ProjectsContent />
          </LayoutContent>
        </AnimatePresence>
      </LayoutWrapper>
    </AnimatePresence>
  );
};

export default ProjectsPage;
