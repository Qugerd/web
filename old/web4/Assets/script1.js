/* 4_1 */

let storona_1=document.querySelector('.storona_1');
let storona_2=document.querySelector('.storona_2');

let but=document.querySelector('.bt_1');

but.onclick= function ()
{
    let a = +storona_1.value;
    let b = +storona_2.value;
    let c = a * b;
    
    document.getElementById("otvet").innerHTML = "Ответ: " + c;
    
    return false;
}