// This is a JavaScript file

function signup(){
    // ニフクラ接続
    var applicationKey = '31f236de7d5148a5cb93c53b52bfdd0fb4469aa6a3f4f0e8a39afa23f917241e';
    var clientKey = 'b59e281093d74f2fcb80e83a1aaf70d106e73e6059b429e5f39298a9884ae771';
    var ncmb = new NCMB(applicationKey, clientKey);
    //新規登録画面から値を取得
    var signupUserName = document.getElementById("username").value;
    var signupUserMailaddress = document.getElementById("mail").value;
    var signupUserPassword = document.getElementById("password").value;

    // userインスタンスの生成
    var newUser = new ncmb.User();
    // ユーザー名,パスワード,メールアドレスを設定
    newUser.set("userName", signupUserName)  /*ユーザー名*/
           .set("password", signupUserPassword) /*パスワード*/
           .set("mailAddress", signupUserMailaddress)   /*メールアドレス*/
    // 新規登録処理
    newUser.signUpByAccount()
           .then(function(){
               //登録処理
               console.log('登録しました');
               document.location.href = 'index.html';
           })
           .catch(function(e){
               //エラー処理
               console.log('登録できませんでした');
               document.location.href = 'signup.html';
           });
}