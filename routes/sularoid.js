var express = require('express');
var router = express.Router();

/* Frame Select Page */
/*router.get('/', function(req, res) {
  res.render('sularoid', { title: 'Paintly'});
});*/
router.get('/:UN/:UE', function(req, res) {
 var UN=req.params.UN;
  var UE=req.params.UE;
  res.render('sularoid', { title: 'Paintly', UN:UN, UE:UE});
});
/* For Sharing Page */
router.get('/:filename', function(req, res, next) {
  var filename = req.params.filename;
  res.render('result', { title: 'Paintly',filename:filename});
});


/* Download Purpose for Iphone */
router.get('/final/:filename',function(req,res,next){
  var filename = req.params.filename;
  res.render('final',{title: 'Paintly',filename:filename});
});


module.exports = router;
