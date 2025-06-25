export default {
  pdfURLPrefix: import.meta.env.VITE_PDF_URL || 'http://localhost/pdf/',
  // TODO: Cache some query instead of hardcoding year extents here:
  minYear: 1900,
  maxYear: 2016,
};
