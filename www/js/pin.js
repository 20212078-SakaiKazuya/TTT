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
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 日付の書式設定
function settingDay(date){
    var getDate; // 引数からの取り出し
    var result; // 切り取り後の日付
    var setDate = [];   // 変換後の日付格納用
    // 日付の切り取り
    for(var i = 0; i < date.length; i++){
        getDate = date[i];
        result = getDate.slice(0, 10);
        setDate[i] = result;
    }
    return setDate;
}

// htmlの書き込み
async function writeHTML(pinName,longitude,latitude,date) {
    var htmlPinLists = '';  // html表示用
    // html作成
    if(pinName == "") {
        htmlPinLists += '<li class="nopinlist">まだ登録されていません！</li>';
    } else {
        for(var i = 0; i < date.length; i++){
            htmlPinLists += '<li class="pinlist" onclick="saveLocalStorage(' + longitude[i] + ',' + latitude[i] + ');">ピン:' + pinName[i] + '<br>' + '経度:' + longitude[i] + '<br>緯度:' + latitude[i] + '<br>' + '作成日時:' + date[i] + '</li><br>';
        }
    }
    await console.log(htmlPinLists);
    document.getElementById('pinlist').innerHTML = htmlPinLists;
}

// ピンの一覧取得
window.onload = async function getPinList() {
    await wait(1000);    // 1秒停止
    var nowUserName = await getCurUser();
    var pinLists = [];  // ピンの緯度,経度
    var pinNames = [];  // ピンの名前
    var lat = [];   // 緯度
    var long = [];  // 経度
    var registDay = []; // 作成日付の取得用
    var settingRegistDay = [];  // 変換後の日付
    console.log(nowUserName);
    // ユーザーのピンを検索
    var Pin = ncmb.DataStore("pin");
    await Pin.equalTo("userName", nowUserName)
        .equalTo("dis_flg", true)
        .order("pinId")
        .fetchAll()
        .then(function (result) {
            console.log('検索結果: ' + JSON.stringify(result));
            console.log('件数: ' + result.length);
            for (var i = 0; i < result.length; i++) {
                pinLists[i] = result[i].map;
                pinNames[i] = result[i].pinName;
                registDay[i] = result[i].createDate;
                lat[i] = pinLists[i].latitude;
                long[i] = pinLists[i].longitude;
            }
            // 日付の切り取り
            settingRegistDay = settingDay(registDay);
            // デバッグ
            console.log('pinLists: ' + pinLists);
            console.log('pinNames: ' + pinNames);
            console.log('lat: ' + lat);
            console.log('long: ' + long);
            console.log('registDay: ' + registDay);
            console.log('settingRegistDay: ' + settingRegistDay);
        })
        .catch(function (e) {
            pinListError();
        });
    // htmlの書き換え
    writeHTML(pinNames, long, lat, settingRegistDay);
    const spinner = document.getElementById('loading');
    spinner.classList.add('loaded');
}