'use client';

import {FC, useContext} from 'react';
import {LuSave} from 'react-icons/lu';
import {Loading} from '@geist-ui/core';
import {Button, Textarea, TextInput} from 'flowbite-react';
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

  return (
    <DetailForm onSubmit={formikInstance.handleSubmit}>
      {isLoadingProject ? (
        <Loading>Loading project</Loading>
      ) : (
        <>
          <DetailContent className="p-4 gap-4">
            <FormControl
              label="Title"
              vertical
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
            <FormControl label="Content" vertical>
              <Textarea
                name="content"
                value={formikInstance.values?.content || ''}
                placeholder="We are going to develop..."
                onChange={formikInstance.handleChange}
                onBlur={formikInstance.handleBlur}
              />
            </FormControl>
          </DetailContent>
          <DetailMenu className="p-4 gap-4 bg-gray-100 dark:bg-gray-600 border-l-2 border-l-gray-200 dark:border-l-gray-700">
            <DetailMenuContent>
              <FormControl label="Start date:" alignItems="start">
                To do
              </FormControl>
              <FormControl label="End date:" alignItems="start">
                To do
              </FormControl>
            </DetailMenuContent>
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
          </DetailMenu>
        </>
      )}
    </DetailForm>
  );
};

export default ProjectForm;
