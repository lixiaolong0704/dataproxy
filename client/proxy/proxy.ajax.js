/**
 * Created by sunleibo on 2016/1/16.
 */

//document.write('<script src="/src/js/proxy.config.js?x="' + Math.random() + '  type="text/Javascript"><' + '/script>')
//document.write('<script src="/src/js/proxy.resolver.js?x="' + Math.random() + '  type="text/Javascript"><' + '/script>')

import  ajaxConfig from './proxy.config';
var _rs = new resolver({
    preConfig: ajaxConfig
});

var tempa = $.ajaxExt;
$.ajaxExt = function (opt) {
    // opt.crossDomain = true;
    //var goToAjax = function () {
    //
    //
    //
    //    opt.cache = false;
    //    var nUrl = getallmodulesconfigedUrl(opt.url,opt.dataEx);
    //
    //    if (!nUrl) {
    //        //opt.url = '/WebService.asmx/GetServer?u=' + encodeURI(opt.url);
    //    } else {
    //
    //        var z = nUrl.prefix + nUrl.currentFilename + nUrl.end;
    //        //var t  = opt.m?("-"+ opt.data[opt.m]):"";
    //        //if(t){
    //        //    var aa = nUrl.currentFilename.split("-");
    //        //    nUrl.currentFilename  =aa[0]+t+"-" +aa[1];
    //        //}
    //        if(nUrl.currentFilename.indexOf("proxy")>=0){
    //            opt.url = 'http://localhost:3000/proxy/server/'+encodeURIComponent(opt.url);
    //            console.log("走代理");
    //        }else{
    //            opt.url = 'http://localhost:3000/proxy/static/' + nUrl.dir + '/' + nUrl.currentFilename;
    //        }
    //
    //    }

    if (window.console) {
        //window.console.log(opt.dataEx);
    }
    var proxyUrl = _rs.resolve(opt.url, opt.dataEx);
    if (proxyUrl) {
        if (window.console) {
            //window.console.log(decodeURI(proxyUrl));
        }
        opt.url = encodeURI(proxyUrl);
    }
    console.log(opt.url);
    return tempa(opt);

};


