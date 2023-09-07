import {FC, useEffect, useState} from 'react';
import {Select} from '@geist-ui/core';

import {PROJECT_NOT_ASSIGNED} from 'features/app/constants/project-constants';
import {GeistSelectOption} from 'lib/geist/geist-theme-models';
import {getProjects} from 'lib/sdk/projects/client/get';

type ProjectSelectorProps = {
  scale: number;
  value: string;
  onChange: (updatedProject: string) => void;
};

const ProjectSelector: FC<ProjectSelectorProps> = ({scale = 1, value, onChange}) => {
  const [projectsOptions, setProjectsOptions] = useState<GeistSelectOption[]>([]);
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
    <Select
      scale={scale}
      initialValue={value}
      value={value}
      onChange={(updatedValue) => onChange(String(updatedValue))}
    >
      {projectsOptions.map(({value, label}) => (
        <Select.Option key={value} value={value}>
          {label}
        </Select.Option>
      ))}
    </Select>
  );
};

export default ProjectSelector;
