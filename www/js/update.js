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

// 処理の一時停止
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    
async function userNameUpdate(){      // ユーザー名変更
    await wait(1500);   // 1.5秒待ち
    var settingUserName = document.getElementById("username").value;    // 設定画面から値を取得
    var getUserName;    // 検索結果保持用
    // 新しいユーザー名が登録済ではないか確認
    await ncmb.User.equalTo("userName", settingUserName)
             .fetchAll()
             .then(function(result) {
                 console.log('検索結果: ' + result);
                 if(result.length != 0){
                    getUserName = result[0].userName;
                    console.log(getUserName);
                 }
             })
            .catch(function(e){
                errorSettingAlert();
            });
    console.log(getUserName + " & " + settingUserName); // デバッグ
    // 入力チェック
    if(settingUserName == ""){
        errorName();
    } else if(getUserName == settingUserName) {
        sameUserName();
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
            errorSettingAlert();
        });
    }
}

function userPasswordUpdate(){      // パスワード変更
    var settingUserPassword = document.getElementById("password").value;
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
            errorSettingAlert();
        });
    }
}

async function userMailaddressUpdate(){       // メールアドレス変更
    var settingUserMailAddress = document.getElementById("mail").value;
    var getUserMail;    // 検索結果保持用
    // 新しいメールアドレスが登録済ではないか確認
    await ncmb.User.equalTo("mailAddress", settingUserMailAddress)
             .fetchAll()
             .then(function(result) {
                 console.log('検索結果: ' + result);
                 if(result.length != 0){
                    getUserMail = result[0].mailAddress;
                    console.log(getUserMail);
                 }
             })
            .catch(function(e){
                errorSettingAlert();
            });
    console.log(getUserMail + " & " + settingUserMailAddress);  // デバッグ
    // 入力チェック
    if(settingUserMailAddress == ""){
        errorMailAddress();
    } else if(getUserMail == settingUserMailAddress) {
        sameUserMail();
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
            errorSettingAlert();
        });
    }
}