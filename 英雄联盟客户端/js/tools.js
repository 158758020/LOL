window.onload= function () {

    var tool_voice = document.querySelector(".tool_voice");
    var video = document.querySelector("video");
    var bgm = document.querySelector("#bgm");
    var confirm = document.querySelector(".server_con_bottom");
    //tool_voice点击事件的flag1
    var flag1 = true;
    console.log("111");
    //右上角声音点击事件
    tool_voice.onclick = function () {
        if (flag1) {
            console.log(222);
            //锁住点击事件
            flag1 = false;
            //修改音量图标
            this.classList.toggle("tool_voice2");
            if (this.classList.contains("tool_voice2")) {
                //音量逐渐降低，海报动画暂停
                volumeFade(bgm, 0);
                video.pause();
            } else {
                //音量逐渐增加，海报动画开始
                volumeFade(bgm, 1);
                video.play();
            }
        }
    };

    //自定义函数
    //1.声音逐渐变小和逐渐变大
    function volumeFade(obj, target, fn) {
        clearInterval(obj.timer);
        var speed = 0.5;
        obj.timer = setInterval(function () {
            speed -= 0.1;
            var cur = obj.volume;
            if (target == 0) {
                obj.volume = Math.round((cur - speed) * 100) / 100;
            } else {
                obj.volume = Math.round((cur + speed) * 100) / 100;
            }
            if (obj.volume == 0 || obj.volume == 1) {
                clearInterval(obj.timer);
                flag1 = true;
                if (fn)fn();
            }
        }, 200)
    }

};