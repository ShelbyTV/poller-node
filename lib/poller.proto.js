/*
 * Poller
 * -----
 * A Superclass for shelby services that poll apis 
 * (twitter, facebook, tumblr)
 *
 */

module.exports = {

  init : function(opts, cb){
    var self = this;
    this.users = opts.set ? opts.set : undefined;
    this.initBeanstalk(function(){
      if (opts.poll){
        self.initPolling(opts);
      }
      cb();
    });
  },

  initBeanstalk : function(cb){
    var self = this;
    this.bsPool = this.BSFactory.build(this.bsOpts);
    this.bsPool.reserve_callback = self.newJob;
    this.bsPool.init(function(){
      cb();
    });
  },

  loadUsers : function(cb){
    var self = this;
    self.dao.getUserSet(function(e, users){
      self.users = users;
      return cb();
    });
  },

  initPolling : function(opts){
    var self = this;
    if (!self.users){
      return self.loadUsers(function(){
        self.initPolling(opts);
      });
    }
    var freq = Math.round(opts.freq / self.users.length);
    var current = 0;
    setInterval(function(){
      self.poll(self.users[current]);

      if (!self.users[current+1]){
        current = 0;
      } else {
        current += 1;
      }

    }, freq);
  },

  poll: function(uid){
    console.log('polling for', uid);
  }

};
