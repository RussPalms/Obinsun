export const isActiveLink = (
  href: string,
  currentPathname: string
): boolean => {
  if (href === '/') {
    return href === currentPathname;
  }

  return currentPathname.startsWith(href);
};

export default function _() {
  const div = document.createElement('div');
  return div;
}
