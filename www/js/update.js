// This is a JavaScript file

// ニフクラ接続
var applicationKey = '31f236de7d5148a5cb93c53b52bfdd0fb4469aa6a3f4f0e8a39afa23f917241e';
var clientKey = 'b59e281093d74f2fcb80e83a1aaf70d106e73e6059b429e5f39298a9884ae771';
var ncmb = new NCMB(applicationKey, clientKey);
// カレントユーザーの取得
var user = new ncmb.User();
var currentUserFlg = user.isCurrentUser();
if(currentUserFlg){
    var currentUser = ncmb.User.getCurrentUser();
    var currentUserName = currentUser.get("userName");      // 現在のユーザー名
    var currentUserPass = currentUser.get("password");      // 現在のパスワード
    var currentUserMailAddress = currentUser.get("mailaddress");    // 現在のメールアドレス
} else {
    


function userNameUpdate(userName, newUserName){      // ユーザー名変更

}

function userPasswordUpdate(userPassword, newUserPassword){      // パスワード変更

}

function userMailaddressUpdate(userMailAddress, newUserMailAddress){       // メールアドレス変更

}