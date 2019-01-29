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
    var dataURI=req.body.imgURL;
    var imgName=req.body.imgName;
    var filePath = './temp/' + imgName;
    console.log(filePath);

    imageDataURI.outputFile(dataURI, filePath).then(res => console.log(res));

    var answer={'result': 'ok'};
    res.json(answer);

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
