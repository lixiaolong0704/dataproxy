var express = require('express');
var router = express.Router();

var dbhelper = require("../app/utilities/dbhelper.js")
var async = require("async");
/* GET home page. */
router.get('/', function (req, res, next) {
    //console.log(dbhelper);
    // var _dbhelper = new dbhelper();
    // _dbhelper.query("select * from a_tag", function (rows) {
    //     async.every(rows, function (row, callback) {
    //         _dbhelper = new dbhelper();
    //         _dbhelper.query("SELECT * FROM a_api a INNER JOIN api_tag_rel t ON a.id = t.api_id AND  t.tag_id = " + row.id, function (apis) {
    //
    //             //console.log(apis);
    //             row.apis = apis;
    //             callback(null, true);
    //
    //         });
    //         //fs.access(filePath, function(err) {
    //         //    callback(null, !err)
    //         //});
    //     }, function (err, result) {
    //         // if result is true then every file exists
    //         console.log(rows);
    //         res.render('index', {title: 'API系统', tags: rows});
    //     });
    //
    //
    // });
    console.log("....abc......");
    res.render('index', {nav_active :"home", title: '茉莉英语',categories:null});
});
router.post('/detail', function (req, res, next) {


    var result={};
    var execParams=function(api_id,callback){
        var _dbhelper = new dbhelper();
        _dbhelper.query("SELECT * FROM a_param_item  pa WHERE pa.`api_id` =" +api_id, function (params) {

            //console.log(apis);
            result.params=params;
            //console.log(result);
            callback();
        });
    }
    var execResult=function(api_id,callback){
        var _dbhelper = new dbhelper();
        _dbhelper.query("SELECT * FROM a_result  r WHERE r.`api_id` =" +api_id, function (results) {

            //console.log(apis);
            result.results=results;
            //console.log(result);
            callback();
        });
    }
    var execResultItem=function(api_id,callback){
        var _dbhelper = new dbhelper();
        _dbhelper.query("SELECT * FROM a_result_item  r WHERE r.`api_id` =" +api_id, function (results) {

            //console.log(apis);
            result.resultItems=results;
            //console.log(result);
            callback();
        });
    }

    async.applyEach([execParams,execResult,execResultItem], req.body.api_id, function(err){
        // if any of the saves produced an error, err would equal that error
        res.render('detail', result);
    });




});


router.post('/edittag', function (req, res, next) {


    if(req.body.tagid){
        _dbhelper = new dbhelper();
        _dbhelper.query("SELECT * FROM a_tag where where id=" + tagid, function (tags) {

            //console.log(apis);
            if(tags && tags.length>0){
                res.render('edittag',tags[0]);
            }
        });
    }else{
        res.render('edittag',{
            id:"",
            name:""
        });
    }
});

router.post('/saveTag', function (req, res, next) {

    var _dbhelper = new dbhelper();

    if(req.body.id){
        _dbhelper.query("update a_tag set name='"+ req.body.name +"' where id =" + req.body.id ,function(){
            console.log("修改成功！");
            res.json({status:1});
        });
    }else{
        delete req.body.id;
        _dbhelper.insert("a_tag",req.body,function(){
            console.log("新增成功！");
            res.json({status:1});
        });
    }
});


router.get('/wordcategories', function (req, res, next) {
    res.render('wordcategories', {title: 'word-categories'});
});
module.exports = router;
