// This is a JavaScript file

// ニフクラ接続
// SDK初期化
var applicationKey = '31f236de7d5148a5cb93c53b52bfdd0fb4469aa6a3f4f0e8a39afa23f917241e';
var clientKey = 'b59e281093d74f2fcb80e83a1aaf70d106e73e6059b429e5f39298a9884ae771';
var ncmb = new NCMB(applicationKey, clientKey);
// クラス,変数定義
var Pin = new ncmb.DataStore("pin");    // pinクラス
var pin = new Pin();
var currentUser = new ncmb.User.getCurrentUser();   // ログインユーザー
var nowUserName = currentUser.get("userName");      // ログインユーザー名
var pinLists = [];    // ピン一覧
var pinNames = [];    // ピンの名前

// ログインユーザーのピンを取得
window.onload = function getPin(){
    // pinクラスの検索
    // Pin.equalTo("userName", nowUserName)    // ピンの名前を取得
    //     .order("pinName")
    //     .fetchAll()
    //     .then(function(results){
    //         console.log('取得した値: ' + results);
    //         for(var i = 0; i < results.length; i++){
    //             pinNames[i] = results[i];
    //         }
    //     })
    //     .catch(function(e){
    //         console.log('データが取得できません');
    //     });
    pinNames = Pin.fetchById(nowUserName)
                    .then(pinNames => {
                        console.log(pinNames);
                    })
                    .catch(e => {
                        console.log('データなし');
                    });

}