var express = require('express');
var router = express.Router();

/* Frame Select Page */
router.get('/', function(req, res, next) {
  //console.log('asdfasdiadsfasd')
  var filename = req.params.filename;
  //console.log(filename)
  //console.log(req.params.title)
  console.log('##############################')
  console.log(req.body.filename);
  res.render('flower2Result', { title: 'Paintly', filename:filename});
});

/* For Sharing Page */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  console.log("878787*&*&");
  console.log(filename)
  res.render('flower2Result', { title: 'Paintly',id:id.split('.')[0]});
});


/* Download Purpose for Iphone */
router.get('/final/:filename',function(req,res,next){
  var filename = req.params.filename;
  res.render('flower2Result',{title: 'Paintly',filename:filename});
});

router.post('/',function(req,res,next){
  var resultemail=req.body.userEmail;
 connection.query('select * FROM image where useremail=? ORDER BY id DESC LIMIT 1',[resultemail],function(err, rows, fields){
      if (!err){
        console.log(rows[0].filename);
        var filename=row[0].filename;
        console.log("finded  db finished");
        res.render('flower2Result', {title:'Paintly',filename:filename})
      }
      else
        console.log('Error while performing Query.', err);
    });
});


module.exports = router;
