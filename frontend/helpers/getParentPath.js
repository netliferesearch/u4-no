export const getParentPath = () => {
    const pathArray = typeof window === 'undefined' ? [] : window.location.pathname.split('/');
    return pathArray.length > 1 ? pathArray[pathArray.length - 2] : '';
  };
