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
    } else {
        window.alert('album.jsでエラーが発生しました。マップ画面に戻ります');
        document.locatin.href = 'index.html';
    }
    return currentUserName;
}

// 処理の一時停止
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// htmlの書き込み
async function writeHTML(pictureName, pinName, longitude, latitude, pictureIDList) {
    var htmlPictureLists = "";      // html書き込み用
    // ピンの名前を確認
    if (pinName != "" || pinName.length != 0) {
        // 名前あり
        htmlPictureLists += '<li class="pinname" onclick="saveLocalStorage(' + longitude + ',' + latitude + ');">' + pinName + '</li>';  // html表示用
        // html作成
        if (pictureName == "") {
            // 画像が登録されていない時
            htmlPictureLists += '<li class="nopicturelist">まだ登録されていません！</li>';
            document.getElementById('body').innerHTML = htmlPictureLists;
        } else {
            // 画像が登録されている時
            // 画像の表示場所
            for (var k = 0; k < pictureName.length; k++) {
                htmlPictureLists += '<img class="picturelist" id="picture' + k + '" src="" onclick="confirmPictureDelete(' + pictureIDList[k] + ');"></img>';
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
    } else {
        // 名前なし
        htmlPictureLists = "";
        // html作成
        if (pictureName == "") {
            // 画像が登録されている時
            htmlPictureLists += '<ul><li class="nopicturelist">まだ登録されていません！</li></ul>';
            document.getElementById('body').innerHTML = htmlPictureLists;
        } else {
            // 画像の表示場所
            for (var k = 0; k < pictureName.length; k++) {
                htmlPictureLists += '<img class="picturelist" id="picture' + k + '" src="" onclick="confirmPictureDelete(' + pictureIDList[k] + ');"></img>';
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
                        window.alert('エラーが発生しました。マップ画面に戻ります');
                        document.location.href = 'index.html';
                    });
            }
        }
    }
}

// 写真のダウンロード
/* 
   allPictureName: ユーザーに紐づいている画像の"data"
   numberPicture: ピンに紐づいている画像の件数
*/
async function downloadPicture(allPictreName, numberPicture) {
    var k = 0;      // id設定用
    var idx = 0;    // 画像判別用
    for (var i = 0; i < numberPicture.length; i++) {
        for (var j = 0; j < numberPicture[i]; j++) {
            if(numberPicture[i] == 0) {
                break;
            }
            await ncmb.File.download(allPictreName[idx], "blob")
                .then(function (fileData) {
                    var pictureId = 'picture' + k + j;
                    reader.onload = function (e) {
                        var dataUrl = reader.result;
                        document.getElementById(pictureId).src = dataUrl;
                    }
                    reader.readAsDataURL(fileData);
            })
            .catch (function (err) {
            console.log('エラー：' + err);
            window.alert('ダウンロードでエラーが発生しました。マップ画面に戻ります。');
            document.location.href = 'index.html';
            });
            idx++;
        }
        await k++;
        console.log('k:' + k);
        console.log('idx:' + idx);
        console.log('i:' + i);
    }
}

