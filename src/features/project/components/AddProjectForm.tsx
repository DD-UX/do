'use client';

import {FC, FormEvent, useState} from 'react';
import {LuFolderPlus, LuSave} from 'react-icons/lu';
import {Button, TextInput} from 'flowbite-react';

import FloatingToast, {FloatingToastProps} from 'features/app/components/common/FloatingToast';
import {FAILURE_TYPE, SUCCESS_TYPE} from 'features/app/constants/toast-constants';
import {setProject} from 'lib/sdk/projects/client/set';

type AddProjectFormProps = {
  autoFocus?: boolean;
  onCreate?: () => void;
};
const AddProjectForm: FC<AddProjectFormProps> = ({autoFocus = true, onCreate}) => {
  const [toast, setToast] = useState<Omit<FloatingToastProps, 'onDismiss'> | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  // This restores the field value and handles the close
  const resetForm = () => {
    setNewProjectName('');
  };

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
        type: SUCCESS_TYPE,
        link: `/projects/${project?.id}`
      });
      resetForm();
    } catch (error) {
      setToast({
        text: `An error occurred while creating ${newProjectName} project.`,
        type: FAILURE_TYPE
      });
    } finally {
      setIsCreatingProject(false);
    }
  };

  return (
    <>
      <form
        className="inline-grid grid-flow-col grid-rows-[1fr] grid-cols-[minmax(6rem,20rem)_2.5rem] align-items-stretch gap-1 ml-auto h-full"
        onSubmit={addProjectHandler}
      >
        <TextInput
          autoFocus={autoFocus}
          icon={LuFolderPlus}
          sizing="sm"
          tabIndex={-1}
          width="100%"
          value={newProjectName}
          placeholder="New project name"
          onChange={(event) => setNewProjectName(event.target.value)}
        />

        <Button
          fullSized
          type="submit"
          isProcessing={isCreatingProject}
          disabled={newProjectName.length < 1}
          size="xs"
          className="py-0"
        >
          {!isCreatingProject && <LuSave size={16} />}
        </Button>
      </form>
      {toast && <FloatingToast {...toast} onDismiss={() => setToast(null)} />}
    </>
  );
};

export default AddProjectForm;
