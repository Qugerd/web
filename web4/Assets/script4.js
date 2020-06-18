/* 4_4 */

let bt_3=document.querySelector('#bt_3');

function getRandomInt(a, b)
{
    return ((b - 1 - a)*Math.random() + a);
}

function getArray(n) 
{
    var Arr = [];
    for(var i = 0; i < n; i++)
    {
        Arr[i] = parseInt(getRandomInt(0, n * 10));
    }
    return Arr;
}

function getResultArray(Arr)
{
    var Temp;
    for(var i = 0; i < Arr.length; i++)
    {
        for(var j = 0; j < Arr.length - i - 1; j++)
        {
            if(Arr[j] > Arr[j+1]){
                Temp = Arr[j];
                Arr[j] = Arr[j+1];
                Arr[j+1] = Temp;
            }
        }
    }
    return Arr;
}

let p = 0;
function creatmas()
{
    
    let n = parseInt(document.getElementById('n').value);
   
    if(isNaN(n))
    {
        alert("NO");
    }

    else 
    {        
        if(p == 0)
        {        
            let arr = getResultArray(getArray(n * n));
            console.log(arr);
            let table = document.querySelector('#table');

            for(let i = 0; i < n; i++)
            {
                let tr = document.createElement('tr');

                for(let j = 0; j < n; j++)
                {
                    let td = document.createElement('td');

                    if(i % 2 == n % 2)
                    {
                        td.innerHTML = arr[(n - 1 - i) * n + j];
                    }

                    else
                    {
                        td.innerHTML = arr[(n - i - 1) * n + (n - j -1)];
                    }
                    
                    tr.appendChild(td);
                }
            
                table.appendChild(tr);
            }
            p++;    
        }
    }     
}