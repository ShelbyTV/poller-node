var poller_factory = require('../index.js');
var bs_factory = require('beanstalk-node');

var sub = {

  graph : require('facebook-graph-node'),

  dao : require('redis-daos').build('facebook-poller'),

  newJob : function(job, delJob){
    console.log('new job called', job);
    delJob();
  },

  bsOpts : {
    "reserve_tube" : 'fb_add_user',
    "put_tube" : 'link_processing_high',
    "log_output" : true,
    "json_encoding" :true,
    "pool_size" : 50
  }

};

var opts = {
  set : ['1319125', '132222'],
  poll : true,
  freq : 5000,
};

var fb_poller = poller_factory.build(sub);

fb_poller.init(opts, function(){
  console.log('poller initted');
});
