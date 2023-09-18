'use client';

import {FC, useContext} from 'react';
import {Button, Input, KeyCode, Loading, Textarea, useKeyboard, useTheme} from '@geist-ui/core';
import Save from '@geist-ui/icons/save';
import {useFormik} from 'formik';
import * as yup from 'yup';

import {
  DetailContent,
  DetailForm,
  DetailMenu,
  DetailMenuContent
} from 'features/app/components/common/Detail';
import FormControl from 'features/app/components/common/FormControl';
import ProjectSelector from 'features/app/components/common/ProjectSelector';
import StatusSelector from 'features/app/components/common/StatusSelector';
import UserSelector from 'features/app/components/common/UserSelector';
import {TASK_STATUSES} from 'features/app/constants/status-constants';
import {NO_VALUE} from 'features/app/constants/ui-constants';
import useTaskUpdate from 'features/app/hooks/useTaskUpdate';
import {TaskContext} from 'features/task/context/TaskContext';
import {ProjectProps} from 'lib/sdk/projects/client/get';
import {TaskProps} from 'lib/sdk/tasks/client/get';
import {UserProps} from 'lib/sdk/users/client/get';

const TaskForm: FC = () => {
  const theme = useTheme();
  const {task, isLoadingTask, refreshTask} = useContext(TaskContext);
  const {updateTask} = useTaskUpdate();
  const formikInstance = useFormik<TaskProps>({
    initialValues: task || ({} as TaskProps),
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

  // Reset form on Escape
  useKeyboard(() => {
    formikInstance.resetForm();
  }, [KeyCode.Escape]);

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
    <DetailForm onSubmit={formikInstance.handleSubmit}>
      {isLoadingTask ? (
        <Loading>Loading task</Loading>
      ) : (
        <>
          <DetailContent $theme={theme}>
            <FormControl
              label="Title"
              vertical
              errors={formikInstance?.errors?.title}
              showErrors={!!formikInstance?.touched?.title}
            >
              <Input
                name="title"
                tabIndex={0}
                autoFocus
                width="100%"
                initialValue={formikInstance.values?.title || ''}
                value={formikInstance.values?.title || ''}
                placeholder="Update package.json libraries"
                onChange={formikInstance.handleChange}
                onBlur={formikInstance.handleBlur}
              />
            </FormControl>
            <FormControl label="Content" vertical>
              <Textarea
                name="content"
                width="100%"
                initialValue={formikInstance.values?.content || ''}
                value={formikInstance.values?.content || ''}
                placeholder="As a developer I want to..."
                onChange={formikInstance.handleChange}
                onBlur={formikInstance.handleBlur}
              />
            </FormControl>
          </DetailContent>
          <DetailMenu $theme={theme}>
            <DetailMenuContent $theme={theme}>
              <FormControl label="Status:" alignItems="start">
                <StatusSelector
                  showValue
                  iconSize={18}
                  status={formikInstance.values.status}
                  onChange={updateStatus}
                />
              </FormControl>
              <FormControl label="Assigned:" alignItems="start">
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
            </DetailMenuContent>
            <Button
              width="100%"
              icon={<Save />}
              htmlType="submit"
              mt="auto"
              px={0.6}
              scale={0.75}
              type="success"
              loading={formikInstance.isSubmitting}
              disabled={!formikInstance.isValid}
            >
              Save
            </Button>
          </DetailMenu>
        </>
      )}
    </DetailForm>
  );
};

export default TaskForm;
