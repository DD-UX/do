import {FC, useContext} from 'react';
import {Button, Loading, Table, Text, useTheme} from '@geist-ui/core';
import Calendar from '@geist-ui/icons/calendar';
import Trash2 from '@geist-ui/icons/trash2';

import EllipsisText from 'features/app/components/common/EllipsisText';
import {LayoutLink} from 'features/app/components/Layout';
import {NO_VALUE} from 'features/app/constants/ui-constants';
import {ProjectsContext} from 'features/app/context/ProjectsContext';
import {formatDateTime} from 'features/app/helpers/date-helpers';
import {ProjectProps} from 'lib/sdk/projects/client/get';

const ProjectsContent: FC = () => {
  const theme = useTheme();
  const {projects, isLoadingProjects, deleteProject} = useContext(ProjectsContext);

  const renderTitle = (_: any, {id, title}: ProjectProps) => {
    return (
      <LayoutLink $theme={theme} href={`/projects/${id}`} passHref>
        <EllipsisText h6 my={0}>
          {title}
        </EllipsisText>
      </LayoutLink>
    );
  };

  const renderCreatedAt = (_: any, {created_at}: ProjectProps) => {
    return (
      <div className="inline-flex gap-1 items-center whitespace-nowrap text-end justify-self-end">
        <span>
          <Calendar size={12} />
        </span>
        {formatDateTime(created_at)}
      </div>
    );
  };

  const renderStartDateTime = (_: any, {start_datetime, end_datetime}: ProjectProps) => {
    return (
      <div className="inline-flex gap-1 items-center whitespace-nowrap text-end justify-self-end">
        <span>
          <Calendar size={12} />
        </span>
        <span className="inline-block">
          {start_datetime ? formatDateTime(start_datetime) : NO_VALUE}
        </span>{' '}
        ~
        <span className="inline-block">
          {end_datetime ? formatDateTime(end_datetime) : NO_VALUE}
        </span>
      </div>
    );
  };

  const renderRemoveProjectHandler = (_: any, project: ProjectProps) => {
    return (
      <Button
        auto
        icon={<Trash2 />}
        px={0.4}
        scale={0.5}
        type="error"
        ghost
        onClick={() => deleteProject(project)}
      >
        Remove project
      </Button>
    );
  };

  if (isLoadingProjects) {
    return <Loading>Loading projects</Loading>;
  }

  return (
    Array.isArray(projects) &&
    (projects?.length > 0 ? (
      <Table<ProjectProps> data={projects}>
        <Table.Column<ProjectProps> prop="title" label="Title" render={renderTitle} />
        <Table.Column<ProjectProps> prop="created_at" label="Created at" render={renderCreatedAt} />
        <Table.Column<ProjectProps>
          prop="start_datetime"
          label="Period"
          render={renderStartDateTime}
        />
        <Table.Column<ProjectProps> prop="id" label="Action" render={renderRemoveProjectHandler} />
      </Table>
    ) : (
      <Text>No available projects</Text>
    ))
  );
};

export default ProjectsContent;
