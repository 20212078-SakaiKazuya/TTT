// This is a JavaScript file

// ニフクラ接続
// var applicationKey = '31f236de7d5148a5cb93c53b52bfdd0fb4469aa6a3f4f0e8a39afa23f917241e';
// var clientKey = 'b59e281093d74f2fcb80e83a1aaf70d106e73e6059b429e5f39298a9884ae771';
// var ncmb = new NCMB(applicationKey, clientKey);

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
// const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ピンの削除
async function pinRemove(pinId) {
    var pinID = pinId;      // pinID
    // 対象のデータを検索
    var Pin = ncmb.DataStore("pin");
    var pin = new Pin();
    await Pin.equalTo("pinID", pinID)
        .fetchAll()
        .then(function (pin) {
            // デバッグ
            console.log('検索結果:' + JSON.stringify(pin));
            if(pin.length != 0) {
                pin.delete()
                    .then(function(result) {
                        console.log('削除完了');
                        truePinDelete();
                    })
                    .catch(function(err) {
                        console.log('削除失敗');
                        falsePinDelete();
                    });
            }
        })
        .catch(function(err) {
            console.log('データが見つかりません');
        });
}
     
// 写真の削除
function pictureDelete(pictureId) {
    var pictureID = pictureId;  // pictureID
    
}