import {FC, useEffect, useMemo, useState} from 'react';
import {LuChevronDown} from 'react-icons/lu';
import {Dropdown} from 'flowbite-react';
import {tv} from 'tailwind-variants';

import {PROJECT_NOT_ASSIGNED} from 'features/app/constants/project-constants';
import {NO_VALUE} from 'features/app/constants/ui-constants';
import {DropdownItemModel} from 'features/app/models/geist-theme-models';
import {getProjects} from 'lib/sdk/projects/client/get';

const dropdownSelectorRender = tv({
  base: [
    'grid',
    'grid-flow-col',
    'gap-1',
    'grid-cols-[minmax(0,min-content)_0.75rem]',
    'items-center',
    'cursor-pointer',
    'overflow-hidden'
  ]
});

type ProjectSelectorProps = {
  value: string;
  onChange: (updatedProject: string) => void;
};

const ProjectSelector: FC<ProjectSelectorProps> = ({value, onChange}) => {
  const [projectsOptions, setProjectsOptions] = useState<DropdownItemModel[]>([]);
  const dropdownLabel = useMemo(
    () => projectsOptions.find((o) => o.value === value)?.label || NO_VALUE,
    [projectsOptions, value]
  );
  const handleGetProjects = async () => {
    try {
      const {projects} = await getProjects({pickProps: ['id', 'title'], sortBy: 'title'});
      const options = [PROJECT_NOT_ASSIGNED];
      if (Array.isArray(projects)) {
        options.push(...projects);
      }
      setProjectsOptions(
        options.map(({id, title}) => ({
          value: id,
          label: title
        }))
      );
    } catch (e) {
      setProjectsOptions([]);
    }
  };

  useEffect(() => {
    handleGetProjects();
  }, []);

  return (
    <Dropdown
      label="Dropdown"
      inline
      renderTrigger={() => (
        <div className={dropdownSelectorRender()}>
          <p className="m-0 truncate">{dropdownLabel}</p>
          <LuChevronDown />
        </div>
      )}
    >
      <Dropdown.Header>Select a project</Dropdown.Header>
      {projectsOptions.map(({value, label}) => (
        <Dropdown.Item key={value} value={value} onClick={() => onChange(value)}>
          {label}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default ProjectSelector;
