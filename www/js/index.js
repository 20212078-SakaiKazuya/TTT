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
    if (tenki.src.substring(tenki.src.length - 18, tenki.src.lengh) == 'images/tenkiOn.png') {
        tenki.src = 'images/tenkiOff.png';
        tenkiChk = false;
    } else {
        tenki.src = 'images/tenkiOn.png';
        tenkiChk = true;
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