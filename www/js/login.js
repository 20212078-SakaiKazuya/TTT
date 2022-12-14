// This is a JavaScript file
'use strict'

function login(){
    // ニフクラ接続
    var applicationKey = '31f236de7d5148a5cb93c53b52bfdd0fb4469aa6a3f4f0e8a39afa23f917241e';
    var clientKey = 'b59e281093d74f2fcb80e83a1aaf70d106e73e6059b429e5f39298a9884ae771';
    var ncmb = new NCMB(applicationKey, clientKey);

    // ログイン情報の取得
    var loginUserName = document.getElementById('username').value;
    var loginUserPassword = document.getElementById('password').value;
    var loginFlg = false;

    // 入力チェック
    if(loginUserName == ""){
        window.alert('ユーザー名を入力してください');
    }
    if(loginUserPassword == ""){
        window.alert('パスワードを入力してください');
    }

    ncmb.User.login(loginUserName, loginUserPassword)
        .then(function(user) {
            // ログイン成功時
            console.log('ログインしました');
            loginFlg = true;
        })
        .catch(function(e){
            // ログイン失敗時
            console.log('ログインに失敗しました');
        });
    if(loginFlg){
        document.location.href = 'index.html';
    } else {
        document.location.href = 'login.html';
    }
}