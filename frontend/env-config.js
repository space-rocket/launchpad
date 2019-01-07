let apiUrl;

if (process.env.ENV === 'production') {
  apiUrl = process.env.PRODUCTION_BACKEND_URL;
} else if (process.env.ENV === 'staging') {
  apiUrl = process.env.STAGING_BACKEND_URL;
} else if (process.env.ENV === 'development') {
  apiUrl = process.env.LOCALHOST_BACKEND_URL;
} else {
  apiUrl = 'http://localhost:4000';
}

module.exports = {
  'process.env.API_URL': apiUrl,
}