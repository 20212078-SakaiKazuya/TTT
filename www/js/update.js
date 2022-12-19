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
    var currentUserMailAddress = currentUser.get("mailAddress");    // 現在のメールアドレス
    console.log('現在のユーザー名: ' + currentUserName);
    console.log('現在のメールアドレス: ' + currentUserMailAddress);
    console.log('現在のパスワード: ' + currentUserPass);    // デバッグ
} else {
    window.alert('エラーが発生しました¥nマップ画面に戻ります'); // FIX ME
    document.locatin.href = 'index.html';
}
    
function userNameUpdate(newUserName){      // ユーザー名変更
    var settingUserName = newUserName;
    // 新しいユーザー名が登録済ではないか確認
    ncmb.User.fetchAll()
             .then(users => {
                 users.forEach(user => {
                 console.log(user.length);
                 // 登録されている場合
                 for(var i = 0; i < user.length; i++){
                    console.log(user.userName);
                    if(user.userName === settingUserName) {
                        sameUserName();
                    }
                 }
                })
             })
            .catch(function(e){
                errorAlert();
            });
    // 入力チェック
    if(settingUserName == ""){
        errorName();
    } else {
        // ユーザー名変更作業
        currentUser.set('userName', settingUserName)
        .update()
        .then(function(obj) {
            // 更新成功
            updateUserName();
        })
        .catch(function(e) {
            // 更新失敗
            errorAlert();
        });
    }
}

function userPasswordUpdate(newUserPassword){      // パスワード変更
    var settingUserPassword = newUserPassword;
    // 入力チェック(空白ではないか)
    if(settingUserPassword == ""){
        errorPass();
    } else {
        // パスワード変更作業
        currentUser.set('password', settingUserPassword)
        .update()
        .then(function(obj) {
            // 更新成功
            updateUserPass();
        })
        .catch(function(e) {
            // 更新失敗
            errorAlert();
        });
    }
}

function userMailaddressUpdate(newUserMailAddress){       // メールアドレス変更
    var settingUserMailAddress = newUserMailAddress;
    // 新しいメールアドレスが登録済ではないか確認

    // 入力チェック(空白ではないか)
    if(settingUserMailAddress == ""){
        errorMailAddress();
    } else {
        // メールアドレス変更作業
        currentUser.set('mailAddress', settingUserMailAddress)
        .update()
        .then(function(obj) {
            // 更新成功
            updateUserMailAddress();
        })
        .catch(function(e) {
            // 更新失敗
            errorAlert();
        });
    }
}