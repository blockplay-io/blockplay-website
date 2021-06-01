const withPWA = require("next-pwa");

module.exports = withPWA({
  env: {
    REACT_APP_PROD_DOMAIN: "https://blockplay.io/",
  },
  future: {
    webpack5: true,
  },
});
