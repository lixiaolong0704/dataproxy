var r20 = /%20/g,
    rbracket = /\[\]$/,
    rCRLF = /\r?\n/g,
    rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
    rselectTextarea = /^(?:select|textarea)/i;
jQuery.fn.extend({
    serialize: function() {
        return jQuery.param( this.serializeArray() );
    },
    serializeArray: function() {
        return this.map(function(){
                return this.elements ? jQuery.makeArray( this.elements ) : this;
            })
            .filter(function(){
                return this.name && !this.disabled &&
                    ( this.checked || rselectTextarea.test( this.nodeName ) ||
                    rinput.test( this.type ) );
            })
            .map(function( i, elem ){
                var val = jQuery( this ).val();

                return val == null ?
                    null :
                    jQuery.isArray( val ) ?
                        jQuery.map( val, function( val, i ){
                            return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
                        }) :
                    { name: elem.name,encodeURI:jQuery( this ).attr("encodeURI"), value: val.replace( rCRLF, "\r\n" ) };
            }).get();
    }
});



/**
 * 序列化Form表单为JSON data  input上加属性 encodeURI="true"可以自动encoding
 * @param enableIgnore
 * @returns {{}}
 */
$.fn.serializeObject = function (opt) {
    var o = {};
    var a = this.serializeArray();
    //console.log(a);
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            var v = this.encodeURI==="true"? encodeURI(this.value):this.value;
            o[this.name].push(v || '');
        } else {
            var v = this.encodeURI==="true"? encodeURI(this.value):this.value;
            o[this.name] = v|| '';
        }
    });

    $(this).find("select[name]").each(function () {
        var name = $(this).attr("name");

        o[name] = $(this).find("option:selected").val();


    });


    if (opt && opt.enableIgnore) {
        //如果值和默认值一样，则修改为空，意思是后台跟进空不做修改
        $("input[ignore-value]").each(function () {

            if ($(this).val() === $(this).attr("ignore-value")) {
                o[$(this).attr("name")] = "";
            }
        });
    }

    return o;
};

$.fn.valofselect = function () {
    return $(this).find("option:selected").val();
}

$.fn.renderMonths = function () {

    for (var i = 1; i <= 12; i++) {
        $(this).append("<option>" + i + "</option>");
    }
};
$.fn.renderYears = function () {

    for (var i = 2010; i <= 2025; i++) {
        $(this).append("<option>" + i + "</option>");
    }
};

//单机按钮时候禁用状态
$.fn.startProgress = function (noChangeClass) {
    $.log("startprogress");
    $(this).attr("disabled", true);
    if (!noChangeClass) {
        $(this).addClass("u-btn-c4");
    }
};
//长时间的操作结束以后启用状态
$.fn.stopProgress = function (noChangeClass) {
    $.log("stopprogress");
    $(this).attr("disabled", false);
    if (!noChangeClass) {
        $(this).removeClass("u-btn-c4");
    }
}


