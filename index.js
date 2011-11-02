if (!process.env.NODE_ENV){
  console.error('Specify NODE_ENV');
  process.exit();
}

var factory = require('factory-node');
var super = require('./lib/poller.proto.js');

module.exports = {

  build : function(sub){
    return factory.build(super, sub);
  }

};
