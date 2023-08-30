import {FC} from 'react';
import {Text} from '@geist-ui/core';
import {FormikErrors} from 'formik/dist/types';
import styled, {css} from 'styled-components';

import textEllipsisMixin from 'features/app/styles/textEllipsis.styles';

export const FormControlRow = styled.div<{
  $alignItems?: string;
  vertical: boolean;
  $wrapHorizontal?: boolean;
}>`
  display: grid;
  grid-gap: 0.2rem;
  ${({$alignItems, vertical, $wrapHorizontal}) =>
    !vertical
      ? css`
          grid-auto-flow: column;
          grid-template-columns: ${$wrapHorizontal ? 'auto' : 'minmax(3rem, 10rem)'} 1fr;
          align-items: ${$alignItems ? $alignItems : 'center'};
        `
      : css`
          grid-template-columns: minmax(0, 1fr);
        `};

  [aria-label] {
    margin: 0;
    ${textEllipsisMixin};
  }
`;
const FormControlContent = styled.div`
  p {
    margin: 0;
  }

  // Mobile applies a max-width of 90vw to Geist select control
  // This removes it as long as the control belongs to the form control
  .select {
    max-width: none !important;
  }
`;

export type FormControlProps = {
  label?: string;
  errors?: string | string[] | FormikErrors<any> | FormikErrors<any>[] | undefined;
  showErrors?: boolean;
  alignItems?: string;
  vertical?: boolean;
  noEllipsis?: boolean;
  wrapHorizontal?: boolean;
};

const FormControl: FC<FormControlProps> = ({
  label = '',
  errors = [],
  showErrors = false,
  alignItems = '',
  vertical = false,
  noEllipsis = false,
  wrapHorizontal = false,
  children
}) => {
  // Standardize error type
  if (!Array.isArray(errors)) {
    errors = [errors as string];
  }

  return (
    <FormControlRow $alignItems={alignItems} vertical={vertical} $wrapHorizontal={wrapHorizontal}>
      {/*
       * Form control label element
       */}
      <label htmlFor="" style={{display: 'block'}}>
        {label && <Text aria-label={label}>{label}</Text>}
      </label>

      <FormControlContent>
        {children}

        {/*
         * Form control error
         */}
        {errors &&
          errors.length > 0 &&
          showErrors &&
          (errors as string[]).map((error, idx) => (
            <Text key={`FormControl-error-${error}-${idx}`} scale={1.2} type="error" my={0}>
              {error}
            </Text>
          ))}
      </FormControlContent>
    </FormControlRow>
  );
};

export default FormControl;
