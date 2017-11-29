/**
 * spq.shell.js
 * SPAのシェルモジュール
 */

/*
    jslint browser :true, continue :true,
    devel :true, indent :2,maxerr :50,
    newcap :true, noman :true, plusplus :true,
    regexp :true, sloppy :true, vars :true, white:true 
*/

/* global,$,spa */

// ----------------モジュールスコープ変数---------------- //

spa.shell = (function () {
    var
        configMap = {
            main_html: String()
            + '<div class="spa-shell-head">'
            + '<div class="spa-shell-head-logo"></div>'
            + '<div class="spa-shell-head-acct"></div>'
            + '<div class="spa-shell-head-search"></div>'
            + '</div>'
            + '<div class="spa-shell-main">'
            + '<div class="spa-shell-main-nav"></div>'
            + '<div class="spa-shell-main-content"></div>'
            + '</div>'
            + '<div class="spa-shell-foot"></div>'
            + '<div class="spa-shell-chat"></div>'
            + '<div class="spa-shell-modal"></div>',
            chat_extend_time: 1000,
            chat_retract_time: 300,
            chat_extend_height: 450,
            chat_retract_height: 15,
            chat_extended_title: 'Click to retract',
            chat_retracted_title: 'Click to extend'
        },
        stateMap = {
            $container: null,
            is_chat_retracted: true
        },
        jqueryMap = {},
        setJqueryMap, toggleChat, onClickChat, initModule;
    // ----------------モジュールスコープ変数終了---------------- //
    // ----------------ユーティリティメソッド---------------- //
    // ----------------ユーティリティメソッド終了---------------- //
    // ----------------DOMメソッド---------------- //
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container: $container,
            $chat: $container.find('.spa-shell-chat')
        };
    };
    toggleChat = function (do_extend, callback) {
        var
            px_chat_ht = jqueryMap.$chat.height(),
            is_open = px_chat_ht === configMap.chat_extend_height,
            is_closed = px_chat_ht === configMap.chat_retract_height,
            is_sliding = !is_open && !is_closed;
        //デバック
        console.log(is_open, is_closed, is_sliding);
        //競合を避ける
        if (is_sliding) return false;
        //チャットスライダー拡大開始
        if (do_extend) {
            jqueryMap.$chat.animate(
                {
                    height: configMap.chat_extend_height,
                    opacity: 0.8
                },
                configMap.chat_extend_time,
                function () {
                    jqueryMap.$chat.attr(
                        'title', configMap.chat_extended_title
                    );
                    // ????
                    stateMap.is_chat_retracted = false;
                    if (callback) callback(jqueryMap.$chat);
                }
            );
            return true;
        }
        //チャットスライダー拡大終了

        //チャットスライダー格納開始
        jqueryMap.$chat.animate(
            {
                height: configMap.chat_retract_height,
                opacity: 1
            },
            configMap.chat_extend_time,
            function () {
                jqueryMap.$chat.attr(
                    'title', configMap.chat_retracted_title
                );
                // ????
                stateMap.is_chat_retracted = true;
                if (callback) callback(jqueryMap.$chat);
            }
        );
        return true;
        //チャットスライダー格納終了
    };
    // DOMメソッド/toggleChat終了

    // ----------------DOMメソッド終了---------------- //

    // ----------------イベントハンドラ---------------- //

    onClickChat = function (e) {
        if (toggleChat(stateMap.is_chat_retracted)) {
            $.urlAnchor.setAnchor({
                chat: (stateMap.is_chat_retracted ? 'open' : 'closed')
            });
        }
        return false;
    };
    // ----------------イベントハンドラ終了---------------- //

    // ----------------パブリックメソッド---------------- //
    initModule = function ($container) {
        //HTMLをロードし、jqueryコレクションにマッピング
        stateMap.$container = $container;
        $container.html(configMap.main_html);
        setJqueryMap();

        //チャットスライダーを初期化し、クリックイベントハンドラをバインドする
        stateMap.is_chat_retracted = true;
        jqueryMap.$chat
            .attr('title', configMap.chat_retracted_title)
            .click(onClickChat);
        //テスト
        setTimeout(function () { toggleChat(true); }, 3000);
        setTimeout(function () { toggleChat(false); }, 8000);
    };
    // ----------------initModule終了---------------- //
    return { initModule: initModule };
    // ----------------パブリックメソッド終了---------------- //
}());
