let animal =
{
    text:"Животные [2]",
    childs:
    [
        {
            text :"Млекопитающие [4]", 
            childs : 
            [
                {text:"Коровы"},
                {text:"Ослы"},
                {text:"Собаки"},
                {text:"Тигры"}
            ]
        },

        {
            text:"Другие [3]",
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
    text:"Рыбки [2]",
    childs:
    [
        {
            text: "Аквариумные [2]",
            childs:
            [
                {text:"Гуппи"},
                {text:"Скалярии"}
            ]
        },

        {
            text:"Морские [1]",
            childs:
            [
                {text:"Морская форель"}
            ]
        }
    ]
}

function List(prnt, tmp, idk)
{

    let li = document.createElement("li");

    if(tmp.hasOwnProperty("childs"))
    {
        let a = document.createElement("a");
        a.id = "#" + prnt.id + "_" + idk;
        a.className = "my_btn";
        a.innerHTML = tmp.text;
        li.appendChild(a);
        
        let ul = document.createElement("ul");
        ul.className = "collapse";
        ul.id = prnt.id + "_" + idk;

        for(let x = 0; x < tmp.childs.length; x++)
        {
            List(ul, tmp.childs[x], x);
            li.className = "po";
        }

        li.appendChild(ul);        
    }

    else
    {
        li.innerHTML = tmp.text;
    }

    prnt.appendChild(li);
}

$(function()
{
    let ul1 = document.createElement("ul");
    ul1.id = "main";

    List(ul1, animal, 0);
    List(ul1, fish, 1);
    
    let body = document.getElementsByTagName("body");
    body[0].appendChild(ul1);

    $(".my_btn").click(function (e) 
    {
        $(this.id).toggleClass("collapse");
        e.preventDefault();
    })
});