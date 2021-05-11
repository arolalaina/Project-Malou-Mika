var express = require('express')
var router = express.Router()
var request = require('request');
let myToken = 'Kc2FeFu16PShyRyO42O-BqmMUxfNOsN5JxHeDMG9YCU';

router.get('/:criteria_date', function(req, res, next) {
    var criteria_date = req.params.criteria_date;
    request({
        headers: {
            'Authorization': 'Bearer '+myToken 
          },
      uri: 'https://api.producthunt.com/v1/posts?day='+criteria_date,
    }).pipe(res);
  });

  router.get('/v1/:criteria_date', function(req, res, next) {
    var criteria_date = req.params.criteria_date;
    request({
        headers: {
            'Authorization': 'Bearer '+myToken 
          },
      uri: 'https://api.producthunt.com/v1/posts/all?sort_by='+criteria_date+'created_at&order=asc=',
    }).pipe(res);
  });

  

module.exports = router