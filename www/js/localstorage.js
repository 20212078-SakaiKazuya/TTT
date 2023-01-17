// This is a JavaScript file

function saveLocalStorage(long,lati){
    var longitude = long;   // 経度
    var latitude = lati;    // 緯度

    // ローカルストレージに保存
    localStorage.setItem('longitude', longitude);
    localStorage.setItem('latitude', latitude);

    // マップ画面に遷移
    document.location.href = 'index.html';
}