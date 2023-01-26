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

function transition(url, pinId) {
    document.getElementById('transform').style.width = "100%";
    setTimeout(transLocation, 200, url, pinId);
}
function transLocation(url, pinId) {
    window.location.href = url + '?pinId=' + pinId; // クエリパラメータの設定、getParam('pinId');でpinIdをstring型で取得できる。（要int型に変換）
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


// htmlの書き換え
window.onload = function () {
    const spinner = document.getElementById('loading');
    spinner.classList.add('loaded');
}

// 画像のアップロード
function getPictMac(imageData) {
    console.log('getPictMac');
    var picture = ncmb.DataStore("picture");
    picture.order('pictureID', true)
        .fetchAll()
        .then(function (result) {
            imgUpload(imageData, result[0].pictureID + 1);
        });
}

function imgUpload(imageData, pictid) {
    // ncmbに画像をアップロード
    console.log('imgUpload');
    var fileName = 'image' + pictid + ".png";
    var fileData = imageData;
    ncmb.File.upload(fileName, fileData)
        .then(function (re) {
            console.log('success');
        })
        .catch(function (er) {
            console.log('error' + er);
        });
}

function toBlob(base64, mime_type) {
    var bin = atob(base64.replace(/^.*,/, ''));
    var buffer = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i);
    }

    try {
        var blob = new Blob([buffer.buffer], {
            type: mime_type
        });
    } catch (e) {
        return false;
    }
    return blob;
}