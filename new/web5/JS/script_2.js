function Recur(childNodes)
{
    console.log(childNodes);
    let cc = childNodes.children;

    if (cc.length > 0)
    {
        for( let i = 0; i < cc.length; i++)
            rec(cc[i]);
    }
}

Recur(document.getElementById("html"));