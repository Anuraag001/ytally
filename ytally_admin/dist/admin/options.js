// options.js
import componentLoader from './component-loader.js';
import User from './models/userModels.js';

const options = {
  componentLoader,
  rootPath: '/admin',
  resources: [User],
  databases: [],
};

export default options;
