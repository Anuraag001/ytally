// UserResource.js
const AdminJS = require('adminjs');
const User = require('./models/userModels.js'); // Adjust the path accordingly

const userResources = {
  resource: User,
  options: {
    properties: {
      firstName: { isTitle: true },
      lastName: {},
      emailID: {},
      password: { isVisible: false },
    },
    actions: {
      // Customize actions if needed
    },
  },
}

export default userResources;
