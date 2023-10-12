'use client';

import {FC} from 'react';
import {appLayoutVariants} from 'app/layout-variants/app-layout-variants';

import AppNavigation from 'features/app/components/common/AppNavigation';
import ProjectsContent from 'features/project/components/ProjectsContent';
import ProjectsHeader from 'features/project/components/ProjectsHeader';
import {headerContentFooterVariants} from 'features/theme/layout-variants/header-content-footer-variants';

const ProjectsPage: FC = () => {
  return (
    <div className={appLayoutVariants()}>
      <AppNavigation />
      <main
        className={headerContentFooterVariants({
          layout: 'content'
        })}
      >
        <ProjectsHeader />
        <ProjectsContent />
      </main>
    </div>
  );
};

export default ProjectsPage;