// 写真の一覧取得
window.onload = async function getPictureList() {
    await wait(1000);    // 1秒停止
    var nowUserName = await getCurUser();
    var htmlString;     // html文
    var pictureNames = [];  // 写真の名前
    var pictureIDList = []; // pictureIDの取得

    // クエリストリングの処理
    var query = new URLSearchParams(window.location.search);
    var queryPinId = query.get('pinId');
    console.log("queryPinId:" + queryPinId);
    console.log('型:' + typeof queryPinId);
    if (queryPinId === 'undefined' && pinId == null) {
        console.log('変換なし');
    } else if (pinId == null && typeof queryPinId == 'number') {
        console.log('変換なし');
    } else {
        var pinId = parseInt(queryPinId);
        console.log('変換後:' + typeof pinId);
    }

    // 変換処理されたかどうかで分岐
    if (typeof pinId === 'number') {
        // 変換あり
        var getPinName;     // ピンの名前を取得
        var getLongitude;   // 経度
        var getLatitude;    // 緯度

        // ピンの名前,緯度,経度を取得
        var Pin = ncmb.DataStore("pin");
        await Pin.equalTo("userName", nowUserName)
            .equalTo("pinID", pinId)
            .equalTo("dis_flg", true)
            .order("pinID")
            .fetch()
            .then(function (result) {
                // デバッグ
                // console.log('検索結果:' + JSON.stringify(result));
                getPinName = result.pinName;
                getLatitude = result.map.latitude;
                getLongitude = result.map.longitude;
            })
            .catch(function (err) {
                console.log('名前取得失敗');
            });
        // ユーザーの写真を検索(データストア内)
        var Picture = ncmb.DataStore("picture");
        await Picture.equalTo("userName", nowUserName)
            .equalTo("pinID", pinId)
            .equalTo("dis_flg", true)
            .order("pictureID")
            .fetchAll()
            .then(function (result) {
                // デバッグ
                // console.log('検索結果: ' + JSON.stringify(result));
                // console.log('件数: ' + result.length);
                for (var i = 0; i < result.length; i++) {
                    pictureNames[i] = result[i].data;
                    pictureIDList[i] = result[i].pictureID;
                }
            })
            .catch(function (e) {
                window.alert('エラーが発生しました。マップ画面に戻ります');
                document.location.href = 'index.html';
            });
        // htmlの書き換え
        await writeHTML(pictureNames, getPinName, getLongitude, getLatitude, pictureIDList);
        console.log('読み込み完了');

    } else {
        // 変換なし
        var getPinName = [];    // 配列化
        var getLatitude = [];
        var getLongitude = [];
        var getPinID = [];
        var k = 0;      // 配列識別用
        var allPictureName = [];    // 表示する全ての写真の名前を格納
        var numberPicture = [];     // ピンごとの写真の枚数を格納
        htmlString = "";

        // ピンの情報を全て取得
        var Pin = ncmb.DataStore("pin");
        await Pin.equalTo("userName", nowUserName)
            .equalTo("dis_flg", true)
            .order("pinID")
            .fetchAll()
            .then(function (result) {
                console.log('result:' + JSON.stringify(result));
                for (var i = 0; i < result.length; i++) {
                    getPinID[i] = result[i].pinID;
                    getPinName[i] = result[i].pinName;
                    getLatitude[i] = result[i].map.latitude;
                    getLongitude[i] = result[i].map.longitude;
                }
            })
            .catch(function (err) {
                console.log('ピンデータ取得失敗');
            });
        // ユーザーの写真を検索(データストア内)
        var Picture = ncmb.DataStore("picture");
        // ユーザーの写真を全件取得
        await Picture.equalTo("userName", nowUserName)
            .equalTo("dis_flg", true)
            .order("pinID")
            .fetchAll()
            .then(function (result) {
                for (var i = 0; i < result.length; i++) {
                    allPictureName[i] = result[i].data;
                    pictureIDList[i] = result[i].pictureID;
                }
            })
            .catch(function (err) {
                console.log('写真全件取得失敗');
            });
        // ピンごとの写真を検索
        for (var j = 0; j < getPinID.length; j++) {
            await Picture.equalTo("userName", nowUserName)
                .equalTo("pinID", getPinID[j])
                .equalTo("dis_flg", true)
                .order("pictureID")
                .fetchAll()
                .then(function (result) {
                    // 配列の初期化
                    pictureNames = [result.length];
                    for (var l = 0; l < result.length; l++) {
                        pictureNames[l] = result[l].data;
                    }
                    // 写真枚数を格納
                    numberPicture[j] = result.length;
                    // デバッグ
                    // console.log('検索結果: ' + JSON.stringify(result));
                    // console.log('件数: ' + result.length);
                    // console.log('pictureNames: ' + pictureNames);
                    // console.log('numberPicture:' + numberPicture);
                })
                .catch(function (e) {
                    window.alert('エラーが発生しました。マップ画面に戻ります');
                    document.location.href = 'index.html';
                });

            // html作成
            var htmlPinName = '<li class="pinname" onclick="saveLocalStorage(' + getLongitude[j] + ',' + getLatitude[j] + ');">' + getPinName[j] + '</li>';
            htmlString += htmlPinName;
            for (var m = 0; m < pictureNames.length; m++) {
                if (pictureNames[0] == "" || pictureNames[0].length == 0) {
                    htmlString += '<li class="nopicturelist">まだ登録されていません！</li>';
                    break;
                } else {
                    htmlString += '<img class="picturelist" id="picture' + k + m + '" src="" onclick="confirmPictureDelete(' + pictureIDList[m] + ');"></img>';
                }
            }
            htmlString += '<br>';
            k++;
        }
        // html書き換え
        document.getElementById('body').innerHTML = htmlString;
        console.log('書き換え完了');
        // 画像ダウンロード
        await downloadPicture(allPictureName, numberPicture);
    }
    // 読み込み画面
    const spinner = document.getElementById('loading');
    spinner.classList.add('loaded');
}
