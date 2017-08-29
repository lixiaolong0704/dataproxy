function index(){

    var _t={
        $main:$("#main"),
        init:function(){

            _t.regApiEdit();
            _t.regAddTag();
        },
        regApiEdit:function(){
            $(".api").click(function(){

                $.ajax({
                    url:"/detail",
                    dataType:"text",
                    type:"post",
                    data:{
                        api_id:1
                    }

                }).then(function(rst){

                    _t.$main.html(rst);
                    _t.$main.find(".jsonbody").each(function(){
                        var options = {
                            mode: 'tree',
                            modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
                            onError: function (err) {
                                alert(err.toString());
                            },
                            onModeChange: function (newMode, oldMode) {
                                console.log('Mode switched from', oldMode, 'to', newMode);
                            }
                        };
                        var editor = new JSONEditor($(this).get(0), options, JSON.parse($(this).attr("body")));



                    });


                });
                //alert($(this).attr("api-id"));

            });
        },
        regAddTag:function(){
            $("#addtag").click(function(){
                $.ajax({
                    url:"/edittag",
                    dataType:"text",
                    type:"post",
                    data:{
                        api_id:1
                    }
                }).then(function(rst){

                    _t.popup = new popup(rst, {
                        onclose: function () {

                        },
                        events:{
                            "click .save":"save"
                        },
                        onload: function ($popup, $content) {

                            var _t=this;
                            _t.$form = $content.find("#form");


                        },
                        save:function(){


                            var _t=this;
                            var ps=_t.$form.serializeObject();
                            $.ajax({
                                url:"/saveTag",
                                dataType:"json",
                                type:"post",
                                data:ps
                            }).then(function(rst){

                                if(rst.status===1){
                                    alert("成功！");
                                }


                            });
                        }
                    });


                });

            });

        }

    };



    return _t;


}


$(function(){
    var _idx =new index();
    _idx.init();
});