var mysql = require('mysql');

function dbhelper() {
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '1234', //mac : 1234 windows:roots
        database: 'apidb'
    });

    return {

        update:function(tablename,ps,ck){
            connection.connect();
            //return;
            var str ="insert into " +tablename +"(id,";
            var isf=true;
            for(var p in ps){
                if(isf){
                    isf=false;
                }else{
                    str +=","
                }

                str += p;
            }
            str += ") values ( 0,";
            var isf=true;
            var ps_values =[];
            for(var p in ps){
                if(isf){
                    isf=false;
                }else{
                    str +=","
                }

                str += "?";
                ps_values.push(ps[p]);
            }
            str += ")";

            //console.log(ps_values);
            //console.log(str);
            connection.query(str,ps_values, function(err, result) {
                if (err) throw err;
                ck(result);
                connection.end();
            });
        },


        insert:function(tablename,ps,ck){
            connection.connect();
            //return;
            var str ="insert into " +tablename +"(id,";
            var isf=true;
            for(var p in ps){
                if(isf){
                    isf=false;
                }else{
                    str +=","
                }

                str += p;
            }

            str += ") values ( 0,";
            var isf=true;
            var ps_values =[];
            for(var p in ps){
                if(isf){
                    isf=false;
                }else{
                    str +=","
                }

                str += "?";
                ps_values.push(ps[p]);
            }
            str += ")";

            //console.log(ps_values);
            //console.log(str);
            connection.query(str,ps_values, function(err, result) {
                if (err) throw err;
                ck(result);
                connection.end();
            });
        },
        query:function(sql,ck){
            console.log(sql);
            connection.connect();
            connection.query(sql , function(err,  rows, fields) {
                if (err) throw err;
                 ck(rows,fields);
                connection.end();
            });
        }


    }


}
module.exports=dbhelper;