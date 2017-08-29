function login(){

    var _t={
        $main:$("#main"),
        init:function(){

            var $form = $("#form");



            $("#btn-login").click(function(){

                var ps= $form.serializeObject();

                console.log(ps);


                $.ajax({
                    url:"/auth/login",
                    dataType:"json",
                    type:"post",
                    data:ps
                }).then(function(rst){

                    if(rst.status===1){
                        //alert("成功！");
                        window.location.href="/";
                    }else{
                        alert("账号密码不正确!");
                    }


                });

                return false;

            });




        }

    };



    return _t;


}


$(function(){
    var _idx =new login();
    _idx.init();
});