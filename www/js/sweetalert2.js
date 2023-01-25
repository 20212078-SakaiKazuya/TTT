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
function errorSettingAlert(){      // エラーアラート
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
function sameUserMail(){        // メールアドレス入力チェック
    Swal.fire({
        title: 'エラーが発生しました',
        html: '既に登録されているメールアドレスです',
        icon: 'warning'
    }).then((result) => {
        console.log('エラー: メールアドレスが登録済');
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

// pin.jsで使用
function pinListError(){
    Swal.fire({
        title: 'エラーが発生しました',
        html: 'マップに戻ります',
        icon: 'warning'
    }).then((result) => {
        document.location.href = 'index.html';
    });
}

// updateDataStore.jsで使用
function pinRename(pinid){
    Swal.fire({
        html: '新しい名前を入力してください',
        showCancelButton: 'true',
        input: 'text',
        inputPlaceholder: 'ここに入力'
    }).then(function(result) {
        if(result.value){
            pinRenameReceive(pinid, result.value);
        } else {
            Swal.fire({
                html: 'キャンセルしました',
            }).then((result) => {
                console.log('ピンの名前の変更をキャンセル');
            });
        }
    });
}
function changeTrueBookmarkAlert(pinId) {
    Swal.fire({
        html: 'ブックマークに登録しますか？',
        showCancelButton: 'true'
    }).then((result) => {
        if(result.value) {
            trueChangeBookmark(pinId);
        } else {
            Swal.fire({
                html: 'キャンセルしました',
            }).then((result) => {
                console.log('ブックマークの登録をキャンセル');
            });
        }
    });
}
function changeReleaseBookmarkAlert(pinId) {
    Swal.fire({
        html: 'ブックマークを解除しますか？',
        showCancelButton: 'true'
    }).then((result) => {
        if(result.value) {
            releaseChangeBookmark(pinId);
        } else {
            Swal.fire({
                html: 'キャンセルしました',
            }).then((result) => {
                console.log('ブックマークの解除をキャンセル');
            });
        }
    });
}
function resultPinReName() {
    Swal.fire({
        title: '更新しました！',
        html: 'ピンの名前を変更しました',
        icon: 'success'
    }).then((result) => {
        console.log('ピンの名前の変更完了');
        window.location.reload();
    });
}
function trueBookmark() {
    Swal.fire({
        html: 'ブックマークに登録しました',
        icon: 'success'
    }).then((result) => {
        console.log('ブックマークフラグ更新完了');
    });
}
function releaseBookmark() {
    Swal.fire({
        html: 'ブックマークを解除しました',
        icon: 'success'
    }).then((result) => {
        console.log('ブックマークフラグ更新完了');
    });
}
function falseBookmark() {
    Swal.fire({
        title: 'エラーが発生しました',
        html: '変更をキャンセルしました',
        icon: 'warning'
    }).then((result) => {
        console.log('ブックマークフラグ更新失敗');
    }); 
}

// deleteDataStore.jsで使用
function confirmPinDelete(pinId){
    var pinID = pinId;
    Swal.fire({
        html: 'このピンを削除しますか？',
        showCancelButton: 'true'
        }).then((result) => {
            if(result.value) {
                pinRemove(pinID);
            } else {
                Swal.fire({
                    html: 'キャンセルしました',
                    }).then((result) => {
                        console.log('ピンの削除キャンセル');
                    });
            }
        });
}
function truePinDelete() {
    Swal.fire({
        title: '削除しました！',
        html: '選択したピンを削除しました',
        icon: 'success'
    }).then((result) => {
        console.log('ピンの削除完了');
        window.location.reload();
    });
}
function falsePinDelete() {
    Swal.fire({
        title: 'エラーが発生しました',
        html: '削除をキャンセルしました',
        icon: 'warning'
    }).then((result) => {
        console.log('ピンの削除失敗');
    });
}