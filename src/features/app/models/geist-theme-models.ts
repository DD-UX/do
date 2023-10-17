import {GeistUIThemes} from '@geist-ui/core/dist/themes/presets';

export type GeistThemeProps = {
  $theme: GeistUIThemes & {
    type: string;
  };
};

export type DropdownItemModel = {
  label: string;
  value: string;
  disabled?: boolean;
};
