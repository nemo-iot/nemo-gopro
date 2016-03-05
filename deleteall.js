var GoPro = require('goproh4');
var cam = new GoPro.Camera({
  mac: 'd6:d9:19:8f:26:77'
});

cam.deleteAll().then(function(){
  console.log('cleared');
});
