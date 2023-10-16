'use client';

import {FC, useContext} from 'react';
import {LuSave} from 'react-icons/lu';
import {
  appEntityContentVariants,
  appEntityFormSidePanelContentVariants,
  appEntityFormSidePanelVariants,
  appEntityFormVariants
} from 'app/layout-variants/app-entity-detail-variants';
import dayjs from 'dayjs';
import {Button, Datepicker, Flowbite, Textarea, TextInput, ThemeProps} from 'flowbite-react';
import {useFormik} from 'formik';
import * as yup from 'yup';

import FormControl from 'features/app/components/common/FormControl';
import Loading from 'features/app/components/common/Loading';
import {
  HIGH_CONTRAST_INPUT_THEME,
  HIGH_CONTRAST_TEXTAREA_THEME
} from 'features/app/constants/theme-constants';
import {getDateTimeValue} from 'features/app/helpers/date-helpers';
import {ProjectContext} from 'features/project/context/ProjectContext';
import {ProjectProps} from 'lib/sdk/projects/client/get';

const ProjectForm: FC = () => {
  const {project, isLoadingProject, updateProject} = useContext(ProjectContext);
  const formikInstance = useFormik<ProjectProps>({
    initialValues: {...project} as ProjectProps,
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      title: yup.string().label('Title').required().nullable()
    }),
    onSubmit: updateProject
  });

  console.log('formikInstance.values?.start_datetime', formikInstance.values?.start_datetime);

  const handleSelectDate = (fieldName: keyof ProjectProps, date: Date) => {
    console.log('date', date);
    console.log('date', dayjs(date).valueOf());
    formikInstance.setFieldValue(fieldName, date);
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
      {isLoadingProject ? (
        <Loading text="Loading project" />
      ) : (
        <form className={appEntityFormVariants()} onSubmit={formikInstance.handleSubmit}>
          <section className={appEntityContentVariants()}>
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
          <aside className={appEntityFormSidePanelVariants()}>
            <div className={appEntityFormSidePanelContentVariants()}>
              <FormControl label="Start date:">
                <Datepicker
                  name="start_datetime"
                  value={getDateTimeValue(formikInstance.values?.start_datetime)}
                  onSelectedDateChanged={(date) => handleSelectDate('start_datetime', date)}
                />
              </FormControl>
              <FormControl label="End date:">
                <Datepicker
                  name="end_datetime"
                  value={getDateTimeValue(formikInstance.values?.end_datetime)}
                  onSelectedDateChanged={(date) => handleSelectDate('end_datetime', date)}
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
          </aside>
        </form>
      )}
    </Flowbite>
  );
};

export default ProjectForm;
