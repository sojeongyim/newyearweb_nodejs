var express = require('express');
var imageDataURI = require('image-data-uri');
var router = express.Router();
var fs = require('fs');
var multiparty = require('multiparty');
var mysql = require('mysql');
var dbconfig = require('./database.js') 
var connection = mysql.createConnection(dbconfig);

router.post('/upload', function(req, res) 
  {
    var form = new multiparty.Form({
      autoFiles: false, // 요청이 들어오면 파일을 자동으로 저장할 것인가
      uploadDir: 'temp/', // 파일이 저장되는 경로(프로젝트 내의 temp 폴더에 저장됩니다.)
      maxFilesSize: 1024 * 1024 * 10 // 허용 파일 사이즈 최대치
    });

    form.parse(req, function (error, fields, files) {
      // 파일 전송이 요청되면 이곳으로 온다.
      //         // 에러와 필드 정보, 파일 객체가 넘어온다.
     
    
    
    var path = files.fileInput[0].path;
      console.log('fileinput[0].path');
      console.log(path.split('/')[1]);
      res.send(path.split('/')[1]); // 파일과 예외 처리를 한 뒤 브라우저로 응답해준다.
  
    
    
     });
  }); 

router.post('/style', function(req, res)
  {
    var filename=req.body.filename;
    var stylenum=req.body.stylenum;

    connection.query('INSERT INTO image VALUES(?,?,?)',[filename,stylenum,0],function(err, rows, fields){
      if (!err){
        console.log('The solution is: ', rows);
        var answer={'result': 'ok'};
        res.json(answer);

      }
      else
        console.log('Error while performing Query.', err);
    });

  });

router.post('/result', function(req, res)
  {
    var dataURI=req.body.imgURL;
    var imgName=req.body.imgName;
    var filePath = './temp/final/' + imgName;

    imageDataURI.outputFile(dataURI, filePath).then(res => console.log(res));

    var answer={'result': 'ok'};
    res.json(answer);
  });

router.post('/delete', function(req, res, next)
  {
    var filename=req.body.filename;
    var filepath= './public/images/Result/';
    filepath = filepath + filename;
    console.log(filepath);

    fs.access(filepath, error => {
      if (!error) {
      console.log("It is in something");
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
