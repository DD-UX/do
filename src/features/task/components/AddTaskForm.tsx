'use client';

import {FC, FormEvent, useState} from 'react';
import {LuListPlus, LuSave} from 'react-icons/lu';
import {Button, TextInput} from 'flowbite-react';

import FloatingToast, {FloatingToastProps} from 'features/app/components/common/FloatingToast';
import {FAILURE_TYPE, SUCCESS_TYPE} from 'features/app/constants/toast-constants';
import {setTask} from 'lib/sdk/tasks/client/set';

type AddTaskFormProps = {
  projectId?: string | null;
  autoFocus?: boolean;
  onCreate?: () => void;
};

const AddTaskForm: FC<AddTaskFormProps> = ({projectId, autoFocus = true, onCreate}) => {
  const [toast, setToast] = useState<Omit<FloatingToastProps, 'onDismiss'> | null>(null);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // This restores the field value and handles the close
  const resetForm = () => {
    setNewTaskTitle('');
  };

  // Handle add task
  const addTaskHandler = async (event: FormEvent) => {
    // Prevent form submit complete behavior through HTML
    event.preventDefault();
    event.stopPropagation();

    // Avoid saving when name is empty
    if (newTaskTitle.length < 1) {
      return;
    }

    // Handle creation
    try {
      setIsCreatingTask(true);
      const {task} = await setTask({
        title: newTaskTitle,
        project_id: projectId || null
      });
      onCreate?.();
      setToast({
        text: `Task ${newTaskTitle} created successfully.`,
        type: SUCCESS_TYPE,
        link: `/tasks/${task?.id}`
      });
      resetForm();
    } catch (error) {
      setToast({
        text: `An error occurred while creating ${newTaskTitle} task.`,
        type: FAILURE_TYPE
      });
    } finally {
      setIsCreatingTask(false);
    }
  };

  return (
    <>
      <form
        className="inline-grid grid-flow-col grid-rows-[1fr] grid-cols-[minmax(6rem,20rem)_2.5rem] align-items-stretch gap-1 ml-auto h-full"
        onSubmit={addTaskHandler}
      >
        <TextInput
          autoFocus={autoFocus}
          icon={LuListPlus}
          sizing="sm"
          tabIndex={-1}
          width="100%"
          value={newTaskTitle}
          placeholder="New task name"
          onChange={(event) => setNewTaskTitle(event.target.value)}
        />

        <Button
          fullSized
          type="submit"
          isProcessing={isCreatingTask}
          disabled={newTaskTitle.length < 1}
          size="xs"
          className="py-0"
        >
          {!isCreatingTask && <LuSave size={16} />}
        </Button>
      </form>
      {toast && <FloatingToast {...toast} onDismiss={() => setToast(null)} />}
    </>
  );
};

export default AddTaskForm;
