/* 4_2 */

let inp = document.querySelector('.key');
let inp2 = document.querySelector('.key_2');
let but_2 = document.querySelector('.bt_2');

but_2.onclick= function ()
{
    let x = inp2.value;
    let n = inp.value;
    let sum = 1;    

    function fact(n)
    {
        return (n != 1) ? n * fact(n - 1) : 1;
    }

    for(let i = 0; i<n; i++)
    {
        sum += Math.pow(x,(i+1)*2)/fact((i+1)*2) * (i % 2 == 0?-1:1);
    }

    document.getElementById("otvet_2").innerHTML = "Ответ: " + sum;

    return false;
}