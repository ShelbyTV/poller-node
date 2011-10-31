/*
 * Poller Factory
 */

var Poller = require('./poller.proto.js');
var BSFactory = require('beanstalk-node');

module.exports = {

  _addSubClass : function(super, sub){
    Object.keys(sub).forEach(function(k){
      super[k] = sub[k];  
    });
    return super;
  },

  build : function(sub){
    var super = Object.create(Poller);
    super.BSFactory = BSFactory;
    return this._addSubClass(super, sub);
  }

};
