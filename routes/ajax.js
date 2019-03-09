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
var frame='';
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);


 
//var popupS = require('popups');
 
const extractFrames = require('ffmpeg-extract-frames')


/* Router for Ajax Communication */
/* Get DataURI(Images) and Save it to Serverside */
/*router.post('/filename', function(req,res,next)
  {
    filename2=req.body.filename;
    console.log("filename2"+filename2);
  }
);*/

router.post('/upload', function (req, res) {
  console.log("UPLOAD_IN")
    var form = new multiparty.Form({
        autoFiles: true, // 요청이 들어오면 파일을 자동으로 저장할 것인가
        uploadDir: 'public/images/Origin/', // 파일이 저장되는 경로(프로젝트 내의 temp 폴더에 저장됩니다.)
        maxFilesSize: 1024 * 1024 * 100 // 허용 파일 사이즈 최대치
    });
 
    form.parse(req, function (error, fields, files) {
        // 파일 전송이 요청되면 이곳으로 온다.
        // 에러와 필드 정보, 파일 객체가 넘어온다.
        //var path = files.fileInput[0].path;
        //console.log(files)
        //Object.keys(files).forEach(function(name) {
        //    console.log('got file named ' + name);
        //});
      //console.log(files)
      //console.log(fields.name)
      //console.log(files.image[0].path)
      path = files.image[0].path.split('/')[3]
      //
      //path = files['image']['originalFilename']
      //res.send(path)
      //console.log(path);
      //path = files.image.path
      console.log(path) 
      extractFrames({input: DirName+path,output: DirThumbs+path.split('.')[0]+'.jpg',offsets: [0]}) 
      //console.log(path);
      //res.send(files.name); // 파일과 예외 처리를 한 뒤 브라우저로 응답해준다.
        //console.log(fiels);
      res.send(path); // 파일과 예외 처리를 한 뒤 브라우저로 응답해준다.
    });
});

/*router.post('/upload', function(req, res, next) {
  form.on('field',function(name,value)
  {

    console.log('normal field / name = '+name+' , value = '+value);

  });

  form.on('part',function(part){
    if (part.filename) {
      filename = part.filename;
      filename = filename2;
      //size = part.byteCount;
      //videoFrameExtractor.extractFrame(filename, 1, 1, DirThumbs);
      console.log("here is ajax part, file name is"+filename);
    }else{
      part.resume();
    } 
    var writeStream = fs.createWriteStream(DirName+filename);
    part.pipe(writeStream);
    part.on('data',function(chunk){
        console.log(filename+' read '+chunk.length + 'bytes');
    });
    part.on('end',function(){
            console.log(filename+' Part read complete');
      writeStream.end(); 
      //console.log("extractframe1")
      extractFrames({input: DirName+filename,output: DirThumbs+filename.split('.')[0]+'.jpg',offsets: [0]}) 
      console.log("Extract First Frame")
    });

  }); //form on part end

  form.on('close',function()
  {
    //res.end("Uploaded");
    //res.status(200);
  });

  form.on('progress',function(byteRead,byteExpected)
  {
    // console.log(' Reading total  '+byteRead+'/'+byteExpected);
  });
// form.on("error", function (error) {
//    console.log("Error Object upload");
//  });
  form.parse(req);
});*/

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
    frame=req.body.frame;
    UN = req.body.UN;
    UE = req.body.UE;
    if (frame === undefined || frame === null) {
      frame='sul' 
    }
    var fileNameJpg=filename.split('.');
    status=1;
    console.log('^^^^^^^^^^^^^^')
    console.log(UN)
    console.log(UE)
    console.log("333333333333333")
    console.log(filename, stylenum,frame);
    console.log('%%%%%%%%%%%%%%%%')
    console.log(req.originalUrl)
    console.log(req.path)
    console.log('-----------------')
   connection.query('INSERT INTO image(filename, stylename,username,useremail,status,frame) VALUES(?,?,?,?,?,?)',[fileNameJpg[0]+'.jpg',stylenum,UN,UE,status,frame],function(err, rows, fields){
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
  frame=req.body.frame;
  UN = req.body.UN;
  UE = req.body.UE;
  console.log(frame+"videoDB");
  status=2;
  connection.query('INSERT INTO image(filename, stylename,username,useremail,status,frame) VALUES(?,?,?,?,?,?)',[filename,stylenum,UN,UE,status,frame],function(err, rows, fields){
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

router.get('/popup', function(req, res) {
    res.render('popup',{title:'Paintly'});
});

router.post('/findemail',function(req,res,next){
  var resultemail=req.body.userEmail;
  console.log('FINDEMAIL')
  console.log(resultemail)
  connection.query('select * FROM image where (status=4 and useremail=?) ORDER BY id DESC LIMIT 1',[resultemail],function(err, rows, fields){
      if (!err){
       var answer={'result': 'ok'};
       //res.json(answer);
        console.log(rows[0]);
        if (rows[0] === undefined || rows[0] === null) {
         res.redirect('popup')
          console.log("POPUP")
        }
        else{
          console.log("finded  db finished");


          if(rows[0].frame == 'flower2')
          {
            console.log("here is f2");
            res.render('flower2Result',{title:'Paintly',id:rows[0].filename.split('.')[0]})
          }
          else if(rows[0].frame=='flower')
          { console.log("here is f"); 
            res.render('flowerResult',{title:'Paintly',id:rows[0].filename.split('.')[0]})

          }
          else if(rows[0].frame=='sul'){
            console.log("here is sul");
            res.render('sularoidResult',{title:'Paintly',id:rows[0].filename.split('.')[0]})
          } 
          else if(rows[0].frame=='insta'){
            console.log("here is insta");
            res.render('instaResult',{title:'Paintly',id:rows[0].filename.split('.')[0]})
          }
          else{
            console.log("cannot get frame")}


        }
        //console.log(fields);
        //res.redirect("flower2Result");
        //res.render('flower2Result',{title:'Painlty'})
        //res.send(rows[0].filename)
        //console.log('adsfasd')
        //res.render('flower2Result?filename='+rows[0].filename)
        //res.render('main',{title:Paintly});
        //res.send({'useremail':rows[0]})
      }
      else
        console.log('Error while performing Query.', err);
    });
});



module.exports = router; 
