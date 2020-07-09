let animal =
{
    text:"Животные",
    childs:
    [
        {
            text :"Млекопитающие", 
            childs : 
            [
                {text:"Коровы"},
                {text:"Ослы"},
                {text:"Собаки"},
                {text:"Тигры"}
            ]
        },

        {
            text:"Другие",
            childs:  
            [
                {text:"Змеи"},
                {text:"Птицы"},
                {text:"Ящерицы"}
            ]
        }
    ]
}

let fish = 
{
    text:"Рыбки",
    childs:
    [
        {
            text: "Аквариумные",
            childs:
            [
                {text:"Гуппи"},
                {text:"Скалярии"}
            ]
        },

        {
            text:"Морские",
            childs:
            [
                {text:"Морская форель"}
            ]
        }
    ]
}

function List(prnt, tmp)
{
    let li = document.createElement("li");
    li.innerHTML = tmp.text;

    if(tmp.hasOwnProperty("childs"))
    {

        let ul = document.createElement("ul");
       
        
        for (let i of tmp.childs)
        {
            List(ul, i);
        }

        li.appendChild(ul);
        
    }

    prnt.appendChild(li);
}

window.onload = function()
{
    let ul1 = document.createElement("ul");   
    let ul2 = document.createElement("ul");

    ul1.style.listStyleImage = "url(https://img.icons8.com/officel/16/000000/rhinoceros.png)";
    ul2.style.listStyleImage = "url(https://img.icons8.com/office/16/000000/fish.png)";

    List(ul1, animal);
    List(ul2, fish);
    
    let body = document.getElementsByTagName("body");
    body[0].appendChild(ul1);
    body[0].appendChild(ul2);
}