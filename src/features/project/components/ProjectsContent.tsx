import {FC, useContext} from 'react';
import {Loading, Text} from '@geist-ui/core';
import {appEntityContentVariants} from 'app/layout-variants/app-entity-detail-variants';

import {ProjectsContext} from 'features/app/context/ProjectsContext';
import ProjectListItem from 'features/project/components/ProjectListItem';

const ProjectsContent: FC = () => {
  const {projects, isLoadingProjects} = useContext(ProjectsContext);

  if (isLoadingProjects) {
    return <Loading>Loading projects</Loading>;
  }

  return (
    <section className={appEntityContentVariants()}>
      {projects?.map((project) => <ProjectListItem key={project.id} project={project} />)}
      {!Array.isArray(projects) || (projects?.length < 1 && <Text>No available tasks</Text>)}
    </section>
  );
};

export default ProjectsContent;
