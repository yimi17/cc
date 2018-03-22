(function(){
    var header = document.getElementById("header"),
        oUl = header.querySelector("ul"),
        oTab = header.querySelectorAll(".tab span"),
        length = oTab.length;   //图片个数
        w = header.offsetWidth; //移动宽
        index = 0,      //当前序号
        sX = 0,         //初始x坐标
        sLeft = 0,      //初始left值
        timer = null;   //定时器

    oUl.addEventListener("touchstart",function(e){
        clearInterval(timer);
        sX = e.changedTouches[0].pageX;
        sLeft = parseInt(getComputedStyle(this).marginLeft);
    })
    oUl.addEventListener("touchmove",function(e){
        var X = e.changedTouches[0].pageX - sX;
        this.style.marginLeft = sLeft + X + "px";        
    })
    oUl.addEventListener("touchend",function(e){
        var X = e.changedTouches[0].pageX - sX;
        if(X > 30){         //向右拖动
            index --
        }else if(X < 30){   //向左拖动
            index ++
        }
        this.className = "tran";
        this.style.marginLeft = -(index+1) + "00%";
        auto();
    })
    //过渡动画结束时触发的事件
    oUl.addEventListener("transitionend",function(){
        this.className = "";
        if(index > length-1){   //最后一张时跳到第一张
            index = 0
        }else if(index < 0){    //第一张时跳到最后一张
            index = length -1
        }
        this.style.marginLeft = -(index+1) + "00%";
        for(var i=0;i<length;i++){ oTab[i].className = ""}
        oTab[index].className = "on";
    })

    auto();
    //自动轮播
    function auto(){
        timer = setInterval(function(){
            index ++;
            oUl.className = "tran";
            oUl.style.marginLeft = -(index+1) + "00%";
        },3000)
    }
})();