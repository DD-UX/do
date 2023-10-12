import {tv} from 'tailwind-variants';

export type HeaderContentFooterVariantsProps = (variantConfig: {
  layout: 'column' | 'content';
}) => string;

export const headerContentFooterVariants: HeaderContentFooterVariantsProps = tv({
  base: [
    // layout
    'grid',
    `grid-rows-[3.6rem_minmax(0,1fr)_min-content]`,
    'grid-cols-1',
    'overflow-hidden',
    // background
    'bg-gray-50',
    'dark:bg-gray-800',
    //border
    'border-r',
    'border-gray-200',
    'dark:border-gray-700'
  ],
  variants: {
    layout: {
      column: 'w-64 m-0 flex-[0_1_auto]',
      content: 'w-full'
    }
  }
});
