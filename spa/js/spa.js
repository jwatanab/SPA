/**
 *  spa.js
 *  ルート名前空間モジュール
 */

/*
    jslint browser :true, continue :true,
    devel :true, indent :2,maxerr :50,
    newcap :true, noman :true, plusplus :true,
    regexp :true, sloppy :true, vars :true, white:true 
*/

/*  global jQuery aps:true  */

var spa = (function () {
    var initModule = function ($container) {
        $container.html(
            '<h1 style="display:inline-block;margin: 25px">Hello World!</h1>'
        );
    }
    return { initModule: initModule };
}());