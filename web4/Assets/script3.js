/* 4_3 */

let table = document.querySelector('.table');
let table2 = document.querySelector('.table2');

function fillTable(table, arr)
{
    for(let i = 0; i < 8; i++)
    {
        let tr = document.createElement('tr');

        for(let j = 0; j < 8; j++)
        {
            let td=document.createElement('td');
            td.innerHTML = arr[i][j];
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }
}

let arr = new Array(8);
//sozdat matricy
let bt_bf = document.querySelector('.bt_bf');
let kon = 0;

bt_bf.onclick=function()
{    
    if(kon == 0)
    {
        for(let i=0; i < 8 ; i++)
        {
            arr[i] = new Array(8);
            for(let j = 0; j < 8; j++)
            {
                arr[i][j] = Math.floor(Math.random()*(+30)-15);
            }
        }

        fillTable(table, arr);
        kon++;
        table.className = "border";
    }
}




let bt_af = document.querySelector('.bt_af');
let kon1 = 0;
bt_af.onclick=function()
{
        //swipe 
    let maxk = -1;
    let stl = 0;
    for(let i = 0; i < 8; i++)
    {
        let k = 0;
        for(let j = 0; j < 8; j++)
        {
            if(arr[j][i] > 0)
            {
                k++;            
            }
            
        }    

        if(k > maxk)
        {
            maxk = k;
            stl = i;
        }

    }
    console.log(maxk);


    console.log(arr);
    let tmp;
    for(let i = 0; i < 8; i++)
    {
        tmp = arr[i][stl];
        arr[i][stl] = arr[i][i];
        arr[i][i] = tmp;
    } 

    if(kon1==0)
    {
        fillTable(table2, arr);
        kon1++;
        table2.className = "border";
    }  
}