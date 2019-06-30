var win_width = 0;
var win_height = 0;
var scaling_ratio = 1;
var current_lattice_over = 0;
var div_all_position = 0;
var lattice_switch_1 = 0;
var lattice_switch_2 = 0;
var lattice_switch_3 = 0;

var this_browser_type = 'chrome'
var tangimg = document.getElementsByTagName("img");

function fn_lattice_hidden(num) {
    document.getElementById("div_lattice_" + num + "_3bg").className = "";
    document.getElementById("div_lattice_" + num + "_3").className = "div_lattice_3 lattice_3_high_to_low";
    if (current_lattice_over != 0) {
    }
}

function fn_lattice_show(pmt1) {
    document.getElementById("div_lattice_" + pmt1 + "_3bg").className = "div_lattice_bg";
    document.getElementById("div_lattice_" + pmt1 + "_3").className = "div_lattice_3 lattice_3_low_to_high";
    if (current_lattice_over != pmt1) {
        // current_lattice_over = pmt1;
    }
}

function getData(event) {
    var e = event || window.event;
    //获取滚动距离(FF每次滚动 data为3或者-3，其他为120或者-120)
    //获取滚动距离(safari每次滚动 data为12或者-12)
    var data = e.detail || e.wheelDelta;

    if (this_browser_type == "firefox") {
        data = -data * 40
    }

    div_all_position += data;
    if (div_all_position > 0) {
        div_all_position = 0;
    }

    window.setTimeout(function () {
        fn_lattice_switch(1)
    }, 0);

    if (div_all_position < (win_height - 2880 * scaling_ratio)) {
        div_all_position = win_height - 2880 * scaling_ratio;
    }

    if (win_height > 2880 * scaling_ratio) {
        div_all_position = 0;
    }

    if (this_browser_type == "msie") {
        document.getElementById("div_0").style.top = div_all_position + "px";
    } else {
        document.getElementById("div_0").style.top = div_all_position / scaling_ratio + "px";
    }

}

function mouse_wheel() {
    if (document.addEventListener && !document.attachEvent) {
        document.addEventListener('mousewheel', getData);
        //FF绑定滚动事件
        document.addEventListener('DOMMouseScroll', getData);
    }
    //IE
    else if (document.attachEvent && !document.addEventListener) {
        document.attachEvent('onmousewheel', getData);
    } else {
        window.onmousewheel = getData;
    }
}

window.addEventListener("load", mouse_wheel, false);



function findDimensions() //函数：获取尺寸
{
    //获取窗口宽度
    if (window.innerWidth) {
        win_width = window.innerWidth;
    } else if ((document.body) && (document.body.clientWidth)) {
        win_width = document.body.clientWidth;
    }

    //获取窗口高度
    if (window.innerHeight) {
        win_height = window.innerHeight;
    } else if ((document.body) && (document.body.clientHeight)) {
        win_height = document.body.clientHeight;
    }

    //通过深入Document内部对body进行检测，获取窗口大小
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        win_width = document.documentElement.clientWidth;
        win_height = document.documentElement.clientHeight;
    }

    scaling_ratio = win_width / 1920;
    document.getElementById("div_0").style.zoom = scaling_ratio;
    /*document.getElementById("div_top").style.zoom = scaling_ratio;
    document.getElementById("div_1").style.zoom = scaling_ratio;
    document.getElementById("div_2").style.zoom = scaling_ratio;
    document.getElementById("div_2_col").style.zoom = scaling_ratio;
    document.getElementById("div_3").style.zoom = scaling_ratio;
    document.getElementById("div_4").style.zoom = scaling_ratio;
    document.getElementById("div_5").style.zoom = scaling_ratio;
    document.getElementById("div_6").style.zoom = scaling_ratio;
    document.getElementById("div_7").style.zoom = scaling_ratio;
    document.getElementById("div_8").style.zoom = scaling_ratio;*/

    window.setTimeout(function () {
        fn_lattice_switch(0)
    }, 0);
}

findDimensions();

//调用函数，获取数值  浏览器被重置大小执行onresize
window.onresize = findDimensions;

function fn_lattice_switch(pmt1) {
    /*document.getElementById("div_lattice_1").style.display = "block";
    document.getElementById("div_lattice_2").style.display = "block";
    document.getElementById("div_lattice_3").style.display = "block";
    document.getElementById("div_lattice_1").className = "div_lattice_0 opacity_0_to_1_slow";
    document.getElementById("div_lattice_2").className = "div_lattice_0 opacity_0_to_1_slow";
    document.getElementById("div_lattice_3").className = "div_lattice_0 opacity_0_to_1_slow";
    document.getElementById("div_lattice_7").style.display = "block";
    document.getElementById("div_lattice_8").style.display = "block";
    document.getElementById("div_lattice_9").style.display = "block";
    document.getElementById("div_lattice_7").className = "div_lattice_0 opacity_0_to_1_slow";
    document.getElementById("div_lattice_8").className = "div_lattice_0 opacity_0_to_1_slow";
    document.getElementById("div_lattice_9").className = "div_lattice_0 opacity_0_to_1_slow";
    document.getElementById("div_lattice_4").style.display = "block";
    document.getElementById("div_lattice_5").style.display = "block";
    document.getElementById("div_lattice_6").style.display = "block";
    document.getElementById("div_lattice_4").className = "div_lattice_0 opacity_0_to_1_slow";
    document.getElementById("div_lattice_5").className = "div_lattice_0 opacity_0_to_1_slow";
    document.getElementById("div_lattice_6").className = "div_lattice_0 opacity_0_to_1_slow";*/
}
