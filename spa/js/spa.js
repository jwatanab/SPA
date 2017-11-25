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

/*global jQuery aps:true*/

var spa = (function ($) {
    var
        configMap = {
            exteneded_height: 434,
            exteneded_title: 'Click to retract',
            retracted_height: 16,
            retracted_title: 'Click to extend',
            tamplete_html: '<div class="spa-slider"></div>'
        },

        $chatSlider, toggleSlider, onClickSlider, initModule;

    toggleSlider = function () {
        var
            slider_height = $chatSlider.height();
        if (slider_height === configMap.retracted_height) {
            $chatSlider
                .animate({ height: configMap.exteneded_height })
                .attr('title', configMap.exteneded_title);
            return true;
        }
        else if (slider_height === configMap.exteneded_height) {
            $chatSlider
                .animate({ height: configMap.retracted_height })
                .attr('title', configMap.retracted_title);
            return true;
        }
        // ?
        return false;
    }
    onClickSlider = function (e) {
        toggleSlider();
        return false;
    }
    initModule = function ($container) {
        $container.html(configMap.tamplete_html);
        $chatSlider = $container.find('.spa-slider');
        $chatSlider
            .attr('title', configMap.retracted_title)
            .click(onClickSlider);
        return true;
    };
    return { initModule: initModule };
}(jQuery));
$(function () {
    spa.initModule($('#spa'));
});