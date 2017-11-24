/* JSLint設定 */

//モジュール/spa

//チャットスライダー機能を提供する
var spa = (function($){
    //モジュールスコープ変数を定義する
    var
    configMap = {},
    //その他のすべてのモジュール変数を定義する
    $chatSlider,toggleSlider,onClickSlider,initModule;
    //DOMメソッド/toggleSlider/
    //スライダーの位置を切り替える
    toggleSlider = function(){};
    //イベントハンドラ/onClickSlider
    //クリックイベントを受け取り、toggleSliderを呼び出す
    onClickSlider = function(e){};
    //パブリックメソッド/initModule/
    //初期状態を設定し、機能を提供する
    initModule = function($container){
        //HTMLをレンダリングする
        //スライダーの高さとタイトルを初期化する
        //ユーザークリックイベントをイベントハンドラにバインドする
    }
});