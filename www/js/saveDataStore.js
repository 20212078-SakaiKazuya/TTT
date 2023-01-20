// This is a JavaScript file

// ニフクラ接続
var applicationKey = '31f236de7d5148a5cb93c53b52bfdd0fb4469aa6a3f4f0e8a39afa23f917241e';
var clientKey = 'b59e281093d74f2fcb80e83a1aaf70d106e73e6059b429e5f39298a9884ae771';
var ncmb = new NCMB(applicationKey, clientKey);

function getCurUser() {
    // カレントユーザーの取得
    var user = new ncmb.User();
    var currentUserFlg = user.isCurrentUser();
    if (currentUserFlg) {
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
    return currentUserName;
}

// 処理の一時停止
// const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// pin
async function savePin(latitude, longitude) {
    await wait(1000);   // 1秒待機
    var nowUserName = await getCurUser();   // ユーザー名
    var pinName = document.getElementById("pinname").value; // ピンの名前
    var pinLat = latitude;  // 緯度
    var pinLong = longitude; // 経度
    var pinId;  // pinID
    var bookmark_flg = false;  // ブックマークフラグ
    var dis_flg = true;     // 表示するかしないか

    // 緯度,経度の書式設定
    var map = {"__type":"GeoPoint","longitude":pinLong,"latitude":pinLat};

    // クラス定義
    var Pin = ncmb.DataStore("pin");
    var pin = new Pin();

    // pinIDの取得,設定 fix
    await Pin.exists("userName")
        .order("pinID")
        .fetchAll()
        .then(function (result) {
            if (result.length == 0) {
                pinId = 1;
                console.log('初めての登録');
            } else {
                pinId = result[result.length - 1].pinID + 1;
                console.log('件数: ' + result.length);
                console.log('検索結果: ' + JSON.stringify(result));
                console.log('pinID:' + pinId); // デバッグ
            }
        })
        .catch(function (err) {
            console.log('データなし');
        });
    // データクラスに保存
    await pin.set("pinID", pinId)
        .set("bookmark_flg", bookmark_flg)
        .set("dis_flg", dis_flg)
        .set("pinName", pinName)
        .set("map", map)
        .set("userName", nowUserName)
        .save()
        .then(function (pin) {
            console.log('保存内容: ' + JSON.stringify(pin));
            console.log('保存しました');

            newPop.remove();
            var newPin = L.marker([map.latitude, map.longitude]).addTo(mymap);
            newPin.bindPopup("<table style='width:200px'><tr><td><div>" + pinName + '</div></td><td><img src="images/updateNameBt.png" width="20" onclick="pinRename(' + pinId + ');"></td><td><button onclick="bookmark(' + pinId + ');">★</button></td></tr></table><br><table><tr><td>アルバム</td><td >' + 0 + '</td><td>枚</td><td><img src="images/picbt.png" width="50" style="position:relative;top:2px;" onclick="pictureSelect(' + pinId + ');"></td></tr></table><div onclick="transition(' + "'album.html', " + pinId + ')"><img src="' + 'images/white.png' + '" height="100"><span> </span><img src="images/piccount.png" width="20"></div><img src="images/delPinBt.png" width="20" style="margin-left:25%" onclick="pinRemove(' + pinId + ')">');
            markers[pinId] = newPin;
        })
        .catch(function (err) {
            console.log('エラー内容: ' + err);
            console.log('保存できませんでした');
        });
}

// picture
async function savePicture() {
    await wait(1000);   // 1秒待機
    var nowUserName = await getCurUser();   // ユーザー名
    var pictureId;  // pictureID
    var pictureName;    // data
    var pictureDay; // day

    // クラス定義
    var Picture = ncmb.DataStore("picture");
    var picture = new Picture();

    // pictureIDの設定
    await Picture.exists("userName")
        .order("pictureID")
        .fetchAll()
        .then(function (result) {
            if (result.length == 0) {
                pictureId = 0;
                console.log('初めての登録');
            } else {
                pictureId = result[result.length - 1].pictureID + 1;
                // デバッグ
                console.log('検索結果: ' + JSON.stringify(result));
                console.log('pictureID: ' + pictureId);
            }
        })
        .catch(function (err) {
            console.log('データなし');
        });
    // 写真の保存
    await picture.set("pictureID", pictureId)
        .set("data", pictureName)
        .set("userName", nowUserName)
        .save()
        .then(function (picture) {
            console.log('保存しました');
        })
        .catch(function (err) {
            console.log('保存されませんでした');
        });
    
    // ファイルストアに保存

}

// album
async function saveAlbum(latitude, longitude) {
    await wait(1000);   // 1秒待機
    var nowUserName = await getCurUser();   // userName
    var pinId;  // pinID
    var pictureId;  // pictureID
    var albumId;    // albumID
    //var lat = latitude; // 緯度
    //var long = longitude;   // 経度

    // クラス定義
    var Pin = ncmb.DataStore("pin");
    var Picture = ncmb.DataStore("picture");
    var Album = ncmb.DataStore("album");
    var album = new Album();

    /* 各IDの設定 */
    // pinID
    // 緯度,経度の書式設定
    var map = long + ',' + lat;
    // pinIDの設定
    await Pin.equalTo("map", map)   // fix
        .fetchAll()
        .then(function(result) {
            pinId = result[0].pinID;
            // デバッグ
            console.log('pinID: ' + pinId);
        })
        .catch(function(err) {
            console.log('データなし');
        });
        
    // pictureID

    // albumID
    await Album.equalTo("userName", nowUserName)
        .fetchAll()
        .then(function(result) {
            if(result.length == 0) {
                albumId = 0;
                console.log('初めての登録');
            } else {
                albumId = result[result.length - 1].albumID + 1;
                // デバッグ
                console.log('検索結果: ' + JSON.stringify(result));
                console.log('albumID: ' + albumId);
            }
        })
        .catch(function(err) {
            console.log('データなし');
        });

        
}