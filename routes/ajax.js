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
/* Router for Ajax Communication */
/* Get DataURI(Images) and Save it to Serverside */
router.post('/upload', function(req, res) 
  {
    var dataURI=req.body.imgURL;
    var imgName=req.body.imgName;
    var filePath = './temp/' + imgName;

    imageDataURI.outputFile(dataURI, filePath).then(res => console.log(res));

    var answer={'result': 'ok'};
    res.json(answer);

  }); 

/* Get File name, Style num
  * insert Rows into Database (newyear.image)
  * so Python code can detect it */
router.post('/style', function(req, res)
  {
    var filename=req.body.filename;
    var stylenum=req.body.stylenum;
     var Name=req.body.userName;
    var Email=req.body.userEmail;

    connection.query('INSERT INTO image(filename, stylename,username,useremail) VALUES(?,?)',[filename,stylenum,dbname,dbemail],function(err, rows, fields){
      if (!err){
        var answer={'result': 'ok'};
        res.json(answer);
        res.render('main',{title: 'Paintly'});

      }
      else
        console.log('Error while performing Query.', err);
    });

  });
router.post('/user', function(req, res)
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
    res.render('main',{title:Paintly});
  });

/* Save Final (with Text) Result into Server
 * It's used for Kakao Image URL */
router.post('/result', function(req, res)
  {
    var dataURI=req.body.imgURL;
    var imgName=req.body.imgName;
    var filePath = './temp/final/' + imgName;

    imageDataURI.outputFile(dataURI, filePath).then(res => console.log(res));

    var answer={'result': 'ok'};
    res.json(answer);
  });

/* if User already have made result, 
 * it delete the previous results (prevents error) */
router.post('/delete', function(req, res, next)
  {
    var filename=req.body.filename;
    var filepath= './public/images/Result/';
    filepath = filepath + filename;

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
