'use client';

import {FC, useContext} from 'react';
import {Button, useTheme} from '@geist-ui/core';
import Calendar from '@geist-ui/icons/calendar';
import Trash2 from '@geist-ui/icons/trash2';
import NextLink from 'next/link';
import styled from 'styled-components';

import EllipsisText from 'features/app/components/common/EllipsisText';
import {LayoutLink} from 'features/app/components/Layout';
import {NO_VALUE} from 'features/app/constants/ui-constants';
import {ProjectsContext} from 'features/app/context/ProjectsContext';
import {formatDateTime} from 'features/app/helpers/date-helpers';
import {GeistThemeProps} from 'lib/geist/geist-theme-models';
import {ProjectProps} from 'lib/sdk/projects/client/get';

const ProjectListItemWrapper = styled.div<GeistThemeProps>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: minmax(0, 1fr) 10rem 10rem 2.5rem;
  gap: ${({$theme}) => $theme.layout.gapHalf};
  padding: ${({$theme}) => $theme.layout.gapHalf} 0;
  align-items: center;

  & + & {
    border-block-start: 0.0625rem solid ${({$theme}) => $theme.palette.border};
  }
`;

type ProjectListItemProps = {
  project: ProjectProps;
};

const ProjectListItem: FC<ProjectListItemProps> = ({project}) => {
  const theme = useTheme();
  const {deleteProject} = useContext(ProjectsContext);
  const {id, title, created_at, start_datetime, end_datetime} = project;

  const removeProjectHandler = () => {
    deleteProject(project);
  };

  return (
    <ProjectListItemWrapper $theme={theme}>
      <NextLink href={`/projects/${id}`} passHref>
        <LayoutLink $theme={theme}>
          <EllipsisText h6 my={0}>
            {title}
          </EllipsisText>
        </LayoutLink>
      </NextLink>

      <div className="inline-flex gap-1 items-center whitespace-nowrap text-end justify-self-end">
        <span>
          <Calendar size={12} />
        </span>
        {formatDateTime(created_at)}
      </div>

      <div className="inline-flex gap-1 items-center whitespace-nowrap text-end justify-self-end">
        <span>
          <Calendar size={12} />
        </span>
        {start_datetime ? formatDateTime(start_datetime) : NO_VALUE}
        {end_datetime ? formatDateTime(end_datetime) : NO_VALUE}
      </div>

      <Button
        auto
        icon={<Trash2 />}
        px={0.4}
        scale={0.75}
        type="error"
        ghost
        onClick={removeProjectHandler}
      />
    </ProjectListItemWrapper>
  );
};

export default ProjectListItem;