Utility = {
    getUrlParams: function () {
        var match,
            pl = /\+/g,  // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) {
                return decodeURIComponent(s.replace(pl, " "));
            },
            query = window.location.search.substring(1);

        urlParams = {};
        while (match = search.exec(query))
            urlParams[decode(match[1])] = decode(match[2]);

        return urlParams;
    },
    //得到带*的手机号
    getMaskPhoneNumber: function (phoneNumber) {

        return phoneNumber.substring(0, 3) + "****" + phoneNumber.substring(7, 11);

    },
    //得到银行卡后x位
    getBankCardLast: function (bankcardno) {
        return bankcardno.substring(bankcardno.length - 4, bankcardno.length);
    },
    //得到带*的银行卡号
    getMaskBankCard: function (bankcardno) {

        return bankcardno.substring(0, 4) + "****" + bankcardno.substring(8, 20);
    },

    //assert(versionCompare("1.7.1", "1.7.10") < 0);
    //assert(versionCompare("1.7.2", "1.7.10") < 0);
    //assert(versionCompare("1.6.1", "1.7.10") < 0);
    //assert(versionCompare("1.6.20", "1.7.10") < 0);
    //assert(versionCompare("1.7.1", "1.7.10") < 0);
    //assert(versionCompare("1.7", "1.7.0") < 0);
    //assert(versionCompare("1.7", "1.8.0") < 0);
    //
    //assert(versionCompare("1.7.2", "1.7.10b", {lexicographical: true}) > 0);
    //assert(versionCompare("1.7.10", "1.7.1") > 0);
    //assert(versionCompare("1.7.10", "1.6.1") > 0);
    //assert(versionCompare("1.7.10", "1.6.20") > 0);
    //assert(versionCompare("1.7.0", "1.7") > 0);
    //assert(versionCompare("1.8.0", "1.7") > 0);
    //
    //assert(versionCompare("1.7.10", "1.7.10") === 0);
    //assert(versionCompare("1.7", "1.7") === 0);
    //assert(versionCompare("1.7", "1.7.0", {zeroExtend: true}) === 0);
    //
    //assert(isNaN(versionCompare("1.7", "1..7")));
    //assert(isNaN(versionCompare("1.7", "Bad")));
    //assert(isNaN(versionCompare("1..7", "1.7")));
    //assert(isNaN(versionCompare("Bad", "1.7")));
    /**
     * v1 大于v2 则 返回 >0 v1 小于v2 返回 <0 其他等于0
     * @param v1
     * @param v2
     * @param options
     * @returns {*}
     */
    versionCompare: function (v1, v2, options) {
        var lexicographical = options && options.lexicographical,
            zeroExtend = options && options.zeroExtend,
            v1parts = v1.split('.'),
            v2parts = v2.split('.');

        function isValidPart(x) {
            return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
        }

        if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
            return NaN;
        }

        if (zeroExtend) {
            while (v1parts.length < v2parts.length) v1parts.push("0");
            while (v2parts.length < v1parts.length) v2parts.push("0");
        }

        if (!lexicographical) {
            v1parts = v1parts.map(Number);
            v2parts = v2parts.map(Number);
        }

        for (var i = 0; i < v1parts.length; ++i) {
            if (v2parts.length == i) {
                return 1;
            }

            if (v1parts[i] == v2parts[i]) {
                continue;
            }
            else if (v1parts[i] > v2parts[i]) {
                return 1;
            }
            else {
                return -1;
            }
        }

        if (v1parts.length != v2parts.length) {
            return -1;
        }

        return 0;
    }


}


