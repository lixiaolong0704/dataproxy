var express = require('express');
var router = express.Router();

var dbhelper = require("../app/utilities/dbhelper.js")
var async = require("async");


router.get('/login', function (req, res, next) {



    var _dbhelper = new dbhelper();
    _dbhelper.query("SELECT * FROM a_project", function (rows) {

        res.render('login', {projects:rows});
    });


});

router.post('/login', function (req, res, next) {



    var _dbhelper = new dbhelper();
    _dbhelper.query("SELECT * FROM u_user where name ='"+req.body.name+ "' and password ='"+req.body.password+"'", function (rows) {

        var rst={
            status:1
        }
        if(rows.length===0){
            rst.status=0;
        }
        res.json(rst);
    });


});
module.exports = router;
