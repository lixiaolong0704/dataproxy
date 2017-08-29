window.wx={
    scanQRCode:(opt)=>{

        // alert("微信插件：代理扫描完成！")
        if(opt.scanType[0] == "barCode"){

            // alert("...");
            opt.success({
                errMsg:"scanQRCode:ok",
                // resultStr:"232abcc3,232323"
                resultStr:"232abcc3,6901236340288"
            });
        }else{
            opt.success({
                // resultStr:"A10000029"
                resultStr:"A10000550"
            });
        }

    },
    config(){

    },
    ready(ck){
        ck();
    }

}

window.pay=function(ps,ck){
    ck && ck();
}