var GoPro = require('goproh4');
var cam = new GoPro.Camera({
  mac: 'd6:d9:19:8f:26:77'
});
var request = require('request');
var fs = require('fs');
var getFile = function(callback){
  cam.listMedia().then(function(result){
    var lastDirectory = result.media[result.media.length - 1];
    var lastFile = lastDirectory.fs[lastDirectory.fs.length - 1];
    cam.getMedia(lastDirectory.d, lastFile.n, lastFile.n).then(function (filename) {
        console.log(filename, '[saved]');
        return callback(filename);
    });
  });
};

cam.mode(GoPro.Settings.Modes.Burst, GoPro.Settings.Submodes.Burst.Burst)
   .then(function(){
     return cam.set(GoPro.Settings.VIDEO_FPS, GoPro.Settings.VideoFPS.F60);
   })
   .then(function(){
     console.log('[video]', 'started');
     return cam.start();
   })
   .delay(3000)
   .then(function(error){
     if(!error){
       console.log('[video]', 'stop');
     } else {
       throw error;
     }
     return cam.stop();
   })
   .then(function(){
     var loop = setInterval(function(){
       cam.listMedia().then(function(result){
         if(result.id){
           clearInterval(loop);
           console.log('ready');
           getFile(function(imgname){
             var form = request.post('http://10.252.62.202:8000', function(err, resp, body){
               if(err){
                 throw err;
               } else {
                 console.log(body);
               }
             }).form();
             form.append('file',fs.createReadStream(imgname));
           });
         }
       });
     },3000);
   });
