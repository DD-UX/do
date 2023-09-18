'use client';

import {FC, useContext} from 'react';
import {Button, Input, KeyCode, Loading, Textarea, useKeyboard, useTheme} from '@geist-ui/core';
import Save from '@geist-ui/icons/save';
import {useFormik} from 'formik';
import {motion} from 'framer-motion';
import styled from 'styled-components';
import * as yup from 'yup';

import FormControl from 'features/app/components/common/FormControl';
import ProjectSelector from 'features/app/components/common/ProjectSelector';
import StatusSelector from 'features/app/components/common/StatusSelector';
import UserSelector from 'features/app/components/common/UserSelector';
import {TASK_STATUSES} from 'features/app/constants/status-constants';
import {NO_VALUE} from 'features/app/constants/ui-constants';
import useTaskUpdate from 'features/app/hooks/useTaskUpdate';
import Z_INDEX from 'features/app/styles/zIndex.styles';
import {TaskContext} from 'features/task/context/TaskContext';
import {GeistThemeProps} from 'lib/geist/geist-theme-models';
import {ProjectProps} from 'lib/sdk/projects/client/get';
import {TaskProps} from 'lib/sdk/tasks/client/get';
import {UserProps} from 'lib/sdk/users/client/get';

const TaskFormWrapper = styled.form`
  display: grid;
  grid-template-rows:
    [task-header-start] 3.6rem [task-header-end] 0
    [task-content-start] minmax(0, 1fr) [task-content-end];
  grid-template-columns:
    [task-content-start] minmax(0, 1fr) [task-content-end] 0
    [task-column-start] 20rem [task-column-end];

  height: 100%;
`;

const TaskContent = styled(motion.section).attrs({
  key: 'task-content'
  // to be implemented when shallow routing is available in Next.js app folder
  // initial: {opacity: 0},
  // animate: {opacity: 1},
  // exit: {opacity: 0},
  // transition: {duration: 0.2}
})<GeistThemeProps>`
  grid-row-start: task-header-start;
  grid-row-end: task-content-end;
  grid-column-start: task-content-start;
  grid-column-end: task-content-end;

  display: flex;
  flex-direction: column;
  gap: ${({$theme}) => $theme.layout.gapHalf};
  padding: ${({$theme}) => $theme.layout.gapHalf};
  height: 100%;
  width: 80%;
  max-width: 100rem;
  justify-self: center;
  overflow: auto;

  // These are useful when mobile, to get proper deepness and overlapping
  position: relative;
  z-index: ${Z_INDEX.modal};
`;

const TaskColumn = styled(motion.menu).attrs({
  key: 'task-column'
  // to be implemented when shallow routing is available in Next.js app folder
  // initial: {x: '100%'},
  // animate: {x: 0},
  // exit: {x: '100%'},
  // transition: {duration: 0.2}
})<GeistThemeProps>`
  grid-row-start: task-header-start;
  grid-row-end: task-content-end;
  grid-column-start: task-column-start;
  grid-column-end: task-column-end;

  display: flex;
  flex-direction: column;
  gap: ${({$theme}) => $theme.layout.gapHalf};

  margin: 0; // reset menu component
  background-color: ${({$theme}) => $theme.palette.accents_2};
  border-inline-end: 0.0625rem solid ${({$theme}) => $theme.palette.border};
  padding: ${({$theme}) => $theme.layout.gapHalf};
  height: 100%;
  overflow: hidden;

  // These are useful when mobile, to get proper deepness and overlapping
  position: relative;
  z-index: ${Z_INDEX.modal};
`;

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
    <TaskFormWrapper onSubmit={formikInstance.handleSubmit}>
      {isLoadingTask ? (
        <Loading>Loading task</Loading>
      ) : (
        <>
          <TaskContent $theme={theme}>
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
          </TaskContent>
          <TaskColumn $theme={theme}>
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
            <Button
              width="100%"
              icon={<Save />}
              htmlType="submit"
              px={0.6}
              scale={0.75}
              type="success"
              loading={formikInstance.isSubmitting}
              disabled={!formikInstance.isValid}
            >
              Save
            </Button>
          </TaskColumn>
        </>
      )}
    </TaskFormWrapper>
  );
};

export default TaskForm;
