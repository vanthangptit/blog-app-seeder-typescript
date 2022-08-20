
const devConfig = {};

const stagingConfig = {};

const prodConfig = {};

const masterConfig = process.env.REACT_APP_ENV === 'production' ? prodConfig : process.env.REACT_APP_ENV === 'staging' ? stagingConfig : devConfig;

export default {
  ...masterConfig
};
