'use client';

import {FC, useContext} from 'react';
import {LuSave} from 'react-icons/lu';
import {Button, Flowbite, Textarea, TextInput, ThemeProps} from 'flowbite-react';
import {useFormik} from 'formik';
import * as yup from 'yup';

import FormControl from 'features/app/components/common/FormControl';
import Loading from 'features/app/components/common/Loading';
import ProjectSelector from 'features/app/components/common/ProjectSelector';
import StatusSelector from 'features/app/components/common/StatusSelector';
import UserSelector from 'features/app/components/common/UserSelector';
import {TASK_STATUSES} from 'features/app/constants/status-constants';
import {NO_VALUE} from 'features/app/constants/ui-constants';
import useTaskUpdate from 'features/app/hooks/useTaskUpdate';
import {TaskContext} from 'features/task/context/TaskContext';
import {
  HIGH_CONTRAST_INPUT_THEME,
  HIGH_CONTRAST_TEXTAREA_THEME
} from 'features/theme/constants/theme-constants';
import {ProjectProps} from 'lib/sdk/projects/client/get';
import {TaskProps} from 'lib/sdk/tasks/client/get';
import {UserProps} from 'lib/sdk/users/client/get';

const TaskForm: FC = () => {
  const {task, isLoadingTask, refreshTask} = useContext(TaskContext);
  const {updateTask} = useTaskUpdate();
  const formikInstance = useFormik<TaskProps>({
    initialValues: {...task} as TaskProps,
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      title: yup.string().label('Title').required().nullable()
    }),
    onSubmit: async (values) => {
      const updatedValues = {...values};
      await updateTask(updatedValues);
      refreshTask();
    }
  });

  const updateStatus = (updatedStatus: (typeof TASK_STATUSES)[number] | string) => {
    formikInstance.setFieldValue('status', updatedStatus, true);
  };

  const updateAssigneeUser = (updatedUser: UserProps['id']) => {
    formikInstance.setFieldValue('assignee_id', updatedUser, true);
  };

  const updateProjectId = (updatedProjectId: ProjectProps['id'] | null) => {
    formikInstance.setFieldValue('project_id', updatedProjectId, true);
  };

  return (
    <Flowbite
      theme={
        {
          theme: {
            textInput: HIGH_CONTRAST_INPUT_THEME,
            textarea: HIGH_CONTRAST_TEXTAREA_THEME
          }
        } as ThemeProps
      }
    >
      {isLoadingTask ? (
        <Loading text="Loading task" />
      ) : (
        <form className="flex w-full h-full" onSubmit={formikInstance.handleSubmit}>
          <section className="p-4 flex flex-col gap-2 item-center w-full h-full overflow-y-auto overflow-x-hidden">
            <FormControl
              label="Title"
              errors={formikInstance?.errors?.title}
              showErrors={!!formikInstance?.touched?.title}
            >
              <TextInput
                name="title"
                tabIndex={0}
                autoFocus
                value={formikInstance.values?.title || ''}
                placeholder="Update package.json libraries"
                onChange={formikInstance.handleChange}
                onBlur={formikInstance.handleBlur}
              />
            </FormControl>
            <FormControl label="Content">
              <Textarea
                name="content"
                value={formikInstance.values?.content || ''}
                placeholder="We are going to develop..."
                onChange={formikInstance.handleChange}
                onBlur={formikInstance.handleBlur}
              />
            </FormControl>
          </section>
          <div className="w-64 flex-[0_0_auto] p-4 grid grid-rows-[minmax(0,1fr)_min-content] gap-4 bg-gray-100 dark:bg-gray-600 border-l-2 border-l-gray-200 dark:border-l-gray-700 overflow-hidden">
            <div className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
              <FormControl label="Status:">
                <StatusSelector
                  showValue
                  iconSize={18}
                  status={formikInstance.values.status}
                  onChange={updateStatus}
                />
              </FormControl>
              <FormControl label="Assigned:">
                <UserSelector
                  showUserName
                  userId={formikInstance.values.assignee_id}
                  onChange={updateAssigneeUser}
                />
              </FormControl>
              <FormControl label="Project:">
                <ProjectSelector
                  scale={0.5}
                  value={formikInstance.values.project_id || NO_VALUE}
                  onChange={updateProjectId}
                />
              </FormControl>
            </div>
            <Button
              fullSized
              type="submit"
              isProcessing={formikInstance.isSubmitting}
              disabled={!formikInstance.isValid}
            >
              <span className="inline-flex gap-2">
                <LuSave size={16} />
                Save
              </span>
            </Button>
          </div>
        </form>
      )}
    </Flowbite>
  );
};

export default TaskForm;
