import Promise from 'promise';
import axios from 'axios';

import {resolver} from './proxy/proxy.resolver';
import {ajaxConfig} from './proxy/proxy.config';
// axios.defaults.withCredentials = true

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
var _rs = new resolver({
    preConfig: ajaxConfig
});

import $ from './utility/jquery.utility';

window.ajaxExt = function (opt) {


    // opt.url = "http://115.182.66.198:18818/" +opt.url;

    opt.url = HOST + opt.url;
    var p = new Promise((resolve, reject) => {
        // var deferred = $.Deferred()
        //opt=$.facadeAjaxOpt(opt);
        if (!opt.error) {
            opt.error = function (e) {
                //debug;
                //alert("请求异常，请稍后重试!");
                //$.log("ajax error");
                //$.hideLoading();
                reject();
            };
        }


        var tempAjax = (opt) => {
            //
            // opt.url ="http://localhost:3000/proxy/server/"+encodeURIComponent(opt.url);
            opt.method = "post";
            // return axios(opt);
            var proxyUrl = _rs.resolve(opt.url, opt.dataEx);
            if (proxyUrl) {
                if (window.console) {
                    //window.console.log(decodeURI(proxyUrl));
                }
                opt.url = encodeURI(proxyUrl);
            }
            return axios(opt);

        };

        var success = function (response) {

            //data= strDec(data.data,"123456789");
            //alert(data);
            //
            //
            // if (data.data && data.data.status === "1001") {
            //     //$.alert("请重新登陆",function(){
            //     //    window.location.href = '/login.jsp';
            //     //});
            //     reject();
            //     //
            //
            // } else if (data.code === 'ERR1001') { //{"desc":"网络访问超时","code":"ERR1001"}
            //     alert(data.desc);
            //
            // }
            // else {


            resolve(response.data.data);
            // }

        };


        if (opt.dataEx) {


            var js = opt.dataEx;
            var arr = [];
            for (var p in js) {
                arr.push(p);
            }

            function strcmp(a, b) {
                if (a.toString() < b.toString()) return -1;
                if (a.toString() > b.toString()) return 1;
                return 0;
            }

            arr = arr.sort(function (a, b) {
                return strcmp(a, b);
            })

            //console.log(arr);
            //var str =this.jsonToUrl(opt.dataEx);


            var isf = true;
            var str = "";
            for (var i = 0; i < arr.length; i++) {
                if (isf) {
                    isf = false;
                } else {
                    str += "&";
                }
                str += arr[i] + "=" + js[arr[i]];
            }


            str += "&key=" + "123456789";
            //console.log(str);
            var sign = hex_md5(str, "123456789");


            opt.transformRequest = [(data) => {
                // var a = [];
                // for (var p in data) {
                //     a.push(p + "=" + data[p]);
                // }
                // var b = a.join("&");
                // console.log(b);
                // return b;
                return $.param(data);

            }];

            opt.data = {
                sign: sign,
                data: str,
                platform: "web"
            }


        }
        opt.dataType = "json";
        opt.method = "post";

        console.log(opt.url);
        if (AJAX === 'WEXINBACKGROUND') {
            axios(opt).then(success);
        } else {
            tempAjax(opt).then(success);
        }
    });


    return p;
};

