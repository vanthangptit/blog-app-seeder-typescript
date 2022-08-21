const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@configs': path.resolve(__dirname, 'src/configs'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@apis': path.resolve(__dirname, 'src/apis'),
      '@hooks': path.resolve(__dirname, 'src/hooks')
    },
  },
};
