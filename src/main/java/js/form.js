// This is a JavaScript file
'use strict'

function formcheck(){
    var check_name = document.getElementById("name").value;
    if(check_name.len() == null || check_name == ""){
        window.alert("ピンに名前を付けてください！");
    }
}