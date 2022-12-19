// This is a JavaScript file

/* SweetAlert2 */
// signup.jsで使用
function trueSignupUserAlert(){
    Swal.fire({
        title: '登録が完了しました',
        icon: 'success'
    }).then((result) => {
        console.log('新規ユーザーを登録');
        document.location.href = 'index.html';
    });
}
function falseSignupUserAlert(){
    Swal.fire({
        title: '登録に失敗しました',
        html: 'ユーザー名またはメールアドレスが使われています',
        icon: 'warning'
    }).then((result) => {
        console.log('登録できませんでした');
        document.location.href = 'signup.html';
    });
}
function signupNameCheck(){       // ユーザー名チェック
    Swal.fire({
        title: 'エラーが発生しました',
        html: 'ユーザー名が入力されていません',
        icon: 'warning'
    }).then((result) => {
        console.log('エラー: ユーザー名が未入力');
    });
}
function signupPassCheck(){       // パスワードチェック
    Swal.fire({
        title: 'エラーが発生しました',
        html: 'パスワードが入力されていません',
        icon: 'warning'
    }).then((result) => {
        console.log('エラー: パスワードが未入力');
    });
}
function signupMailCheck(){       // メールアドレスチェック
    Swal.fire({
        title: 'エラーが発生しました',
        html: 'メールアドレスが入力されていません',
        icon: 'warning'
    }).then((result) => {
        console.log('エラー: メールアドレスが未入力');
    });
}

// login.jsで使用
function nameCheck(){       // ユーザー名チェック
    Swal.fire({
        title: 'エラーが発生しました',
        html: 'ユーザー名が入力されていません',
        icon: 'warning'
    }).then((result) => {
        console.log('エラー: ユーザー名が未入力');
    });
}
function passCheck(){       // パスワードチェック
    Swal.fire({
        title: 'エラーが発生しました',
        html: 'パスワードが入力されていません',
        icon: 'warning'
    }).then((result) => {
        console.log('エラー: パスワードが未入力');
    });
}
function trueLoginAlert(){
   Swal.fire({
       title: 'ログインしました',
       icon: 'success'
       }).then((result) => {
       document.location.href = 'index.html';
   });
}
function falseLoginAlert(){
    Swal.fire({
        title: 'ログインできません',
        icon: 'error',
        }).then((result) => {
        document.location.href = 'login.html';
    });
}

// logout.jsで使用
function confirmLogout(){       // ログアウト確認
    Swal.fire({
        title: 'ログアウトしますか',
        showCancelButton: 'ture',
        icon: 'warning'
    }).then((result) => {
        if(result.value){
            logout();
        } else {
            Swal.fire({
                title: 'キャンセルしました',
                icon: 'success'
            }).then((result) => {
                console.log('ログアウトをキャンセル');
                document.location.href = 'index.html';
            });
        }
    });
} 
function logoutAlert(){
    Swal.fire({
        title: 'ログアウトしました',
        icon: 'success'
    }).then((result) => {
        document.location.href = 'title.html';
    });
}

// update.jsで使用
function errorAlert(){      // エラーアラート
    Swal.fire({
        title: 'エラーが発生しました',
        html: '設定画面に戻ります',
        icon: 'warning'
    }).then((result) => {
        document.location.href = 'setting.html';
    });
}
function errorName(){       // エラーアラート(ユーザー名未入力)
    Swal.fire({
        title: 'エラーが発生しました',
        html: 'ユーザー名が入力されていません',
        icon: 'warning'
    }).then((result) => {
        console.log('エラー: ユーザー名が未入力');
    });
}
function errorMailAddress(){       // エラーアラート(メールアドレス未入力)
    Swal.fire({
        title: 'エラーが発生しました',
        html: 'メールアドレスが入力されていません',
        icon: 'warning'
    }).then((result) => {
        console.log('エラー: メールアドレスが未入力');
    });
}
function errorPass(){       // エラーアラート(パスワード未入力)
    Swal.fire({
        title: 'エラーが発生しました',
        html: 'パスワードが入力されていません',
        icon: 'warning'
    }).then((result) => {
        console.log('エラー: パスワードが未入力');
    });
}
function sameUserName(){        // ユーザー名入力チェック
    Swal.fire({
        title: 'エラーが発生しました',
        html: '既に登録されているユーザー名です',
        icon: 'warning'
    }).then((result) => {
        console.log('エラー: ユーザー名が登録済');
        document.location.hred = 'setting.html';
    });
}
function updateUserName(){      // ユーザー名変更
    Swal.fire({
        title: '更新しました!',
        html: 'ユーザー名を更新しました',
        icon: 'success'
    }).then((result) => {
        console.log('ユーザー名を変更');
        document.location.href = 'setting.html';
    });
}
function updateUserPass(){      // パスワード変更
    Swal.fire({
        title: '更新しました!',
        html: 'パスワードを更新しました',
        icon: 'success'
    }).then((result) => {
        console.log('パスワードを変更');
        document.location.href = 'setting.html';
    });
}
function updateUserMailAddress(){      // メールアドレス変更
    Swal.fire({
        title: '更新しました!',
        html: 'メールアドレスを更新しました',
        icon: 'success'
    }).then((result) => {
        console.log('メールアドレスを変更');
        document.location.href = 'setting.html';
    });
}