// This creates a phantom link and simulates a click event to open the link in a new tab.
export const openNewTabLink = (linkUrl: string) => {
  const linkEl = document.createElement('a');
  linkEl.href = linkUrl;
  linkEl.target = '_blank';
  linkEl.click();
};
