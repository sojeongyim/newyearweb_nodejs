var express = require('express');
var imageDataURI = require('image-data-uri');
var router = express.Router();
var fs = require('fs');
var multiparty = require('multiparty');
var mysql = require('mysql');
var dbconfig = require('./database.js') 
var connection = mysql.createConnection(dbconfig);
var dbname='';
var dbemail='';
var originPath='./public/images/Origin/'
var filename='';
var size;
var status='';
var form = new multiparty.Form();
var DirName = '/root/web/paintly_newyear/public/images/Origin/'
var DirThumbs = '/root/web/paintly_newyear/public/images/thumbs/'
var filename='';
var filename2='';
var size;
var temp='';
var stylenum='';
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);


const extractFrames = require('ffmpeg-extract-frames')


/* Router for Ajax Communication */
/* Get DataURI(Images) and Save it to Serverside */
router.post('/filename', function(req,res,next)
  {
    filename2=req.body.filename;
    console.log("filename2"+filename2);
  }
);
  
router.post('/upload', function(req, res, next) {
  var count = 0;
  var form = new multiparty.Form();
   
  // Errors may be emitted
  // Note that if you are listening to 'part' events, the same error may be
  // emitted from the `form` and the `part`.
  form.on('error', function(err) {
    console.log('Error parsing form: ' + err.stack);
  });
   
  // Parts are emitted when parsing the form
  form.on('part', function(part) {
    // You *must* act on the part by reading it
    // NOTE: if you want to ignore it, just call "part.resume()"
   
    if (!part.filename) {
      // filename is not defined when this is a field and not a file
      console.log('got field named ' + part.name);
      // ignore field's content
      part.resume();
    }
   
    if (part.filename) {
      // filename is defined when this is a file
      console.log('got file named ' + part.name);
      // ignore file's content here
      part.resume();
    }
   
    part.on('error', function(err) {
      // decide what to do
    });
  });
   
  // Close emitted after form parsed
  form.on('close', function() {
    console.log('Upload completed!');
    res.setHeader('text/plain');
    res.end();
  });
   
  // Parse req
  form.parse(req);


});


function genFileName() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i <24; i++)
  {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

function setDB1(filename){
      connection.query('INSERT INTO image(filename,username,useremail,status) VALUES(?,?,?,?)',[filename,dbname,dbemail,status],
        function(err, rows, fields){
        if (!err){
          //var answer={'result': 'ok'};
          //res.json(answer);
          res.render('main',{title: 'Paintly'});
          console.log('db ok');
        }
        else
          console.log('Error while performing Query.', err);
      });
    }

module.exports = router;


/*router.post('/upload', function(req, res) 
  {

    var form=new multiparty.Form();
    //var imgName=req.body.imgName;
    var imgName='';
    form.on('field', function(name, value){
      console.log(name +' + '+  value);
    });
    var filePath = './public/images/Origin/' + imgName;
console.log('BBB');
   // imageDataURI.outputFile(filePath).then(res => console.log(res));
console.log('CCC');
    var answer={'result': 'ok'};
    res.json(answer);

form.on('part',function(part){
  console.log('cd');
 var filename = part.filename;
console.log('AAAA');
var writeStream=fs.createWriteStream(originPath+filename); 
writeStream.filename=filename;
part.pipe(writeStream);
part.on('data',function(chunk){});
part.on('end', function(){
writeStream.end();
console.log("save video in Origin!");
});
});




  });*/



/* Get File name, Style num
  * insert Rows into Database (newyear.image)
  * so Python code can detect it */
router.post('/style', function(req, res)
  {
    var filename=req.body.filename;
     stylenum=req.body.stylenum;

    var fileNameJpg=filename.split('.');
    status=1;
    console.log(filename, stylenum);

   connection.query('INSERT INTO image(filename, stylename,username,useremail,status) VALUES(?,?,?,?,?)',[fileNameJpg[0]+'.jpg',stylenum,dbname,dbemail,status],function(err, rows, fields){
      if (!err){
       var answer={'result': 'ok'};
       //res.json(answer);
        res.render('main',{title: 'Paintly'});
        console.log("db finished");
      }
      else
        console.log('Error while performing Query.', err);
    });
console.log("db finished");

    //res.json({'result':'ok'})

  });
router.post('/videoDB', function(req,res){
var filename=req.body.filename;
status=2;
 connection.query('INSERT INTO image(filename, stylename,username,useremail,status) VALUES(?,?,?,?,?)',[filename,stylenum,dbname,dbemail,status],function(err, rows, fields){
      if (!err){
       var answer={'result': 'ok'};
       //res.json(answer);
       res.render('main',{title: 'Paintly'});
        console.log("video db finished");
      }
      else
        console.log('Error while performing Query.', err);
    });
console.log("video db finished");
//  res.json({'result':'ok'})


});

router.post('/user', function(req, res,next)
  {
    var name=req.body.userName;
    var email=req.body.userEmail;
    dbname=name;
    dbemail=email;
    var answer={'result':'ok'};
    console.log("here is ajax");
    console.log(dbname);
    console.log(dbemail);
    console.log("end ajax user");
    res.json(answer);
    //res.render('main',{title:Paintly});
  });

/* Save Final (with Text) Result into Server
 * It's used for Kakao Image URL */
router.post('/result', function(req, res)
  {
    var dataURI=req.body.imgURL;
    var imgName=req.body.imgName;
    //var filePath = './public/images/Result/' + imgName;
    //console.log("WHAT IS WRONG WITH YOU????")
    //imageDataURI.outputFile(dataURI, filePath).then(res => console.log(res));

    var answer={'result': 'ok'};
    res.json(answer);
  });

/* if User already have made result, 
 * it delete the previous results (prevents error) */
router.post('/delete', function(req, res, next)
  {
    var filename=req.body.filename;
    console.log(filename)
    var filepath= './public/images/ResultImage/'+filename.split('.')[0]+'.jpg';
    //filepath = filepath + filename;

    fs.access(filepath, error => {
      if (!error) {
        fs.unlink(filepath,function(error){
          console.log(error);
        });
      } else {
        console.log(error);
      }
    });
    
    var answer={'result': 'ok'};
    res.json(answer);
  });

module.exports = router; 