//window.isLog = true;
//window.isProxyAjax = true;
$.extend({
    log: function (txt) {


        if ($.isLog && window.console) {
            console.log(txt);
        }

    },
    dir: function (ojb) {
        if ($.isLog && window.console && console.dir) {
            console.dir(ojb);
        }
    },
    resetProxyConfig: function (key) {
        if (window.ajaxConfig && window.ajaxConfig[key]) {
            $.each(window.ajaxConfig[key], function (i, item) {
                item.execTimes = null;
            });

        }
    },
    facadeAjaxOpt: function (opt) {

    },
    /**
     * 此方法对Ajax默认方法进行了封装，可以实现动态切换真实后台数据和模拟JSON数据的切换
     * @param opt  ajax option
     * @returns {*}
     */
    ajaxExt: function (opt) {

        $.showLoading();
        var deferred = $.Deferred()
        //opt=$.facadeAjaxOpt(opt);
        if (!opt.error) {
            opt.error = function (e) {
                //debug;
                alert(JSON.stringify(e));
                alert("请求异常，请稍后重试!");
                $.log("ajax error");
                $.hideLoading();
                deferred.reject();
            };
        }

        //{"filter":"ajaxrelogin"}

        var tsuccess = opt.success;

        opt.success = function (data) {
            $.hideLoading();
            //data= strDec(data.data,"123456789");
            //alert(data);
            if (data.data && data.data.status === "1") {
                alert("请重新登陆");
                deferred.reject();
                window.location.href = '/login.jsp';

            } else if (data.code === 'ERR1001') { //{"desc":"网络访问超时","code":"ERR1001"}
                alert(data.desc);

            }
            else {

                //var js =JSON.parse(data);
                //console.log(js);
                //tsuccess(js);
                if (tsuccess) {
                    tsuccess(data.data);
                }

                deferred.resolve(data.data);
            }

        };


        if ($.isProxyAjax) {

            return $.tempAjax(opt);
        } else {

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

                opt.data = {
                    sign: sign,
                    data: str,
                    platform: "web"
                }


            }
            opt.dataType = "json";
            opt.type = "post";


            $.ajax(opt);

            //return $.ajax(opt);

            return deferred;
        }
    },
    jsonToUrl: function (json) {
        var arr = [];
        for (var name in json) {
            arr.push(name + '=' + json[name]);
        }
        return arr.join('&');
    },
    getTmpContent: function (selector, data) {
        var template = $.templates(selector
        );
        var out = template.render(data ? data : {});
        return out;
    },

    jsRender: function (selector, data) {
        var $el = $(selector);
        var html = $.getTmpContent(selector, data);
        $el.html(html);
    },
    //保留两位小数    
    //功能：将浮点数四舍五入，取小数点后2位
    toDecimal: function (x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return;

        }
        f = Math.round(x * 100) / 100;
        return f;

    },
    /**
     * 制保留2位小数，如：2，会在2后面补上00.即2.00
     * @param x
     * @returns {*}
     */
    toDecimal2: function (x) {

        var f = parseFloat(x);
        if (isNaN(f)) {
            return false;
        }
        var f = Math.round(x * 100) / 100;

        var s = f.toString();

        var rs = s.indexOf('.');

        if (rs < 0) {
            rs = s.length;

            s += '.';
        }

        while (s.length <= rs + 2) {
            s += '0';

        }
        return s;
    },

    ResultResolver: function (serverErrorEls, filedErrorName) {

    },
    setTopiframeHeight: function (exheight) {

//            alert("zz"+ document.body.scrollHeight);
//            alert( document.body.scrollHeight);
        var iObj = top.document.getElementById("portal30_right");

        if (iObj && iObj.style) {
            //          alert( document.body.scrollHeight);
            iObj.style.height = 0;
            iObj.style.height = (document.body.scrollHeight + exheight) + "px";
            //alert(iObj.style.height);
            //alert( document.body.scrollHeight);
            // $("#portal30_right",window.parent).css("height","2500px");
        }

    },
    commonResultResolver: function (opt) {
        //result,
        //validator
        //serverErrorEls
        // ck success
        // ck  fielderror
        var result = opt.result;

        if (result.code === "0") {
            _t.loopOrderStatus(result.tradesno);
        } else if ($.inArray(result.FieldErrorName, opt.serverErrorEls)) {
            var t = {};
            t[result.FieldErrorName] = result.desc;
            opt.validator.showErrors(t);
        } else if (result.code === 'XD1001') { //外部错误
            _t.renderChargefail(result);
        } else {
            _t.renderPopupChargingFail(result);
        }
        // (result.code === 'ERR1002') {  //由于您兑换卡信息验证错误次数过多

    },


    getArrayItem: function (arr, cmp) {
        var selItem = null;
        $.each(arr, function (i, item) {
            if (cmp(item)) {
                selItem = item;
            }
        });
        return selItem;
    },
    HARDWARE_DOWM_HREF: "", //安全控件下载链接
    /**
     * 检测是否安装了安全控件，如果没有安装则提供下载链接 ,使用之前，需要在JSP页面上部添加下边的语句
     * $.HARDWARE_DOWM_HREF= '<%=ConfigUtil.getValue("HARDWARE_DOWM_HREF")%>';
     * @param pwdObj  密码控件的原生Object对象
     * @param random  JSP页面后台传入的Ramdom
     * @returns {boolean}
     */
    checkPasswordControl: function (pwdObj, random) {
        //var safepasswordObject = $("#safepasswordObject")[0];
        try {
            pwdObj.SetRandomData('01', random);//设置随机数
            $.log("checkPasswordControl:true");
            return true;
        } catch (e) {
            $.showInstallSafeControl(pwdObj);
            $.log("checkPasswordControl:false");
            //$.log(JSON.stringify(e));
            return false;
        }

    },
    /**
     * 通过判断调用SetRandomData 等方法是否有exception来判断提示
     * @param pwdObj 密码控件的原生Object对象
     */
    showInstallSafeControl: function (pwdObj) {
        $.log("showInstallSafeControl");
        var $ctlcontainer = $(pwdObj).parent();
        $(pwdObj).remove();
        var $a = $('<a   style="background-color:#E3E3E3;text-decoration:none; width:162px;text-align: center; color:black;  display: inline-block;height:30px;line-height:30px;"  href="' + $.HARDWARE_DOWM_HREF + '">请点此处安装控件</a>');
        $a.appendTo($ctlcontainer);
    },
    Tmp: function (url, data, ck) {

        var deferred = $.Deferred()
        $.ajax({
            url: url,
            type: "post",
            cache: false,
            dataType: 'text',
            success: function (tmp) {
                //"/40/pages/identify/updateIdentify.html"
                //alert(url.lastIndexOf('/'));

                var arr = tmp.split("$$");
                //$.templates("tmp", tmp);
                $.templates("tmp", arr[0]);
                var out = $.templates.tmp(data);
                if (ck) {
                    if (arr.length > 1) {
                        $.each(arr, function (i, kk) {
                            if (i != 0)
                                out += kk;
                        })
                    }

                    ck(out);
                    deferred.resolve();
                }
            },
            error: function () {

                deferred.reject();
            }

        });
        return deferred;

    }

});


