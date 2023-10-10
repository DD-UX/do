export const APP_NAVIGATION_SIDEBAR_THEME = {
  root: {
    inner: 'h-full overflow-y-auto overflow-x-hidden rounded bg-white py-4 px-3 dark:bg-gray-900'
  },
  item: {
    base: 'flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800',
    active: 'bg-gray-100 dark:bg-gray-800',
    collapsed: {
      insideCollapse: 'group w-full pl-8 transition duration-75',
      noIcon: 'font-bold'
    },
    content: {
      base: 'px-3 flex-1 whitespace-nowrap'
    },
    icon: {
      base: 'h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white',
      active: 'text-gray-700 dark:text-gray-100'
    },
    label: '',
    listItem: ''
  },
  items: '',
  itemGroup:
    'mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700',
  logo: {
    base: 'mb-5 flex items-center pl-2.5',
    collapsed: {
      on: 'hidden',
      off: 'self-center whitespace-nowrap text-xl font-semibold dark:text-white'
    },
    img: 'mr-3 h-6 sm:h-7'
  }
};

export const APP_NAVIGATION_SIDEBAR_LOGOUT_BUTTON_THEME = {
  color: {
    logout:
      'transition-all text-gray-900 bg-white border border-gray-300 enabled:hover:bg-white focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-800 dark:enabled:hover:bg-gray-600 dark:enabled:hover:border-gray-700 dark:focus:ring-gray-800'
  }
};
