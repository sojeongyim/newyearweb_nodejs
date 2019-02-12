var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs');

router.post('/', function(req, res, next) 
{
 var dir_name = './public/images/Origin/';
 var form = new multiparty.Form();
 var filename;  

  form.on('part',function(part){
    var size;

    if (part.filename) {
      filename = Math.floor(new Date().getTime() / 1000)+".jpg";
      size = part.byteCount;
    }else{
      part.resume();
    }    

    console.log("Write Streaming file :"+filename);
    var writeStream = fs.createWriteStream(dir_name+filename);
    writeStream.filename = filename;
    part.pipe(writeStream);
    part.on('data',function(chunk){
      console.log(filename+' read '+chunk.length + 'bytes');
    });
    part.on('end',function(){
      console.log(filename+' Part read complete');
      writeStream.end();
      console.log(req.session);
      req.session.filename=filename;
      console.log('session filename: '+req.session.filename);
      //console.log('session: '+req.session);  //왜 이러면 출력안되는지 원인좀//:[object object]
    });
  });

  form.on('close',function(){
    res.render('sularoid',{title: 'Upload',uploadfile: filename});
    });

  form.on('progress',function(byteRead,byteExpected){
    console.log(' Reading total  '+byteRead+'/'+byteExpected);
  });

  form.parse(req);


}); 

module.exports = router; 
