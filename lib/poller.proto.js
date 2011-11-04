/*
 * Poller
 * -----
 * A Superclass for shelby services that poll apis 
 * (twitter, facebook, tumblr)
 */

module.exports = {

  bspool : require('beanstalk-node'),

  init : function(opts){
    var self = this;
    Object.keys(opts).forEach(function(k){
      self[k] = opts[k];
    });
    self.initPolling();
  },

  buildJob : function(job, cb){
    this.bspool.put(job, cb);
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
      setInterval(function(){
        self.poll(self.users[current]);
        if (!self.users[current+1]){
          current = 0;
        } else {
          current += 1;
        }
      }, interval);
    });
  }

};
