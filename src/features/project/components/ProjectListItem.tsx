'use client';

import {FC, useContext, useMemo} from 'react';
import {LuCalendarRange, LuTrash2} from 'react-icons/lu';
import {appLinkVariants} from 'app/layout-variants/app-link-variants';
import {Button} from 'flowbite-react';
import NextLink from 'next/link';
import {twMerge} from 'tailwind-merge';

import {ProjectsContext} from 'features/app/context/ProjectsContext';
import {getDateTimeRangeValue} from 'features/app/helpers/date-helpers';
import {ProjectProps} from 'lib/sdk/projects/client/get';

type ProjectListItemProps = {
  project: ProjectProps;
};

const ProjectListItem: FC<ProjectListItemProps> = ({project}) => {
  const {deleteProject} = useContext(ProjectsContext);
  const {id, title, start_datetime, end_datetime} = project;

  const linkClassName = useMemo(() => {
    const classNames = ['truncate', 'text-sm', 'cursor-pointer'];
    // here goes the logic to display the project is active based on the start and end date
    // if (status === STATUS_CANCELLED || status === STATUS_DONE) {
    //   classNames.push(...['line-through', 'opacity-50']);
    // }
    return twMerge(appLinkVariants(), classNames);
  }, []);

  const itemClassName = useMemo(() => {
    const classNames = [
      // layout
      'grid',
      'grid-rows-[min-content]',
      'grid-cols-[8rem_minmax(0,1fr)_8rem_min-content]',
      'gap-4',
      'p-2',
      'rounded-md',
      'items-center',
      'hover:bg-gray-200',
      'hover:dark:bg-gray-700',
      'transition-all'
    ];
    return twMerge(classNames);
  }, []);

  const removeProjectHandler = () => {
    deleteProject(project);
  };

  return (
    <div className={itemClassName}>
      <NextLink
        className={linkClassName}
        href={{
          pathname: `/projects/${id}`
        }}
        passHref
      >
        {title}
      </NextLink>
      <div className="inline-flex gap-1 items-center whitespace-nowrap text-end justify-self-end">
        <div>
          <LuCalendarRange size={12} />
        </div>
        {getDateTimeRangeValue(start_datetime, end_datetime)}
      </div>
      <Button
        fullSized
        size="xs"
        type="button"
        color="failure"
        outline
        onClick={removeProjectHandler}
      >
        <span className="inline-flex gap-2">
          <LuTrash2 size={16} />
          Remove
        </span>
      </Button>
    </div>
  );
};

export default ProjectListItem;
