'use client';

import {FC, FormEvent, useState} from 'react';
import {Button, Input, KeyCode, useKeyboard, useTheme, useToasts} from '@geist-ui/core';
import Save from '@geist-ui/icons/save';
import styled from 'styled-components';

import {openNewTabLink} from 'features/app/helpers/ui-helpers';
import {GeistThemeProps} from 'lib/geist/geist-theme-models';
import {setProject} from 'lib/sdk/projects/client/set';

const AddProjectFormWrapper = styled.form<GeistThemeProps>`
  display: inline-grid;
  grid-auto-flow: column;
  grid-template-columns: minmax(6rem, 20rem) 2.5rem;
  gap: ${({$theme}) => $theme.layout.gapQuarter};
  align-items: center;
  margin-inline-start: auto;
`;

type AddProjectFormProps = {
  autoFocus?: boolean;
  onCreate?: () => void;
};
const AddProjectForm: FC<AddProjectFormProps> = ({autoFocus = true, onCreate}) => {
  const {setToast} = useToasts();
  const theme = useTheme();
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  // This restores the field value and handles the close
  const resetForm = () => {
    setNewProjectName('');
  };

  // Reset form on Escape
  useKeyboard(() => {
    resetForm();
  }, [KeyCode.Escape]);

  // Handle add project
  const addProjectHandler = async (event: FormEvent) => {
    // Prevent form submit complete behavior through HTML
    event.preventDefault();
    event.stopPropagation();

    // Avoid saving when name is empty
    if (newProjectName.length < 1) {
      return;
    }

    // Handle creation
    try {
      setIsCreatingProject(true);
      const {project} = await setProject({title: newProjectName});
      onCreate?.();
      setToast({
        text: `Project ${newProjectName} created successfully.`,
        type: 'success',
        delay: 5000,
        actions: [
          {
            name: 'Open in new tab',
            handler: () => openNewTabLink(`/projects/${project?.id}`)
          }
        ]
      });
      resetForm();
    } catch (error) {
      setToast({
        text: `An error occurred while creating ${newProjectName} project.`,
        type: 'error'
      });
    } finally {
      setIsCreatingProject(false);
    }
  };

  return (
    <AddProjectFormWrapper $theme={theme} onSubmit={addProjectHandler}>
      <Input
        autoFocus={autoFocus}
        tabIndex={-1}
        width="100%"
        initialValue={newProjectName}
        value={newProjectName}
        placeholder="New project name"
        onChange={(event) => setNewProjectName(event.target.value)}
      />
      <Button
        auto
        icon={<Save />}
        htmlType="submit"
        loading={isCreatingProject}
        disabled={newProjectName.length < 1}
        px={0.6}
        scale={0.75}
        type="success"
      />
    </AddProjectFormWrapper>
  );
};

export default AddProjectForm;
