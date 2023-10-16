import {tv} from 'tailwind-variants';

export const appEntityFormVariants = tv({
  base: ['flex', 'w-full', 'h-full']
});

export const appEntityContentVariants = tv({
  base: [
    'w-full',
    'h-full',
    'flex',
    'flex-col',
    'gap-2',
    'p-4',
    'item-center',
    'overflow-y-auto',
    'overflow-x-hidden'
  ]
});

export const appEntityFormSidePanelVariants = tv({
  base: [
    // layout
    'flex-[0_0_auto]',
    'w-64',
    'grid',
    'grid-rows-[minmax(0,1fr)_min-content]',
    'gap-4',
    'p-4',
    // background
    'bg-gray-100',
    'dark:bg-gray-600',
    // border
    'border-l-2 ',
    'border-l-gray-200',
    'dark:border-l-gray-700'
  ]
});

export const appEntityFormSidePanelContentVariants = tv({
  base: ['flex', 'flex-col', 'gap-2']
});
