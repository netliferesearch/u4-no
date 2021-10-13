export const getPdfUrl = url => {
  const returnedUrl = Array.isArray(url) ? url.toString() : url;
  return returnedUrl;
};
