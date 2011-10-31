if (!process.env.NODE_ENV){
  console.error('Specify NODE_ENV');
  process.exit();
}

require('beanstalk-node');

module.exports = require('./lib/factory.js');
