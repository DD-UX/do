'use client';

import {FC} from 'react';
import {appLayoutVariants} from 'app/layout-variants/app-layout-variants';

import AppNavigation from 'features/app/components/common/AppNavigation';
import {headerContentFooterVariants} from 'features/app/layout-variants/header-content-footer-variants';
import ProjectsContent from 'features/project/components/ProjectsContent';
import ProjectsHeader from 'features/project/components/ProjectsHeader';

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
