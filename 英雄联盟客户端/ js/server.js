window.onload = function () {
    //工具栏tools元素
    var tool_voice = document.querySelector(".tool_voice");
    var video = document.querySelector("video");
    var bgm = document.querySelector("#bgm");
    var tool_back = document.querySelector(".tool_back");

    //页面元素
    var enterServer = document.querySelector("#enter");
    var selectServer = document.querySelector("#selectServer");
    var server_con = document.querySelector(".server_con");
    var more = document.querySelector(".moreServers");
    var list = document.querySelector(".server_list");
    var servers = document.querySelectorAll(".server_list li");
    var serverIcons = document.querySelectorAll(".serverIcon li");
    var left = document.querySelector(".toLeft");
    var right = document.querySelector(".toRight");
    var name = document.querySelector(".nameMask img");
    var allLine = document.querySelector(".small_quanwang");
    var lastTime = document.querySelector(".small_lastTime");
    var lastName = document.querySelector(".small_lastTime span");
    var lastPic = document.querySelector(".small_lastTime img");
    var enter = document.querySelector(".server_con_bottom");
    //存储当前服务器的index；
    var index = 0;

    //初始化操作
    init();
    function init(){
        var last = getLastServer();
        var imgNum = last.index+1;//数字类型imgNum
        imgNum = imgNum>9?String(imgNum):"0"+String(imgNum);//转为字符串形式并为小于10的号码补0；
        lastName.innerHTML = last.name;
        lastPic.src = "img/SMALL_10"+imgNum+".png";
    }
    //入场动画
    setTimeout(function () {
        server_con.classList.add("show");
    },150);
    //右上角声音点击事件
    tool_voice.onclick = function () {
        voiceSwitch.apply(this, [video, bgm]);
    };
    //右上角返回点击事件
    tool_back.onclick = function () {
        server_con.classList.remove("show");
        setTimeout(function () {
            location.replace("index.html");
        },200)
    };
    //展开服务器列表按钮
    more.onclick = function () {
        if (list.classList.contains("show")) {
            list.classList.remove("show");
            list.classList.add("off");
        } else {
            list.classList.remove("off");
            list.classList.add("show");
        }
    };
    //服务器按钮点击事件
    for (var i = 0; i < servers.length; i++) {
        (function (i) {
            //为每一个服务器按钮保存一个index属性
            servers[i].index = i;
            //获取上次登录的信息；
            var last = getLastServer();
            //绑定点击事件
            servers[i].onclick = function () {
                //音效
                selectServer.currentTime = 0;
                selectServer.play();
                //保存当前服务器的index；
                index = this.index;
                //排他：服务器按钮排他
                for (var i = 0; i < servers.length; i++) {
                    servers[i].classList.remove("cur");
                }
                //为当前点击的按钮添加cur类名
                this.classList.add("cur");
                //排他：服务器大图排他
                for (var i = 0; i < serverIcons.length; i++) {
                    serverIcons[i].classList.remove("cur");
                }
                //为当前的服务器添加cur类名显示大图
                serverIcons[index].classList.add("cur");
                //修改服务器名称的src
                var nameNum = index+1>9?String(index+1):"0"+String(index+1);
                name.src = "img/name"+nameNum+".png";
                //如果点击的服务器是小图标服务器的其中一个
                switch (index){
                    case 27:
                        allLine.classList.add("cur");
                        lastTime.classList.remove("cur");
                        break;
                    case last.index:
                        allLine.classList.remove("cur");
                        lastTime.classList.add("cur");
                        break;
                    default:
                        allLine.classList.remove("cur");
                        lastTime.classList.remove("cur");
                }
            }
        })(i)
    }
    //左右方向键点击事件
    left.onclick = function () {
        //如果当前的index==0
        index = index==0?servers.length-1:index-1;
        //自动点击服务器按钮
        autoClick(servers[index]);
    };
    right.onclick = function () {
        //如果当前的index==servers.length-1,让index+1；
        index = index==servers.length-1?0:index+1;
        autoClick(servers[index]);
    };
    //右上角小图标点击事件
    allLine.onclick = function () {
        //男爵领域的index是27；
        index = 27;
        autoClick(servers[index]);
    };
    lastTime.onclick = function () {
        var last = getLastServer();
        index = last.index;
        autoClick(servers[index]);
    };
    //确认选择点击事件
    enter.onclick = function () {
        var name = servers[index].innerText;
        enterServer.play();
        server_con.classList.remove("show");
        saveLastServer(index,name);
        setTimeout(function () {
            location.replace("https://lol.qq.com/main.shtml");
        },1000)

    }
};

//自定义函数
//1.服务器按钮的自动点击
function autoClick(obj){
    // IE浏览器
    if (document.all) {
        obj.click();
    }
    // 其它浏览器
    else {
        var e = document.createEvent("MouseEvents");
        e.initEvent("click", true, true);
        obj.dispatchEvent(e);
    }
}
