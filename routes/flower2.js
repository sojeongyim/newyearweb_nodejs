var express = require('express');
var router = express.Router();

/* Frame Select Page */
router.get('/:userName/:userEmail', function(req, res) {
  var UN = req.params.userName;
  var UE = req.params.userEmail;
  res.render('flower2', { title: 'Paintly', UN:UN,UE:UE});
});

/* For Sharing Page */
router.get('/:filename', function(req, res, next) {
  var filename = req.params.filename;
  //res.render('result', { title: 'Paintly',filename:filename});
});


/* Download Purpose for Iphone */
router.get('/final/:filename',function(req,res,next){
  var filename = req.params.filename;
  res.render('final',{title: 'Paintly',filename:filename});
});


module.exports = router;
