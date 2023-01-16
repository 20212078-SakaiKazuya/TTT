// // ニフクラ接続
// var applicationKey = '31f236de7d5148a5cb93c53b52bfdd0fb4469aa6a3f4f0e8a39afa23f917241e';
// var clientKey = 'b59e281093d74f2fcb80e83a1aaf70d106e73e6059b429e5f39298a9884ae771';
// var ncmb = new NCMB(applicationKey, clientKey);

// const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// var pinLists = [];  // ピンの緯度,経度
//     var pinNames = [];  // ピンの名前
//     var lat = [];   // 緯度
//     var long = [];  // 経度
//     var registDay = []; // 作成日付の取得用
//     var settingRegistDay = [];  // 変換後の日付

// window.onload = async function getPin() {
//     var user = new ncmb.User();
//     var currentUserFlg = user.isCurrentUser();
//     if (currentUserFlg) {
//         var currentUser = ncmb.User.getCurrentUser();
//         var nowUserName = currentUser.get("userName");
//     }
    
//     // ユーザーのピンを検索
//     var Pin = ncmb.DataStore("pin");
//     await Pin.order(nowUserName, true)
//         .fetchAll()
//         .then(function (result) {
//             for (var i = 0; i < result.length; i++) {
//                 pinLists[i] = result[i].map;
//                 pinNames[i] = result[i].pinName;
//                 registDay[i] = result[i].createDate;
//                 lat[i] = pinLists[i].latitude;
//                 long[i] = pinLists[i].longitude;
//             }
//             // 日付の切り取り
//             settingRegistDay = settingDay(registDay);
//         })
//         .catch(function (e) {
//             pinListError();
//         });
// }



// ドロワーメニュー
document.getElementById('drawerOpen').addEventListener('click', () => {
    document.getElementById("drawerNavi").style.width = "60%";
    document.getElementById("drawerContents").style.visibility = "visible";
});
document.getElementById('drawerClose').addEventListener('click', () => {
    document.getElementById("drawerNavi").style.width = "0%";
    document.getElementById("drawerContents").style.visibility = "hidden";
});

// 画面遷移
function transition(url) {
    document.getElementById('transform').style.width = "100%";
    setTimeout(transLocation, 200, url);
}
function transLocation(url) {
    window.location.href = url;
}

// 天気ON/OFF
var tenkiChk = true;

function tenki(tenki) {
    var indian = document.getElementById('indian');
    if (tenki.src.substring(tenki.src.length - 18, tenki.src.lengh) == 'images/tenkiOn.png') {
        tenki.src = 'images/tenkiOff.png';
        tenkiChk = false;
        indian.style.display = 'none';
    } else {
        tenki.src = 'images/tenkiOn.png';
        tenkiChk = true;
        indian.style.display = 'block';
    }
}

// weathercode.jsonの読み込み
window.addEventListener('load', function () {
    var request = new XMLHttpRequest();

    request.open('GET', 'weathercode.json');
    request.responseType = 'json';

    request.onload = function () {
        weathercodes = this.response;
    };

    request.send();
});