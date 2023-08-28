import {GeistUserTheme} from '@geist-ui/core/dist/themes/themes';

export type GeistThemeProps = {
  $theme: GeistUserTheme;
};

export type GeistSelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};
