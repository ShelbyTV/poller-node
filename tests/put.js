var poller_factory = require('../index.js');

var sub = {

  graph : require('facebook-graph-node'),

  dao : require('redis-daos').build('facebook-poller'),

  newJob : function(){
    console.log('got new job');
  },

  poll : function(uid){
    console.log('polling for '+uid);
  }

};

var opts = {
  //users : ['1319125', '132222'],
  do_polling : false,
  freq : 5000, //every five seconds
  beanstalk_opts : {
    resTube : 'fb_add_user',
    putTube : 'link_processing',
    pool_size : 200
  }
};

var fb_poller = poller_factory.build(sub);

var sample_job = {
  "key" : "val"
};

fb_poller.init(opts, function(){
  fb_poller.buildJob(sample_job, function(){
    console.log('job built cb');
  });
});
