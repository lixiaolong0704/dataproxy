"use strict"
var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
var _ = require('underscore');
// const { console } = require('console');
var Mock = require('mockjs')
router.get('/', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    console.log("eee");
    res.send("hello");

});
router.all('/server/:url', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Token");
  
    // console.log(".......................********************");
    // console.log(req.body);
    var url = decodeURIComponent(req.params.url);
    var mm=req.method;

    // var xx = Object.assign({
    //     a:mm
    // })
    // console.log(".......................********************");

    // let am ="";


    // if(mm==="GET"){
    //     am ="GET";
    // }
    // console.log(am);
    // else if(mm==="POST"){
    //     am ="POST";
    // }else if(mm==="OPTIONS"){
    //     am ="OPTIONS";
    // }else if(mm==="DELETE"){
    //     am ="DELETE";
    // }else if(mm ==="PUT"){
    //     am ="PUT";
    // }else {
    //     am ="HEAD";
    // }

    if(mm ==="OPTIONS"){
        res.send("");
        return;
    }
 
    var abc={
        uri:url,
        form: req.body,
        method:mm,
        // method:req.method.toUpperCase()+"",
        headers: {
            'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzaWduaW5fdGltZSI6MTUwNDU5NzI0ODA0MywidWlkIjoiNTlhZGZlZjA5OWNiZDYwZGEwZGMwZjBkIiwiaXNzIjoiZGF0YWRlY2siLCJpYXQiOjE1MDQ1OTcyNDgsInRpZCI6IjU5YWRmZWYwOTljYmQ2MGRhMGRjMGYwYyJ9.muy-rbCJpKpFjqx2dycdzAptpgA_BpS888wjG1WCyIg'
        }
    };
    // console.log(url+"**"+mm+"**"+abc.method);
    request(abc, function (err, response, body) {

        // 
        // console.log();
        if(body){
            // console.log(body);
            try{
                res.json(JSON.parse(body));
            }catch(e){
                console.log("response json format error");
                res.send("");
            }
        }else{
            console.log("response null");
            res.send("");
        }
     
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


var RE_BLOCKS = new RegExp([
    /\/(\*)[^*]*\*+(?:[^*\/][^*]*\*+)*\//.source,           // $1: multi-line comment
    /\/(\/)[^\n]*$/.source,                                 // $2 single-line comment
    /"(?:[^"\\]*|\\[\S\s])*"|'(?:[^'\\]*|\\[\S\s])*'/.source, // - string, don't care about embedded eols
    /(?:[$\w\)\]]|\+\+|--)\s*\/(?![*\/])/.source,           // - division operator
    /\/(?=[^*\/])[^[/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[/\\]*)*?\/[gim]*/.source
].join('|'),                                            // - regex
'gm'  // note: global+multiline with replace() need test
);

// remove comments, keep other blocks
function stripComments(str) {
return str.replace(RE_BLOCKS, function (match, mlc, slc) {
    return mlc ? ' ' :         // multiline comment (replace with space)
        slc ? '' :          // single/multiline comment
            match;              // divisor, regex, or string, return as-is
});
}


//
//alert(a);

console.log("start .......");
/* GET users listing. */
router.all('/static/:folder/:filename/:postParamsNameFileName*?', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Token");


    //var f ='E:/work/19EStore/WebRoot/src/data/'+req.params.folder +"/"+req.params.filename+".json";
    if (req.params.postParamsNameFileName) {
        // console.log("参数配置:" + req.params.postParamsNameFileName);
    } else {
        // console.log("参数配置:无");
    }

    var exec = function () {
        var delay = 0, f;
        var arr = req.params.filename.split("&");
        if (arr.length === 1) {
            f = './data/' + req.params.folder + "/" +  decodeURIComponent(req.params.filename) + ".json";
        } else {
            f = './data/' + req.params.folder + "/" + decodeURIComponent(arr[0]) + ".json";
            delay = parseInt(arr[1]);
        }

        // console.log(f);
        //var f ='E:/work/19EStore/WebRoot/src/data/'+req.params.folder +"/"+req.params.filename+".json";

        fs.readFile(f, 'utf8', function (err, data) {
            if (err) {
                console.log(err)
            } else {

                setTimeout(function () {
                    // console.log("File.........");
                    // console.log(data);
                    // var st = data.replace(reg, "");
                    // console.log(st);
                    var result = JSON.parse((stripComments(data)));
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

        var f = './data/' + req.params.folder + "/" +req.params.postParamsNameFileName+ ".json";

        // console.log(f);
        fs.readFile(f, 'utf8', function (err, data) {
            if (err) {
                
                // console.log("error data...");
                console.log(err)
            } else {



                // console.log("find data...");
                try{
                // var st = data.replace(reg, "");

                // console.log(st);
                var paramsConfig = JSON.parse(data);
                }catch(e){
                    res.json(
                        {
                            "data":"proxy_error",
                            "desc":desc,
                            "sign": "b834f1b60d1e7760fdb20fe90ec8a785"
                        });
                }


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
