var ajaxConfig = {};

ajaxConfig["微信闪购"] = {

    "wxConfig": [
        {
            //"result":"-default"
            "result": "-成功"
            //"result": "-soldout"
        }
    ],

    "shopInfo": [
        {
            "result": "-成功"
        }
    ],
    "salesorder.interfacecode=queryCommdityOnlineByUid": [

        {
            //"result":"-default"
            "result": "-成功"
            //"result": "-soldout"
        }
    ],
    "countAvailable.interfacecode=abc": [

        {
            //"result":"-default"
            "result": "-成功"
            //"result": "-soldout"
        }
    ],


    "usermanager.interfacecode=SendSMSAuthenCode":[
        {
            "result": "-成功"
        }
    ],
    "usermanager.interfacecode=saveUserBindings":[
        {
            "result": "-成功"
        }
    ],
    "usermanager.interfacecode=vxqueryUserInfo":[
        {
            "result": "-成功"
        }
    ],
    "flashpay.interfacecode=flashPurchasePayOrderInStore":[
        {
            "result": "-成功"
        }
    ],
    "searchCoupon": [
        {
            "result": "-成功"
        }
    ],
    "salesorder.interfacecode=querySales_order_info":[
        // {
        //     "result": "-成功&2"
        //     // "result": "-空&2"
        // }
        {
            "result": "-成功"
            // "result": "-空"
        },    {
            "result": "-最后一页&2"
            // "result": "-空"
        }
    ]
};



module.exports={
    ajaxConfig
}

// ajaxConfig = [];
