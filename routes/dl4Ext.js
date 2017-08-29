var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');


router.post('/server/:url', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    console.log(".......................");
    console.log(req.body);
    console.log("........................")
    request.post(req.params.url, {
        form: req.body
    }, function (err, response, body) {

        console.log(body);
        console.log();
        res.json(JSON.parse(body));
    });


});