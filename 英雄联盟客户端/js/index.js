window.onload = function () {

    var enterance = document.getElementsByClassName("loginBox_entrance");
    var enterances = enterance[0].getElementsByTagName("a");
    var loginPage = document.getElementsByClassName("loginBox_login");
    var list = document.getElementsByClassName("loginBox_login_list");
    var lists = list[0].getElementsByTagName("li");
    var loginCons = document.querySelectorAll(".loginBox_login_con>ul>li");
    var qq_ways = document.querySelectorAll("[class^=qq_way]");
    var changeWays = document.querySelectorAll("[class^=changeWay]");
    var rememberUser = document.querySelector(".remember_userName");
    var rememberReadme = document.querySelectorAll(".remember_readMe");
    var qqUsers = document.querySelectorAll(".qqUsers div");
    var nameInput = document.querySelector(".userName");
    var pwdInput = document.querySelector(".userPwd");
    var historyBtn = document.querySelector(".historyBtn");
    var history = document.getElementsByClassName("history");
    var historyUl = history[0].getElementsByTagName("ul")[0];
    var historyQQ = history[0].getElementsByTagName("li");
    var enterGame1 = document.querySelector(".enterGame1");
    var noAllowed = document.querySelector(".noAllowed");
    var mask = document.querySelector(".mask");
    var notice = document.querySelector(".notice");

    var usersInfo = [];

    //加载账号密码库
    $.ajax({
        url:"./source/userInfo.json",
        dataType:"json",
        success: function (data) {
            usersInfo = data;
            console.log(usersInfo);
        },
        error: function (e) {
            console.log(e);
        }
        
    });
    //初始化操作
    init();
    function init(){
        //1.历史qq号动态添加
        var usersName = getUsersName();
        for(var i = 0; i < usersName.length; i++){
            var li = document.createElement("li");
            li.innerHTML = usersName[i];
            historyUl.appendChild(li);
        }
    }
    //滚动条插件的初始化
    $(".history").mCustomScrollbar();
    //入口按钮点击事件
    for (var i = 0; i < enterances.length; i++) {
        enterances[i].setAttribute("index", i);
        enterances[i].onclick = function () {
            //入口按钮模块消失
            enterance[0].style.display = "none";
            //登录页面出现
            loginPage[0].style.display = "block";
            startMove(loginPage[0], {opacity: 100}, 6);

            //获取按钮对应的index
            var index = parseInt(this.getAttribute("index"));
            //触发相应的点击事件
            var ev = new Event("click");
            lists[index].dispatchEvent(ev);
        }
    }
    //登录方式点击事件
    for (var i = 0; i < lists.length; i++) {
        lists[i].setAttribute("index", i);
        lists[i].onclick = function () {
            if (this.classList.contains("list_qq_on") || this.classList.contains("list_wx_on")) {
                return false
            }
            //这里返回的属性值为字符串类型,而case里是“===”比较，所以要统一数据类型
            var index = parseInt(this.getAttribute("index"));
            //按index修改list
            switch (index) {
                case 0:
                    lists[index].className = "list_qq_on";
                    lists[index + 1].className = "list_wx_off";


                    break;
                case 1:
                    lists[index].className = "list_wx_on";
                    lists[index - 1].className = "list_qq_off";

                    break;
            }
            //按index修改con:排他法
            for (var i = 0; i < loginCons.length; i++) {
                loginCons[i].style.opacity = 0;
                loginCons[i].style.display = "none";
            }
            loginCons[index].style.display = "block";
            startMove(loginCons[index], {opacity: 100}, 15);
        }
    }
    //切换快捷登录方式点击事件
    for (var i = 0; i < changeWays.length; i++) {
        changeWays[i].onclick = function () {
            if (this.classList.contains("changeWay1")) {
                //切换至快速登录页面
                    //1.先让账号登录页面渐出，再回调函数中让快速登录页面渐入
                startMove(qq_ways[0], {opacity: 0}, 3, function () {
                    qq_ways[0].style.display = "none";
                    qq_ways[1].style.display = "block";
                    startMove(qq_ways[1], {left: 0, opacity: 100}, 3)
                });
            } else{
                    //2.先让快速登录页面渐出，再回调函数中让账号登录页面渐入
                startMove(qq_ways[1], {left: -5, opacity: 0}, 3, function () {
                    qq_ways[1].style.display = "none";
                    qq_ways[0].style.display = "block";
                    startMove(qq_ways[0], {opacity: 100}, 3)
                });
            }
        };
    }
    //记住用户名点击事件
    rememberUser.onclick = function () {
        //切换图标
        this.classList.toggle("checked");
        //是否记住用户名
        rememberName();
    };
    //阅读协议点击事件
    for (var i = 0; i < rememberReadme.length; i++) {
        //为每一个“我已阅读”添加绑定事件
        rememberReadme[i].onclick = function () {
            if (this.classList.contains("checked")) {
                //为三个“我已阅读”同时取消勾选
                for (var i = 0; i < rememberReadme.length; i++) {
                    rememberReadme[i].classList.remove("checked");
                }
            } else {
                //为三个“我已阅读”同时勾选
                for (var i = 0; i < rememberReadme.length; i++) {
                    rememberReadme[i].classList.add("checked");
                }
            }

        }
    }
    //快速登录用户选择点击事件
    for (var i = 0; i < qqUsers.length; i++) {
        qqUsers[i].onclick = function () {
            for (var i = 0; i < qqUsers.length; i++) {
                qqUsers[i].classList.remove("cur");
            }
            this.classList.add("cur");
        }
    }
    //历史qq按钮点击事件
    historyBtn.onclick = function () {
        if (history[0].classList.contains("show")) {
            //利用css实现动画
            history[0].classList.remove("show");
            //设置2毫秒列表消失
            setTimeout(function () {
                history[0].style.display = "none";
            }, 200)
        } else {
            //先让列表block
            history[0].style.display = "block";
            //在让列表以动画出现
            setTimeout(function () {
                history[0].classList.add("show");
            }, 100);
        }

    };
    document.onclick = function () {
        if(history[0].classList.contains("show")){
            var e = document.createEvent("MouseEvents");
            e.initEvent("click", true, true);
            historyBtn.dispatchEvent(e);
        }
    };
    //历史qq点击事件
    for (var i = 0; i < historyQQ.length; i++) {
        historyQQ[i].addEventListener("click", function () {
            nameInput.value = this.innerHTML;
            historyBtn.click();
        })
    }
    //进入游戏点击按钮
    enterGame1.onclick = function () {
        var name = nameInput.value;
        var pwd = pwdInput.value;
        var flag = false;

        if (!rememberReadme[0].classList.contains("checked")) {
            //如果没有勾选“我已阅读”，弹出2号提示框
            notice.style.display = "block";
            noAllowed.classList.add("noAllowed2");
            startMove(noAllowed, {top:282,opacity: 100});
            return
        }
        //遍历数据库中的用户信息
        for(var i = 0; i < usersInfo.length; i++){
            //如果用户输入的账号密码与数据库中相等，则让flag=true
            if(usersInfo[i].name === name && usersInfo[i].pwd === pwd){
                flag = true;
            }
        }
        if(flag){
            //账号密码正确，进入游戏
            enterGame();
            //如果记住密码，则一同保存
            rememberName();
        }else{
            //账号密码错误，弹出1号提示框
            notice.style.display = "block";
            noAllowed.classList.add("noAllowed1");
            startMove(noAllowed, {top:282,opacity: 100});
        }

    };
    //登录提示框的点击事件
    noAllowed.onclick = function () {
        startMove(this,{top:312,opacity:0},6,function () {
            noAllowed.className = "noAllowed";
            noAllowed.style.top = 252 + "px";
            notice.style.display = "none";
        })
    };

//自定义函数

    //1.进入服务器选择页面
    function enterGame(){
        //遮罩出现,正在登陆提示框出现
        mask.classList.add("on");
        //记住账号的当前状态

        //2s登录时间后跳转页面
        setTimeout(function () {
            mask.classList.remove("on");
            location.replace("server.html")
        },2000)
    }
    //2.记住用户名
    function rememberName(){
        if(nameInput.value !=""){
            var name = nameInput.value;
            if(rememberUser.classList.contains("checked")){
                appendUsersName(name);
            }else{
                //删除该用户名记录
                delUsersName(name);

            }
        }
    }

};

