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
    var self = this;
    Object.keys(opts).forEach(function(k){
      self[k] = opts[k];
    });
    self.initPolling();
  },

  addUser : function(uid, info, cb){ //no cb - faster
    var self = this;
    self.dao.addUserToSet(uid, function(){
      self.dao.setUserInfo(uid, info, function(){
        return cb();  
      });  
    }); 
  },

  backfillUser : function(uid){
    var self = this;
    self.poll(uid);
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

      self.pollInterval = setInterval(function(){
        //console.log(current, ' / ', self.users.length);
        self.poll(self.users[current]);
        if (!self.users[current+1]){
          self.stopPolling(); 
          self.signalFinished();
        } else {
          current += 1;
        }
      }, interval);;
    });
  },

  stopPolling : function(){
    clearInterval(this.pollInterval);
  },

  signalFinished : function(){
    process.stdout.write('poll:completed');
  }

};
