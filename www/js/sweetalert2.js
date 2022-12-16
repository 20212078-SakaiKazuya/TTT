// This is a JavaScript file

/* SweetAlert2 */
// login.htmlで使用
function trueLoginAlert(){
   Swal.fire('ログインしました').then((result) => {
       document.location.href = 'index.html';
   });
}