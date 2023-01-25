// This is a JavaScript file

// ニフクラ接続
var applicationKey = '31f236de7d5148a5cb93c53b52bfdd0fb4469aa6a3f4f0e8a39afa23f917241e';
var clientKey = 'b59e281093d74f2fcb80e83a1aaf70d106e73e6059b429e5f39298a9884ae771';
var ncmb = new NCMB(applicationKey, clientKey);
var reader = new FileReader();

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
        htmlPictureLists += '<ul><li class="nopicturelist">まだ登録されていません！</li></ul>';
        document.getElementById('body').innerHTML = htmlPictureLists;
    } else {
        // 画像の表示場所
        for(var k = 0; k < pictureName.length; k++){
            htmlPictureLists += '<img class="picturelist" id="picture' + k + '" src=""></img>';
        }
        document.getElementById('body').innerHTML = htmlPictureLists;
        console.log(htmlPictureLists);
        // 画像のダウンロード
        for (var i = 0; i < pictureName.length; i++) {
            await ncmb.File.download(pictureName[i], "blob")
                .then(function (fileData) {
                    var pictureId = 'picture' + i;
                    console.log(pictureId);
                    reader.onload = function (e) {
                        var dataUrl = reader.result;
                        document.getElementById(pictureId).src = dataUrl;
                    }
                    reader.readAsDataURL(fileData);
                })
                .catch(function (e) {
                    window.alert('エラーが発生しました¥nマップ画面に戻ります');
                    document.location.href = 'index.html';
                });
        }
    }
}

// 写真の一覧取得
window.onload = async function getPictureList() {
    await wait(1500);    // 1.5秒停止
    var nowUserName = await getCurUser();
    var pictureNames = [];  // 写真の名前
    console.log(nowUserName);
    var query = new URLSearchParams(window.location.search);
    var pinId = query.get('pinId');
    console.log("pinId:" + pinId);
    if (undefined == null || pinId == undefined) {
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
                window.alert('エラーが発生しました¥nマップ画面に戻ります');
                document.location.href = 'index.html';
            });
        // htmlの書き換え
        await writeHTML(pictureNames);
        console.log('読み込み完了');
    } else if(pinId != null) {
        console.log('pinIdあり');
        console.log('pinId:' + pinId);
        // ユーザーの写真を検索(データストア内)
        var Picture = ncmb.DataStore("picture");
        await Picture.equalTo("userName", nowUserName)
            .equalTo("pinID", pinId)
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
                window.alert('エラーが発生しました¥nマップ画面に戻ります');
                document.location.href = 'index.html';
            });
        // htmlの書き換え
        await writeHTML(pictureNames);
        console.log('読み込み完了');
    }
    const spinner = document.getElementById('loading');
    spinner.classList.add('loaded');
}