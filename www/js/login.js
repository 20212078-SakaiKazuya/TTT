// This is a JavaScript file

function login(){
    // ニフクラ接続
    var applicationKey = '31f236de7d5148a5cb93c53b52bfdd0fb4469aa6a3f4f0e8a39afa23f917241e';
    var clientKey = 'b59e281093d74f2fcb80e83a1aaf70d106e73e6059b429e5f39298a9884ae771';
    var ncmb = new NCMB(applicationKey, clientKey);
    // ログイン情報の取得
    var loginUserName = document.getElementById("username").value;
    var loginUserPassword = document.getElementById("password").value;
    var loginFlg = false;

    // 入力チェック
    if(loginUserName == ""){
        window.alert('ユーザー名を入力してください');
    }
    if(loginUserPassword == ""){
        window.alert('パスワードを入力してください');
    }
    var user = new ncmb.User({userName:loginUserName, password:loginUserPassword});
    ncmb.User.login(user)
        .then(function(data) {
            // ログイン成功時
            console.log(loginUserName + ' & ' + loginUserPassword);
            console.log('ログインしました');
            document.location.href = 'index.html';
        })
        .catch(function(e){
            // ログイン失敗時
            console.log(loginUserName + ' & ' + loginUserPassword);
            console.log('ログインに失敗しました');
            document.location.href = 'login.html';
        });
}