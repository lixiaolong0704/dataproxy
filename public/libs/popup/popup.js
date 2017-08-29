//* 依赖
//JQuery.js 
//<script type="text/javascript" src='/40/js/jsrender.min.js'></script>
// new popup($.getTmpContent("#popup_fail", opt));
//tmp : html片段  data. 
//模板使用的时候最外边的容器要加上popup2

$.popupWindow = window;
$.popupContext = $.popupWindow.document;//document
//$.popupContext=window.parent.document;
//$.popupWindow=window.parent;

function popupElement(tmp) {


}


function popup(tmp, opt) {

    //alert(opt.maskClass);
    var _t = this;
    _t.options = $.extend(
        {
            events:{

            },
            height:null,//625
            width:null,
            autoReplacePopup3:true,
            onclose: function () {
            },
            onload: function () {
            },
            // context: $.popupContext
            window: $.popupWindow,
            isShowMask: true,
            maskClass: ""
        },

        opt);
    if(_t.options.autoReplacePopup3){
        tmp = tmp.replace("popup3", "popup2");
    }

    _t.options.context = _t.options.window.document;
    //使用jsrender.js渲染模板

    //if (data) {

    //    var template = $.templates("#"+$(this).attr("id"));
    //    var out = template.render(data);
    //    $("#popup-main").html(out);
    //} else {

    _t.show = function () {
        var $popupmain = $("#popup-main", _t.options.context);
        if ($popupmain.length === 0) {
            $popupmain = $('<div id="popup-main"></div>');
            $popupmain.prependTo($("body", _t.options.context));
        }
        $popupmain.html(tmp);
        //if($popupmain.hasClass("popup3")){
        //    $popupmain.addClass("popup2");
        //}
        _t.$popupmain = $popupmain;
        _t.$popupcontent = $('.popup-content', _t.options.context);


        if (_t.options.isShowMask) {
            var $maskLayer = $(".maskLayer", _t.options.context);
            if ($maskLayer.length !== 0) {
                $maskLayer.remove();
            }

            $maskLayer = $("<div class='maskLayer' style='display:none;position: absolute;'></div>");
            $maskLayer.prependTo($("body", _t.options.context));

        }
        if (_t.options.isShowMask) {
            //alert(_t.options.maskClass);
            if (_t.options.maskClass) {
                //alert(_t.options.maskClass);
                $maskLayer.addClass(_t.options.maskClass);
            }
        }

        var $popup = $(".popup2", _t.options.context);



        //$popup

        bindEvents($popup,_t.options);






        var $window = $(_t.options.window);
        var hd=null;
        var popupHeight =_t.options.height?_t.options.height: $popup.height();
        var popupWidth =_t.options.width?_t.options.width: $popup.width();
        //alert(popupWidth);
        var setPosition = function () {

            //clearTimeout(hd);
            //hd=setTimeout(function(){

                $popup.css("position", "fixed");

                //alert($popup.height());
                if (_t.options.window.self != _t.options.window.top) {   //内层弹出层. iframe中

                    $popup.css("top", 30);
                } else {                         //外层弹出层
                    $popup.css("top", ($window.height() / 2) - (popupHeight/ 2));
                }
                $popup.css("left", ($window.width() / 2) - ( popupWidth/ 2));
            //},100)




        }
        _t.reset = function () {
            setPosition();
            if (_t.options.isShowMask) {
                $maskLayer.width($window.width());
                $maskLayer.height($window.height() + $window.scrollTop());
            }
        };
        $window.scroll(function () {
            _t.reset();
        });

        $window.resize(function () {

            setPosition();
            if (_t.options.isShowMask) {
                $maskLayer.width($window.width());
                $maskLayer.height($window.height() + $window.scrollTop());
            }
        });

        if (_t.options.isShowMask) {
            $maskLayer.width($window.width());

            $maskLayer.height($window.height() + $window.scrollTop());
            //$maskLayer.height($(document).height());
            //alert($(document).height() + "==" + $(window).height());
            $maskLayer.show();
        }

        setPosition();
        $popup.show();

        //_t.$popup2 = $popup;


        _t.close = function (ps) {
            unbindEvents($popup,_t.options);
            $window.unbind("scroll");
            $window.unbind("resize");
            $popup.remove();
            if (_t.options.isShowMask) {
                $maskLayer.remove();
            }
            if (_t.options.onclose) {
                _t.options.onclose(ps);
            }

        }
        $(".popup-close", _t.options.context).click(function () {
            _t.close();
        });

        if (_t.options.onload) {
            //popup, content
            _t.options.onload($popup, _t.$popupcontent);
        }
        _t.$popup = $popup;
        _t.$content = _t.$popupcontent;
    };
    _t.show();
    return this;
}
var $window = null;
$.showLoading = function () {

    function creatLoading() {
        $('<div class="loading-shade-white laoding-shade"></div>').appendTo($("body"));
        $('<div class="loading-img" style="position: fixed;left:50%;top:50%;"><img src="/image/common/loading_bg.gif"></div>').appendTo($("body"));

    }

    if ($('.laoding-shade').length === 0 || $('.loading-img').length === 0) {
        creatLoading();
    }
    $window = $(window);
    $window.scroll(function () {
        $('.laoding-shade').height($window.height() + $window.scrollTop());
    })
    $window.resize(function () {
        $('.laoding-shade').height($window.height() + $window.scrollTop());
    })
    $('.laoding-shade').show();
    $('.loading-img').show();
}
$.hideLoading = function () {
    $window.unbind("scroll");
    $window.unbind("resize");
    $('.laoding-shade').hide();
    $('.loading-img').hide();
}


$.toast = function (text, secs, ck) {
    if (!secs) {
        secs = 300;
    }

    var p = new popup($.getTmpContent("#tmp-alert", {text: text}), {
        isShowMask: false,
        onclose: function () {
            if (ck) {
               ck();
            }
        },
        onload: function ($popup) {
            //var $ok = $popup.find(".ok");
            //$ok.focus();
            //$ok.click(function () {
            //
            //});
        }
    })

    setTimeout(function () {
        p.close();
    }, secs);
}

$.alert = function (text, ck) {

    var p = new popup($.getTmpContent("#tmp-alert", {text: text}), {
        onclose: function () {
            if (ck) {
                ck();
            }
        },
        onload: function ($popup) {
            var $ok = $popup.find(".ok");
            $ok.focus();
            $ok.click(function () {
                p.close();
            });
        }
    })

}

$.confirm = function (opt) {
    opt = $.extend({
        text: "",
        title: "",
        ok: null
    }, opt)

    var p = new popup($.getTmpContent("#tmp-confirm", opt), {
        onclose: function () {

        },
        onload: function ($popup) {
            $popup.find(".ok").click(function () {
                if (opt.ok) {
                    opt.ok();
                }
                p.close();
            });
            $popup.find(".cancel").click(function () {

                p.close();
            });
        }
    })

}
