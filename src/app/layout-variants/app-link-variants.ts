import {tv} from 'tailwind-variants';

export const appLinkVariants = tv({
  base: [
    // basic
    'text-accent-800',
    'no-underline',
    'decoration-1',
    'underline-offset-2',
    // hover
    'hover:text-accent-900'
  ]
});
