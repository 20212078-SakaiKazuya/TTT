// This is a JavaScript file

function login(){
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
            loginFlg = true;
        })
        .catch(function(e){
            // ログイン失敗時
            console.log(loginUserName + ' & ' + loginUserPassword);
            console.log('ログインに失敗しました');
        });
    if(loginFlg){
        document.location.href = 'index.html';
    } else {
        document.location.href = 'login.html';
    }
}