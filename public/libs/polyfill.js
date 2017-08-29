if (typeof Object.create != 'function') {
    Object.create = (function (undefined) {
        var Temp = function () {
        };
        return function (prototype, propertiesObject) {
            if (prototype !== Object(prototype)) {
                throw TypeError(
                    'Argument must be an object, or null'
                );
            }
            Temp.prototype = prototype || {};
            var result = new Temp();
            Temp.prototype = null;
            if (propertiesObject !== undefined) {
                Object.defineProperties(result, propertiesObject);
            }

            // to imitate the case of Object.create(null)
            if (prototype === null) {
                result.__proto__ = null;
            }
            return result;
        };
    })();
}
if (typeof Object.assign != 'function') {
    Object.assign = function (target, varArgs) { // .length of function is 2
        'use strict';
        if (target == null) { // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];

            if (nextSource != null) { // Skip over if undefined or null
                for (var nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    };
}
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== 'function') {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {
            },
            fBound = function () {
                return fToBind.apply(this instanceof fNOP
                        ? this
                        : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        if (this.prototype) {
            // Function.prototype doesn't have a prototype property
            fNOP.prototype = this.prototype;
        }
        fBound.prototype = new fNOP();

        return fBound;
    };
}
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}
//function extend(subClass,superClass){
//    var F = function(){};
//    F.prototype = superClass.prototype;
//    subClass.prototype = new F();
//    subClass.prototype.constructor = subClass;
//    subClass.superclass = superClass.prototype; //加多了个属性指向父类本身以便调用父类函数
//    if(superClass.prototype.constructor == Object.prototype.constructor){
//        superClass.prototype.constructor = superClass;
//    }
//}
//var extend = function(protoProps, staticProps) {
//    var parent = this;
//    var child;
//
//    // The constructor function for the new subclass is either defined by you
//    // (the "constructor" property in your `extend` definition), or defaulted
//    // by us to simply call the parent constructor.
//    if (protoProps && _.has(protoProps, 'constructor')) {
//        child = protoProps.constructor;
//    } else {
//        child = function(){ return parent.apply(this, arguments); };
//    }
//
//    // Add static properties to the constructor function, if supplied.
//    _.extend(child, parent, staticProps);
//
//    // Set the prototype chain to inherit from `parent`, without calling
//    // `parent`'s constructor function and add the prototype properties.
//    child.prototype = _.create(parent.prototype, protoProps);
//    child.prototype.constructor = child;
//
//    // Set a convenience property in case the parent's prototype is needed
//    // later.
//    child.__super__ = parent.prototype;
//
//    return child;
//};
String.prototype.endWith = function (s) {
    if (s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    if (this.substring(this.length - s.length) == s)
        return true;
    else
        return false;
    return true;
}
if (!Array.prototype.every) {
    Array.prototype.every = function (callbackfn, thisArg) {
        'use strict';
        var T, k;

        if (this == null) {
            throw new TypeError('this is null or not defined');
        }

        // 1. Let O be the result of calling ToObject passing the this
        //    value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get internal method
        //    of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If IsCallable(callbackfn) is false, throw a TypeError exception.
        if (typeof callbackfn !== 'function') {
            throw new TypeError();
        }

        // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 1) {
            T = thisArg;
        }

        // 6. Let k be 0.
        k = 0;

        // 7. Repeat, while k < len
        while (k < len) {

            var kValue;


            if (k in O) {

                // i. Let kValue be the result of calling the Get internal method
                //    of O with argument Pk.
                kValue = O[k];


                var testResult = callbackfn.call(T, kValue, k, O);

                // iii. If ToBoolean(testResult) is false, return false.
                if (!testResult) {
                    return false;
                }
            }
            k++;
        }
        return true;
    };
}

// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {

    Array.prototype.map = function (callback, thisArg) {

        var T, A, k;

        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }

        // 1. Let O be the result of calling ToObject passing the |this|
        //    value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get internal
        //    method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If IsCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 1) {
            T = thisArg;
        }


        A = new Array(len);

        // 7. Let k be 0
        k = 0;

        // 8. Repeat, while k < len
        while (k < len) {

            var kValue, mappedValue;


            if (k in O) {


                kValue = O[k];


                mappedValue = callback.call(T, kValue, k, O);


                A[k] = mappedValue;
            }
            // d. Increase k by 1.
            k++;
        }

        // 9. return A
        return A;
    };
}


String.prototype.startWith = function (s) {
    if (s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    if (this.substr(0, s.length) == s)
        return true;
    else
        return false;
    return true;
}

/**
 * description : 得到字符串的字节长度;
 * @version 0.2;
 * @return 返回字符串的字节长度(eg:"一二12"的字节长度是6);
 */
String.prototype.getLength = function () {
    var text = this.replace(/[^\x00-\xff]/g, "**");
    return text.length;
}
/**
 * description : 按字节长度截取字符串,并添加后缀.
 * @param len 需要截取的长度,字符串长度不足返回本身;
 * @param alt 添加后缀(非必要),默认为"......";
 * @return 返回截取后的字符串;
 * @requires getLength;
 */
String.prototype.getShortForm = function (len, alt) {
    var tempStr = this;
    if (this.getLength() > len) {
        if (!alt) {
            alt = "......";
        }
        var i = 0;
        for (var z = 0; z < len; z++) {
            if (tempStr.charCodeAt(z) > 255) {
                i = i + 2;
            } else {
                i = i + 1;
            }
            if (i >= len) {
                tempStr = tempStr.slice(0, (z + 1)) + alt;
                break;
            }
        }
        return tempStr;
    } else {
        return this + "";
    }
}
function getShortForm(str, len, alt) {
    if (str) {
        return str.getShortForm(len, alt);
    } else {
        return "";
    }
}

var __extend = function (a,PCtrl) {
    var subCtrl = function () {

//                ParentCtl.call(this);
        PCtrl.prototype.constructor.call(this);
    }
    subCtrl.prototype = _.extend(a, PCtrl.prototype);

    subCtrl.prototype.constructor =subCtrl;
    return subCtrl;
};
//obj 包含 events和event属性
function bindEvents($el,obj){

    if (obj.events) {
        for (var h in obj.events) {

            var c = h.split(" ");
            var fun = obj[obj.events[h]];
            if(fun){
                $el.on(c[0], c[1], fun.bind(obj));
            }
        }

    }
}
function unbindEvents($el,obj){
    if($el && obj.events) {
        if (obj.events) {
            for (var h in obj.events) {
                var c = h.split(" ");
                $el.off(c[0], c[1]);
            }
        }
        delete $el;
    }
}