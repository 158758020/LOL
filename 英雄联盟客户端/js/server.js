window.onload= function () {
    var more = document.querySelector(".moreServers");
    var list = document.querySelector(".server_list");

    more.onclick = function () {
        console.log("aaa");
        startMove(list,{opacity:100,left:0})
    };
};

