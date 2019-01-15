var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('./database.js') 
var connection = mysql.createConnection(dbconfig);

router.get('/:stylenum', function(req, res, next) 
{
  var filename;
  var stylenum;

if(!req.session.filename){
res.send('please upload your image first.');
}else{

  filename= req.session.filename;
  stylenum = req.params.stylenum;
  //connection.connect();

  connection.query('INSERT INTO image VALUES(?,?,?)',[filename,stylenum,0],function(err, rows, fields){
  if (!err){
    console.log('The solution is: ', rows);
    res.render('main',{title: 'Progressing',uploadfile:filename,stylename:stylenum});
  }
  else
        console.log('Error while performing Query.', err);
  });

  //connection.end();

}


 }); 

module.exports = router; 