$.fn.saveForm = function () {
    $(this).find("input,select").each(function () {
        if(this.tagName.toLowerCase()==="input"){
            $(this).attr("saved-value", $(this).val());
        }else{
            var v=$(this).find("option:selected").val();
            $(this).attr("saved-value", v);
        }

    })
}
$.fn.recoverForm = function () {
    $(this).find("input,select").each(function () {
        if(this.tagName.toLowerCase()==="input") {
            $(this).val($(this).attr("saved-value"));
        }else{
            var sv=$(this).attr("saved-value");
            $(this).val(sv);
        }
    })
}

if(jQuery.validator){
    jQuery.validator.setDefaults({
        errorPlacement: function (error, element) {
            //error.appendTo(element.prev());
            //error.addClass("error");
            var $ctls = element.closest(".controls");

            var errorholder = $ctls.attr("error-holder");


            if (errorholder) {
                var $errorHolder = $ctls.find("." + errorholder);
                //if(!$errorHolder.text()){
                $errorHolder.append(error);
                //}

            } else {
                $ctls.append(error);
            }

            //element.closest(".controls").append('<span class="help-inline">22222</span>')
            //  <span class="help-inline"></span>
            //  <span class="help-block">Woohoo!</span>
        }
    });
}



$.fn.tableVali=function(){
    var $t=$(this);
    $t.on("keydown", ".check-decimal,.check-number", function (e) {
        //console.log("input keydown!");
        if(e.type==="keydown" && e.which ===13){ //相当于 按enter键
            $(this).blur();
            //return false;
        }
        //console.log( e.type + ": " +  e.which );

    });

    $t.on("focus", ".check-decimal", function () {
        if($.valis.isDecimal($(this).val())){
            $(this).attr("v-val",$(this).val());
        }


    });
    $t.on("blur", ".check-decimal", function () {
        var _tt=this;
        if(!$.valis.isDecimal($(this).val())){
            $(this).val($(this).attr("v-val"));
            $.alert("金额格式不正确",function(){
                $(_tt).focus();

            });
            return false;
        }

    });
    $t.on("focus", ".check-number", function () {
        if($.valis.isNumber($(this).val())){
            $(this).attr("v-val",$(this).val());
        }


    });
    $t.on("blur", ".check-number", function () {
        //console.log("check--blur");
        var _tt=this;
        if(!$.valis.isNumber($(this).val())){
            $(this).val($(this).attr("v-val"));
            $.alert("数字格式不正确",function(){
                $(_tt).focus();

            });$
            return false;
        }


    });



}
$.fn.disableSelection = function () {
    return this.each(function () {
        if (typeof this.onselectstart != 'undefined') {
            this.onselectstart = function() { return false; };
        } else if (typeof this.style.MozUserSelect != 'undefined') {
            this.style.MozUserSelect = 'none';
        } else {
            this.onmousedown = function() { return false; };
        }
    });
};


function insertText(obj,str) {

    if (document.selection) {


        var sel = document.selection.createRange();
        //console.log(sel);
        //console.log("m1"+sel.text );
        sel.text = str;

        //obj.focus();

        //var sel = obj.createTextRange();

        //sel.moveStart('character',str.length);

        sel.collapse();

        sel.select();
        //moveEnd(obj);
        //sel.moveEnd("character",str.length);

    } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        //console.log("m2");
        var startPos = obj.selectionStart,

            endPos = obj.selectionEnd,

            cursorPos = startPos,

            tmpStr = obj.value;

        obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);

        cursorPos += str.length;

        obj.selectionStart = obj.selectionEnd = cursorPos;

    } else {
        //console.log("m3");
        obj.value += str;

    }

}

function moveEnd(obj){

    obj.focus();

    var len = obj.value.length;

    if (document.selection) {

        var sel = obj.createTextRange();

        sel.moveStart('character',len);

        sel.collapse();

        sel.select();

    } else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {

        obj.selectionStart = obj.selectionEnd = len;

    }


}


//$.views.converters("memo", function (v) {
//
//    return getShortForm(v, 12, '...');
//});





//$.views.converters("fullname", function(first, last) {
//    var reverse = this.tagCtx.props.reverse;
//    if (reverse) {
//        return last.toUpperCase() + " " + first;
//    }
//    return first + " " + last;
//});
//... {{fullname:first last}}
//... {{fullname:first last reverse=true}}
