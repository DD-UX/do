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
import {ProjectContext} from 'features/project/context/ProjectContext';
import {ProjectProps} from 'lib/sdk/projects/client/get';

const ProjectForm: FC = () => {
  const theme = useTheme();
  const {project, isLoadingProject, updateProject} = useContext(ProjectContext);
  const {tasks, ...projectData} = project || {};
  const formikInstance = useFormik<ProjectProps>({
    initialValues: (projectData as ProjectProps) || ({} as ProjectProps),
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      title: yup.string().label('Title').required().nullable()
    }),
    onSubmit: updateProject
  });

  // Reset form on Escape
  useKeyboard(() => {
    formikInstance.resetForm();
  }, [KeyCode.Escape]);

  return (
    <DetailForm onSubmit={formikInstance.handleSubmit}>
      {isLoadingProject ? (
        <Loading>Loading project</Loading>
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
              <FormControl label="Start date:" alignItems="start">
                To do
              </FormControl>
              <FormControl label="End date:" alignItems="start">
                To do
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

export default ProjectForm;
