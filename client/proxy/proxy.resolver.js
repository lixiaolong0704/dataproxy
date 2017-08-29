window.$$Cached = false;

import _ from 'underscore';
function interfaceEl(opt) {

    opt = _.extend({
        name: "",
        params: "",
        module: "",
        //************/
        results: []
    }, opt);


    var _t = this;

    _t.execIndex = 0;
    _.extend(_t, opt);

    if ($$Cached && window.localStorage) {
        _t.savedKey = "proxy-" + JSON.stringify(opt);
        var savedExec = window.localStorage.getItem(_t.savedKey);
        if (savedExec) {
            _t.execIndex = parseInt(savedExec);
        } else {
            window.localStorage.setItem(_t.savedKey, _t.execIndex);
        }

    }


    _.extend(this, {


        matchRequest: function (url, params) {
            var urlModel = getUrlkey(url);

            var flag = true;
            if (opt.name !== urlModel.filename) {
                flag = false;
            }

            //opt.params 为JSON key value对象

            for (var p in opt.params) {
                if (opt.params[p]) {
                    if (opt.params[p] !== params[p]) {
                        flag = false;
                    }

                }

            }

            //console.log(urlModel.filename);
            return flag;
        },


        exec: function () {
            if (_t.execIndex >= opt.results.length) {
                _t.execIndex = 0;
            }
            var result = null;
            result = opt.results[_t.execIndex].exec();
            _t.execIndex++;


            if ($$Cached) {
                window.localStorage.setItem(_t.savedKey, _t.execIndex);

            }
            //console.log();
            return result;
        }
    });


}

function resultEl(opt) {

    opt = _.extend({
        //************/

        interfaceEl: null,
        //preResult:null,
        //nextResult:null,
        name: ""
        //times:1
    }, opt);
    var _t = this;
    _.extend(_t, opt);
    return {
        exec: function () {

            //console.log(_t.name);
            return _t;


        }
    }


}

// http://192.168.21.200:8080//wx/wxConfig.do?url=http%3A%2F%2F192.168.21.200%3A8080%2Fdev%2F%3Fopenid%3D232323
function getUrlkey(url) {


    var trueURI="";
    if(url.indexOf("?")>=0){
        trueURI = url.substring(0,url.indexOf("?"));
    }else{
        trueURI =url;
    }

    var dotIndex=trueURI.lastIndexOf('.');

    var filename = url.substring(url.lastIndexOf('/') + 1, dotIndex);
    var prefix = url.substring(0, url.lastIndexOf('/') + 1);
    var end = url.substring(dotIndex, url.length);

    return {
        filename: filename,
        prefix: prefix,
        end: end
    };

}
function resolver(opt) {

    opt = _.extend({

        preConfig: null

    }, opt);


    var config = [];
    for (var moduleName in opt.preConfig) {
        var _el = opt.preConfig[moduleName];
        for (var elProp in _el) {
            //elProp  格式 -manager.interfacecode=queryRefundOrderInfoById&abc=23

            var arr = elProp.split(".");
            var params = null;
            if (arr[1]) {
                params = {};
                var subarr = arr[1].split("&");
                for (var i = 0; i < subarr.length; i++) {
                    var ps = subarr[i].split("=");
                    params[ps[0]] = ps[1];
                }

            }
            //results :[
            //    //        {
            //    //            "result": "-仅退款步骤2",
            //    //            "times": 2
            //    //        },
            //    //        {
            //    //            "result": "-仅退款步骤3",
            //    //            "times": 1
            //    //        }
            //    //    ]


            var results = [];

            var _interfaceEl = new interfaceEl({
                module: moduleName,
                name: arr[0],   // url 的key部分
                params: params, //JSON { interfacecode:'abc'}
                results: results

            });
            for (var i = 0; i < _el[elProp].length; i++) {
                var times = _el[elProp][i].times ? parseInt(_el[elProp][i].times) : 1;
                for (var j = 0; j < times; j++) {

                    results.push(new resultEl({
                        interfaceEl: _interfaceEl,
                        name: _el[elProp][i].result,
                        postParamsName: _el[elProp][i].params
                        //times:_el[elProp][i].times
                    }))
                }

            }
            //_el[elProp]
            config.push(_interfaceEl);

        }


    }
    //console.log(config);
    //var config =
    return {


        _createProxyUrl: function (moduleName, fileName, postParamsNameFileName) {
            //return 'http://localhost:3000/proxy/static/' + moduleName + '/' + fileName+"";
            //console.log(fileName + "-" + postParamsNameFileName);
            if (postParamsNameFileName) {
                return 'http://192.168.21.200:3000/proxy/static/' + moduleName + '/' + fileName + "/" + postParamsNameFileName;
            } else {
                return 'http://192.168.21.200:3000/proxy/static/' + moduleName + '/' + fileName;
            }
        },


        //ajaxConfig["供货商系统退货单"] = {
        //    "-manager.interfacecode=queryRefundOrderInfoById": [
        //        {
        //            "result": "-仅退款步骤2",
        //            "times": 1
        //        },
        //        {
        //            "result": "-仅退款步骤3",
        //            "times": 1
        //        }
        //    ],
        //    "-manager.interfacecode=updateRefundOrderInfoStateById": [
        //
        //        {
        //
        //
        //            "result": "拒绝退货"
        //            //"flag": "-拒绝退货"
        //        }
        //    ]
        //};
        ///refundordermanager/manager.do
        //interfacecode: "queryRefundOrderInfoById",
        resolve: function (url, params) {

            var _t = this;
            for (var i = 0; i < config.length; i++) {
                if (config[i].matchRequest(url, params)) {
                    var result = config[i].exec();
                    var fileName = "";
                    fileName += result.interfaceEl.name;

                    for (var p in result.interfaceEl.params) {
                        fileName += "-";
                        fileName += result.interfaceEl.params[p];

                    }

                    var postParamsNameFileName = "";
                    if (result.postParamsName) {
                        postParamsNameFileName = fileName + result.postParamsName;
                    }
                    fileName += result.name;


                    return _t._createProxyUrl(result.interfaceEl.module, fileName, postParamsNameFileName);
                }

            }

            return null;

            //console.log(urlModel.filename);
            //manager -


        }
    }


}

module.exports={
    resolver
}
//var _rs = new resolver({
//    preConfig: ajaxConfig
//});
//_rs.resolve("refundordermanager/manager.do", {
//    interfacecode: "queryRefundOrderInfoById",
//    abc: "2"
//})
//_rs.resolve("refundordermanager/manager.do", {
//    interfacecode: "queryRefundOrderInfoById",
//    abc:"2"
//})
//_rs.resolve("refundordermanager/manager.do", {
//    interfacecode: "queryRefundOrderInfoById",
//    abc:"3"
//})
//_rs.resolve("refundordermanager/manager.do", {
//    interfacecode: "queryRefundOrderInfoById",
//    abc:"4"
//})

