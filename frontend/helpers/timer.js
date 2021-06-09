/**
 * Create a timer to time seconds it
 */
export const timer = title => {
  const start = new Date();
  return function timed() {
    const end = new Date();
    const diffInSeconds = (end.getTime() - start.getTime()) / 1000;
    console.log(`[${title}]: Took ${diffInSeconds} seconds to complete`);
  };
};
