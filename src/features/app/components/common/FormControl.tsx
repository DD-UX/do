import {FC, PropsWithChildren} from 'react';
import {FormikErrors} from 'formik/dist/types';

export type FormControlProps = {
  label?: string;
  errors?: string | string[] | FormikErrors<any> | FormikErrors<any>[] | undefined;
  showErrors?: boolean;
};

const FormControl: FC<PropsWithChildren<FormControlProps>> = ({
  label = '',
  errors = [],
  showErrors = false,
  children
}) => {
  // Standardize error type
  if (!Array.isArray(errors)) {
    errors = [errors as string];
  }

  return (
    <div className="grid grid-rows-[min-content] gap-1">
      {/*
       * Form control label element
       */}
      <label htmlFor="" className="block">
        {label && (
          <p
            className="m-0 truncate text-xs uppercase font-bold tracking-wide text-gray-700 dark:text-gray-400"
            aria-label={label}
          >
            {label}
          </p>
        )}
      </label>
      {children}
      {/*
       * Form control error
       */}
      {errors &&
        errors.length > 0 &&
        showErrors &&
        (errors as string[]).map((error, idx) => (
          <p className="text-red-500" key={`FormControl-error-${error}-${idx}`}>
            {error}
          </p>
        ))}
    </div>
  );
};

export default FormControl;
