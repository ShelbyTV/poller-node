if (!process.env.NODE_ENV){
  console.error('Specify NODE_ENV');
  process.exit();
}

var factory = require('factory-node');
var _super = require('./lib/poller.proto.js');

module.exports = {

  build : function(sub){
    return factory.build(_super, sub);
  }

};
