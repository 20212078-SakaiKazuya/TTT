// This is a JavaScript file

function signup(){
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
           })
           .catch(function(e){
               //エラー処理
               console.log('登録できませんでした');
           });
}