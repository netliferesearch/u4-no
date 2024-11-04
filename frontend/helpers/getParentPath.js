export const getParentPath = () => {
    const pathArray = typeof window === 'undefined' ? '' : window.location.pathname.split('/');
    const parrentPath = pathArray[pathArray.length - 2];
    return parrentPath;
  };
