const path = require('path');

module.exports = function configureBabel() {
  return {
    plugins: [['transform-define', path.join(__dirname, './env-config.js')]],
    presets: [
      [
        'env',
        {
          targets: {
            browsers: ['last 2 versions', 'ie >= 10'],
          },
          debug: false,
        },
      ],
      'next/babel',
    ],
  };
};
