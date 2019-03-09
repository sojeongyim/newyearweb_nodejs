var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('./database.js');
var connection = mysql.createConnection(dbconfig);
var dbname='';
var dbemail='';

/* Frame Select Page */
router.get('/', function(req, res) {
  res.render('dbemail', { title: 'Paintly'});
});

/* For Sharing Page */
router.get('/:filename', function(req, res, next) {
  var filename = req.params.filename;
  res.render('result', { title: 'Paintly',filename:filename});
});

router.post('/',function(req,res,next){
  var resultemail=req.body.userEmail;
 connection.query('select * FROM image where useremail=? ORDER BY id DESC LIMIT 1',[resultemail],function(err, rows, fields){
      if (!err){
        console.log(rows[0].filename);
        var filename=rows[0].filename;
        console.log("finded  db finished");
        res.render('flower2Result', {filename:filename});
      }
      else
        console.log('Error while performing Query.', err);
    });
});


/* Download Purpose for Iphone */
router.get('/final/:filename',function(req,res,next){
  var filename = req.params.filename;
  res.render('final',{title: 'Paintly',filename:filename});
});


module.exports = router;
