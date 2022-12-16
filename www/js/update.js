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
    window.alert('エラーが発生しました¥nマップ画面に戻ります'); // FIX ME
    document.locatin.href = 'index.html';
}
    
function userNameUpdate(newUserName){      // ユーザー名変更
    var settingUserName = newUserName;
    // 新しいユーザー名が登録済ではないか確認

    currentUser.set('userName', settingUserName)
    .update()
    .then(function(obj) {
        // 更新成功
        window.alert('ユーザー名を更新しました');   // FIX ME
        document.location.href = 'setting.html';
    })
    .catch(function(e) {
        // 更新失敗
        window.alert('エラーが発生しました¥n設定画面に戻ります'); // FIX ME
        document.location.href = 'setting.html';
    });
}

function userPasswordUpdate(newUserPassword){      // パスワード変更
    var settingUserPassword = newUserPassword;
    currentUser.set('password', settingUserPassword)
    .update()
    .then(function(obj) {
        // 更新成功
        window.alert('パスワードを更新しました');   // FIX ME
        document.location.href = 'setting.html';
    })
    .catch(function(e) {
        // 更新失敗
        window.alert('エラーが発生しました¥n設定画面に戻ります'); // FIX ME
        document.location.href = 'setting.html';
    });
}

function userMailaddressUpdate(newUserMailAddress){       // メールアドレス変更
    var settingUserMailAddress = newUserMailAddress;
    // 新しいメールアドレスが登録済ではないか確認

    currentUser.set('mailAddress', settingUserMailAddress)
    .update()
    .then(function(obj) {
        // 更新成功
        window.alert('メールアドレスを更新しました');   // FIX ME
        document.location.href = 'setting.html';
    })
    .catch(function(e) {
        // 更新失敗
        window.alert('エラーが発生しました¥n設定画面に戻ります'); // FIX ME
        document.location.href = 'setting.html';
    });
}