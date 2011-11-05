/*
 * Poller
 * -----
 * A Superclass for shelby services that poll apis 
 * (twitter, facebook, tumblr)
 */

var EE2 = require('eventemitter2').EventEmitter2;

module.exports = {

  emitter : new EE2(),

  init : function(opts){
    console.log(opts);
    var self = this;
    Object.keys(opts).forEach(function(k){
      self[k] = opts[k];
    });
    self.initPolling();
  },

  loadUsers : function(cb){
    var self = this;
    if (self.users){
      return cb();
    }
    self.dao.getUserSet(function(e, users){
      self.users = users;
      return cb();
    });
  },

  initPolling : function(){
    var self = this;
    if (!self.do_polling){
      return;
    }
    self.loadUsers(function(){
      var interval = Math.round(self.freq / self.users.length);
      var current = 0;
      console.log('interval is', interval);

      var pollInterval = setInterval(function(){
        console.log('polling');
        self.poll(self.users[current]);
        if (!self.users[current+1]){
          clearInterval(pollInterval);
          self.initPolling();
        } else {
          current += 1;
        }
      }, interval);;
    });
  }

};
