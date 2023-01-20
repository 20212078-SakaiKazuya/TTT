// This is a JavaScript file

// ニフクラ接続
var applicationKey = '31f236de7d5148a5cb93c53b52bfdd0fb4469aa6a3f4f0e8a39afa23f917241e';
var clientKey = 'b59e281093d74f2fcb80e83a1aaf70d106e73e6059b429e5f39298a9884ae771';
var ncmb = new NCMB(applicationKey, clientKey);

// function getCurUser() {
//     // カレントユーザーの取得
//     var user = new ncmb.User();
//     var currentUserFlg = user.isCurrentUser();
//     if (currentUserFlg) {
//         var currentUser = ncmb.User.getCurrentUser();
//         var currentUserName = currentUser.get("userName");      // 現在のユーザー名
//         var currentUserPass = currentUser.get("password");      // 現在のパスワード
//         var currentUserMailAddress = currentUser.get("mailAddress");    // 現在のメールアドレス
//         console.log('現在のユーザー名: ' + currentUserName);
//         console.log('現在のメールアドレス: ' + currentUserMailAddress);
//         console.log('現在のパスワード: ' + currentUserPass);    // デバッグ
//     } else {
//         window.alert('エラーが発生しました¥nマップ画面に戻ります'); // FIX ME
//         document.locatin.href = 'index.html';
//     }
//     return currentUserName;
// }

// 処理の一時停止
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ピンの名前変更
async function pinRenameReceive(pinId, newPinName) {
    var pinID = pinId;          // pinID
    // 新しい名前が入力された時、ピンの名前を変更する
    if (newPinName.length != 0) {
        var Pin = ncmb.DataStore("pin");
        // データの取得、更新
        await Pin.equalTo("pinID", pinID)
            .fetch()
            .then(function(pin) {
                pin.set("pinName", newPinName);
                console.log('ピンの名前更新成功');
                return pin.update();
            })
            .catch(function(err) {
                console.log('ピンの名前更新失敗');
            });
        // デバッグ
        console.log('実行結果:' + JSON.stringify(pin));
        resultPinReName();
    }

}

// ブックマークフラグの変更
async function changeBookmark(pinId) {
    var pinID = pinId;  // pinID
    // bookmark_flgをtrueに変更
    var Pin = ncmb.DataStore("pin");
    //データの取得、更新
    Pin.equalTo("pinID", pinID)
    .fetch()
    .then(function(pin) {
        pin.set("bookmark_flg", true);
        console.log('ブックマークフラグの更新成功');
        return pin.update();
    })
    .catch(function(err) {
        console.log('ブックマークフラグの更新失敗');
        falseBookmark();
    });
    trueBookmark();
}