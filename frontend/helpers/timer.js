/**
 * Create a timer to time seconds it
 */
export const timer = title => {
  if (process.env.NODE_ENV === 'production') {
    // no loisy logging
    return () => {};
  }
  const start = new Date();
  return function timed() {
    const end = new Date();
    const diffInSeconds = (end.getTime() - start.getTime()) / 1000;
    console.log(`[${title}]: Took ${diffInSeconds} seconds to complete`);
  };
};
