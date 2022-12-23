// This is a JavaScript file

// ニフクラ接続
var applicationKey = '31f236de7d5148a5cb93c53b52bfdd0fb4469aa6a3f4f0e8a39afa23f917241e';
var clientKey = 'b59e281093d74f2fcb80e83a1aaf70d106e73e6059b429e5f39298a9884ae771';
var ncmb = new NCMB(applicationKey, clientKey);
var reader = new FileReader();
reader.onload = function(e) {
    var dataUrl = reader.result;
    document.getElementById("albumlist").src = dataUrl;
}

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
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// htmlの書き込み
async function writeHTML(pictureName) {
    var htmlPictureLists = '';  // html表示用
    // html作成
    if (pictureName == "") {
        htmlPictureLists += '<li class="nopicturelist">まだ登録されていません！</li>';
    } else {
        // for(var i = 0; i < date.length; i++){   // fix
        //     htmlPictureLists += '<li class="picturelist">ピン:' + pinName[i] + '<br>' + '経度:' + longitude[i] + ' 緯度:' + latitude[i] + '<br>' + '作成日時:' + date[i] + '</li><br>';
        // }
        // デバッグ
        htmlPictureLists += '通った！';
    }
    await console.log(htmlPictureLists);
    document.getElementById('albumlist').innerHTML = htmlPictureLists;
}

// 写真の一覧取得
window.onload = async function getPictureList() {
    await wait(1000);    // 1秒停止
    var nowUserName = await getCurUser();
    var pictureNames = [];  // 写真の名前
    var pictureData = [];   // ファイルストアから取得したデータの格納用
    var binaryPictureData = []; // バイナリデータ格納用
    console.log(nowUserName);
    // ユーザーの写真を検索(データストア内)
    var Picture = ncmb.DataStore("picture");
    await Picture.equalTo("userName", nowUserName)
        .order("pictureId")
        .fetchAll()
        .then(function (result) {
            console.log('検索結果: ' + JSON.stringify(result));
            console.log('件数: ' + result.length);
            for (var i = 0; i < result.length; i++) {
                pictureNames[i] = result[i].data;
            }
            // デバッグ
            console.log('pictureNames: ' + pictureNames);
        })
        .catch(function (e) {
            pinListError(); // fix
        });
    // データの取得
    for (var i = 0; i < pictureNames.length; i++) {
        ncmb.File.download(pictureNames[i], "jpeg")
            .then(function (fileData) {
                reader.readAsDataURL(fileData);
            })
            .catch(function (e) {
                console.log('エラーが発生しました！');
            });
    }
    await console.log('binaryPictureData: ' + binaryPictureData);
    // htmlの書き換え
    writeHTML(pictureNames);
}