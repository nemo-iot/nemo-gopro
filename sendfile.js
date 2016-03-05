var request = require('request');
var fs = require('fs');

var form = request.post('http://posttestserver.com/post.php', function(err,res,body){
  if(err){
    throw err;
  } else {
    console.log(body);
  }
}).form();

form.append('file',fs.createReadStream('wireshark.pcapng'));
