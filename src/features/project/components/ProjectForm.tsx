'use client';

import {FC, useContext} from 'react';
import {Button, Input, KeyCode, Loading, Textarea, useKeyboard, useTheme} from '@geist-ui/core';
import Save from '@geist-ui/icons/save';
import {useFormik} from 'formik';
import {motion} from 'framer-motion';
import styled from 'styled-components';
import * as yup from 'yup';

import FormControl from 'features/app/components/common/FormControl';
import Z_INDEX from 'features/app/styles/zIndex.styles';
import {ProjectContext} from 'features/project/context/ProjectContext';
import {GeistThemeProps} from 'lib/geist/geist-theme-models';
import {ProjectProps} from 'lib/sdk/projects/client/get';

const ProjectFormWrapper = styled.form`
  display: grid;
  grid-template-rows:
    [project-header-start] 3.6rem [project-header-end] 0
    [project-content-start] minmax(0, 1fr) [project-content-end];
  grid-template-columns:
    [project-content-start] minmax(0, 1fr) [project-content-end] 0
    [project-column-start] 20rem [project-column-end];

  height: 100%;
`;

const ProjectContent = styled(motion.section).attrs({
  key: 'project-content'
  // to be implemented when shallow routing is available in Next.js app folder
  // initial: {opacity: 0},
  // animate: {opacity: 1},
  // exit: {opacity: 0},
  // transition: {duration: 0.2}
})<GeistThemeProps>`
  grid-row-start: project-header-start;
  grid-row-end: project-content-end;
  grid-column-start: project-content-start;
  grid-column-end: project-content-end;

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

const ProjectColumn = styled(motion.menu).attrs({
  key: 'project-column'
  // to be implemented when shallow routing is available in Next.js app folder
  // initial: {x: '100%'},
  // animate: {x: 0},
  // exit: {x: '100%'},
  // transition: {duration: 0.2}
})<GeistThemeProps>`
  grid-row-start: project-header-start;
  grid-row-end: project-content-end;
  grid-column-start: project-column-start;
  grid-column-end: project-column-end;

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
    <ProjectFormWrapper onSubmit={formikInstance.handleSubmit}>
      {isLoadingProject ? (
        <Loading>Loading project</Loading>
      ) : (
        <>
          <ProjectContent $theme={theme}>
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
          </ProjectContent>
          <ProjectColumn $theme={theme}>
            <FormControl label="Start date:" alignItems="start">
              To do
            </FormControl>
            <FormControl label="End date:" alignItems="start">
              To do
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
          </ProjectColumn>
        </>
      )}
    </ProjectFormWrapper>
  );
};

export default ProjectForm;
