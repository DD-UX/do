export const APP_NAVIGATION_SIDEBAR_THEME = {
  root: {
    inner: 'h-full overflow-y-auto overflow-x-hidden bg-white dark:bg-gray-900',
    collapsed: {
      on: 'w-10',
      off: 'w-14 border-r-4 border-gray-100 dark:border-gray-900'
    }
  },
  itemGroup:
    'mt-4 space-y-2 border-t border-gray-200 p-4 first:border-t-0 first:pt-0 dark:border-gray-700'
};

export const APP_NAVIGATION_SIDEBAR_LOGOUT_BUTTON_THEME = {
  base: 'group flex items-stretch items-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none',
  color: {
    logout:
      'transition-all text-gray-900 bg-white border border-gray-300 enabled:hover:bg-white focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-800 dark:enabled:hover:bg-gray-600 dark:enabled:hover:border-gray-700 dark:focus:ring-gray-800'
  },
  size: {
    md: 'text-sm px-3 py-2'
  }
};

export const HIGH_CONTRAST_INPUT_THEME = {
  field: {
    input: {
      colors: {
        gray: 'bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500'
      }
    }
  }
};

export const HIGH_CONTRAST_TEXTAREA_THEME = {
  colors: {...HIGH_CONTRAST_INPUT_THEME.field.input.colors}
};

export const AVATAR_THEME = {
  root: {
    base: 'flex justify-center items-center space-x-0 rounded'
  }
};
