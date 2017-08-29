var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
var _ = require('underscore');

var Mock = require('mockjs')
router.get('/', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    console.log("eee");
    res.send("hello");

});
router.post('/server/:url', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    console.log(".......................");
    console.log(req.body);
    var url = decodeURIComponent(req.params.url);
    console.log(url)

    request.post(url, {
        form: req.body
    }, function (err, response, body) {

        console.log(body);
        console.log();
        res.json(JSON.parse(body));
    });


});


var comment = function () {
    return new RegExp('(?:' + comment.line().source + ')|(?:' + comment.block().source + ')', 'g');
};

comment.line = function () {
    return /(?:^|\s)\/\/(.+?)$/g;
};

comment.block = function () {
    return /\/\*([\S\s]*?)\*\//g;
};


var reg = /(\/\/(.+))|(\/\*([\S\s]*?)\*\/)/g

var a = "abc//222".replace(reg, "");
//
//alert(a);


/* GET users listing. */
router.post('/static/:folder/:filename/:postParamsNameFileName*?', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');


    //var f ='E:/work/19EStore/WebRoot/src/data/'+req.params.folder +"/"+req.params.filename+".json";
    if (req.params.postParamsNameFileName) {
        console.log("参数配置:" + req.params.postParamsNameFileName);
    } else {
        console.log("参数配置:无");
    }

    var exec = function () {
        var delay = 0, f;
        var arr = req.params.filename.split("&");
        if (arr.length === 1) {
            f = './data/' + req.params.folder + "/" + req.params.filename + ".json";
        } else {
            f = './data/' + req.params.folder + "/" + arr[0] + ".json";
            delay = parseInt(arr[1]);
        }

        //var f ='E:/work/19EStore/WebRoot/src/data/'+req.params.folder +"/"+req.params.filename+".json";
        //console.log(f);
        fs.readFile(f, 'utf8', function (err, data) {
            if (err) {
                console.log(err)
            } else {

                setTimeout(function () {

                    var st = data.replace(reg, "");
                    var result = JSON.parse(st);
                    //console.log(result);
                    res.json(Mock.mock(result));


                    //Mock.mock(
                }, delay * 1000);

            }


        });
    };

    if (!req.params.postParamsNameFileName) {
        exec();

    } else {
        var f = './data/' + req.params.folder + "/" + req.params.postParamsNameFileName + ".json";

        fs.readFile(f, 'utf8', function (err, data) {
            if (err) {
                console.log(err)
            } else {


                var st = data.replace(reg, "");

                // console.log(st);
                var paramsConfig = JSON.parse(st);


                //console.log(req.body.data);

                var ps = {};
                if (req.body.data) {
                    var maps = req.body.data.split("&");
                    _.each(maps, function (item) {

                        var a = item.split("=");
                        ps[a[0]] = a[1];
                    });
                }

                var isOk = true;
                var desc="";
                for (var p in paramsConfig) {

                    if (paramsConfig[p] !== "@optional") {



                        //console.log();

                        if (ps.hasOwnProperty(p)) {

                        } else {
                            console.log("缺少参数:" + p)
                            desc += "缺少参数:" + p+"\n";
                            isOk = false;
                        }


                    }

                }

                //console.log(paramsConfig);
                if (isOk) {
                    exec();
                } else {
                    res.json(
                        {
                            "data":"proxy_error",
                            "desc":desc,
                            "sign": "b834f1b60d1e7760fdb20fe90ec8a785"
                        });
                }


            }


        });

    }


});


module.exports = router;
