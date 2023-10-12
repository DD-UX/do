'use client';

import {FC, useContext} from 'react';
import {appLayoutVariants} from 'app/layout-variants/app-layout-variants';

import AppNavigation from 'features/app/components/common/AppNavigation';
import ProjectForm from 'features/project/components/ProjectForm';
import ProjectHeader from 'features/project/components/ProjectHeader';
import ProjectTasksColumn from 'features/project/components/ProjectTasksColumn';
import {ProjectContext} from 'features/project/context/ProjectContext';
import {headerContentFooterVariants} from 'features/theme/layout-variants/header-content-footer-variants';

const ProjectDetailPage: FC = () => {
  const {project} = useContext(ProjectContext);

  return (
    <div className={appLayoutVariants()}>
      <AppNavigation />
      <ProjectTasksColumn projectId={String(project?.id)} showGoToProjectButton={false} />
      <main
        className={headerContentFooterVariants({
          layout: 'content'
        })}
      >
        <ProjectHeader />
        <div className={`bg-white dark:bg-gray-700 h-full overflow-y-auto`}>
          <ProjectForm />
        </div>
      </main>
    </div>
  );
};

export default ProjectDetailPage;
