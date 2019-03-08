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
var status=3;
var form = new multiparty.Form();
var DirName = '/root/web/paintly_newyear/public/images/Origin/'
 var filename='';
  var size;
  var status=3;
var temp='';
/* Router for Ajax Communication */
/* Get DataURI(Images) and Save it to Serverside */
router.post('/upload', function(req, res, next) {
  form.on('field',function(name,value){
    console.log('normal field / name = '+name+' , value = '+value);
  });

  form.on('part',function(part){
    if (part.filename) {
      filename = part.filename;
      //size = part.byteCount;
       temp=filename.split('.');
      
      filename=genFileName()+temp[temp.length-1];

    }else{
      part.resume();
    } 
    var writeStream = fs.createWriteStream(DirName+filename);
    part.pipe(writeStream);
    /*part.on('data',function(chunk){
                  console.log(filename+' read '+chunk.length + 'bytes');
                });*/
    part.on('end',function(){
      /*var query = "INSERT INTO video (filename, tstamp, style, uid, and_ios, status) VALUES ?";
                  var filename_arr = filename.split("__");
                  console.log(filename_arr);
                  loc_tmp = filename.indexOf(filename_arr[2]);
                  var values = [[filename, filename_arr[0], filename_arr[1], filename.slice(loc_tmp,loc_tmp+10), filename_arr[filename_arr.length-1].split('.')[0], 0]];
                  connection.query(query, [values], function(err, result){
                  if (err) throw err;
                  });*/
      
      console.log(filename+' Part read complete');
      writeStream.end().function(){setDB1(filename)};
    });

  }); //form on part end

  form.on('close',function()
  {
    // res.status(200).send('Upload complete');
  });

  form.on('progress',function(byteRead,byteExpected)
  {
    // console.log(' Reading total  '+byteRead+'/'+byteExpected);
  });

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
          //res.render('main',{title: 'Paintly'});
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
    var filePath = './public/images/Result/' + imgName;

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
