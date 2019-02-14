var express = require('express');
var router = express.Router();


/* Frame Select Page */
router.get('/', function(req, res) {
  res.render('main', { title: 'Paintly'});
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

router.get('/survey',function(req,res,next){
  res.render('survey',{title: 'Paintly'});
});
module.exports = router;
