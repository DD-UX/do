export const APP_NAVIGATION_SIDEBAR_THEME = {
  root: {
    inner: 'h-full overflow-y-auto overflow-x-hidden rounded bg-white py-4 px-3 dark:bg-gray-900'
  }
};

export const APP_NAVIGATION_SIDEBAR_LOGOUT_BUTTON_THEME = {
  color: {
    logout:
      'transition-all text-gray-900 bg-white border border-gray-300 enabled:hover:bg-white focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-800 dark:enabled:hover:bg-gray-600 dark:enabled:hover:border-gray-700 dark:focus:ring-gray-800'
  }
};

export const APP_HIGH_CONTRAST_INPUT_THEME = {
  field: {
    input: {
      colors: {
        gray: 'bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500'
      }
    }
  }
};
export const APP_HIGH_CONTRAST_TEXTAREA_THEME = {
  colors: {...APP_HIGH_CONTRAST_INPUT_THEME.field.input.colors}
};
