
/*	requestAnimationFrame兼容函数	*/
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    }
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    }
})();

screenContainer('js-nopad');						//	container满屏高度设置
window.onresize = screenContainer;


$(function(){
	mqfix();																//	IE8媒体查询样式延迟显示的处理
	// scrollPosfix('pos-fix');								//	fixed定位元素的横向滚动显示
	scrollShow('.js-scroller','x-show',0);	//	滚动定位元素
	goTop('.js-gotop');											//	返回顶部
	// haScroll('.js-ha');											//	哈希锚点滚动
//	sideBarPos('.side-bar',1250,45);			//	侧边栏定位调用
	$('input, textarea').placeholder();			//	调用placeholder插件
});

/*$(function () {
    var bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scroll = $(document).scrollTop();

	var zmheader = $('.x-header');
    //获取要定位元素距离浏览器顶部的距离
    console.log($('.banner-container').offset().top);
    var navH = zmheader.offset().top;
    console.log(navH);
    //滚动条事件
    $(window).scroll(function(){
        //获取滚动条的滑动距离
        var scroH = $(this).scrollTop();
        // console.log(scroH);
        //滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
        if(scroH>=navH){
            zmheader.css({"position":"fixed","top":0});
        }else if(scroH<navH){
            zmheader.css({"position":"static"});
        }
    });
});*/

/* Function */

/*	IE8媒体查询样式延迟显示的处理	*/
function mqfix(){
	var load = $('<div style="position: fixed; left: 0; top: 0; right: 0; bottom: 0; background: #fff; z-index: 999999;"></div>');
	$('body').append(load[0]);
	$(window).on('load',function(){
		if ($.support.leadingWhitespace){
			load.fadeOut(100, function(){
				load.remove();
			});
		}else{
			setTimeout(function(){
				load.fadeOut(100, function(){
					load.remove();
				});
			}, 600);
		}
	});
}

/*	哈希锚点滚动	*/
function haScroll(cls){	//	cls-[字符串]	类名，侦测作为锚点的 A 元素和 非 A 元素 cls 的点击事件触发锚点跳转（目标为 A 元素的 href 或 非 A 元素 cls 的 data-x-href），目标的 data-x-offset 为偏移量，负值向上偏移，正值向下偏移
	var lAnchors = location.hash;
	var lOffset;
	if($(lAnchors).length){
		lOffset = $(lAnchors).data('x-offset') || 0;

		$('body, html').stop().animate({scrollTop: $(lAnchors).offset().top - lOffset}, 1);
	}

	$('a[href^="#"], ' + cls).on('click', function(e){
		var cAnchors = $(this).attr('href') || $(this).data('x-href');
		if(/#$/.test(cAnchors)) return;
		var cOffset = $(cAnchors).data('x-offset');
		var cOffset = $(cAnchors).data('x-offset') || 0;
		var target = e.target;

		if(typeof cOffset === 'string'){
			cOffset = $(cOffset).height();
		}else if(typeof cOffset === 'number'){
			cOffset = cOffset;
		}else{
			cOffset = 0;
		}

		if($(cAnchors).length && (target == this ? true : !(/(INPUT|TEXTAREA|BUTTON|SELECT|A)/i).test(target.tagName))){
			e.preventDefault();
			$('body, html').stop().animate({scrollTop: $(cAnchors).offset().top - cOffset}, 400);
		}
	});
}

/*	随机正负1	*/
function ranPlus(){
	var ran = Math.random();
	return Math.random()>0.5?1:-1
}

/*	获取滚动条宽度	*/
function getScrollBarWidth(){
	var rw = 0, wh = 0, bh = 0;
	wh = $(window).height();
	bh = $('body').height();
	if(bh > wh){
		if(!$('body').data('scrollBarWidth')){
			$('body').append('<div class="fnScrollBarWrap" style="position: fixed; left: 0; top: 0; width: 100px; height: 100px; overflow: auto; visibility: hidden; z-index: -9999;"><div class="fnScrollBarInner" style="width: 100%; height: 200px;"></div></div>');
			rw = 100-$('.fnScrollBarInner').width();
			$('body').data('scrollBarWidth', rw);
			$('.fnScrollBarWrap').remove();
		}else{
			rw = $('body').data('scrollBarWidth');
		}
	}
	return rw;
}

/*	多行文本省略号	*/
function ellipsis(e,h){
	$(e).each(function(){
			var $p = $(this);
			while ($p.outerHeight() > h) {
				$p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
			}
	});
}

/*	滚动定位元素	*/
function scrollShow(ele,cls,range){	//	ele-[字符串] 类名(要加‘.’) 元素对象; cls-[字符串] 类名(不要加‘.’) 对象显示状态样式名； range-[整数] window 的 scrollTop 大于 range 时 ele 添加 cls
	var posbtm = parseInt($(ele).css('bottom'));

	foo();

	$(window).on('resize', foo);

	$(window).on('scroll', foo);

	function foo(){
		if($(window).scrollTop() > range){
			if(!$(ele).hasClass(cls)){
				$(ele).addClass(cls);
			}
			if(($(window).scrollTop() + $(window).height()) > $('.x-footer').offset().top){
				$(ele).css('bottom', $(window).scrollTop() + $(window).height() - $('.x-footer').offset().top + 10 +'px');
			}else{
				if(parseInt($(ele).css('bottom')) != posbtm){
					$(ele).css('bottom', posbtm +'px');
				}
			}
		}else{
			if($(ele).hasClass(cls)){
				$(ele).removeClass(cls);
			}
		}

//		if($('.x-wrap').innerWidth() < $('.x-container').width()){
//			$(ele).css({'left': '50%', 'right': 'auto', 'margin-left': $('.x-wrap').innerWidth() / 2 + 10 +'px'});
//		}else{
//			$(ele).css({'left': 'auto', 'right': '0', 'margin-left': '0px'});
//		}
	}
}



/*	container满屏高度设置	*/
function screenContainer(cls){	//	cls-[字符串] 类名(不要加‘.’) 当x-container设置此类名时，函数不会为x-container添加padding值来填充x-header的高度
	var container = $('.x-container');
	var header = $('.x-header');
	var footer = $('.x-footer');

	foo();

	function foo(){
		var wHeight	= $(window).height();
		var hHeight	= header.innerHeight()+1;
		var fHeight	= footer.innerHeight();
        if(header.css('position') === 'fixed' || header.css('position') === 'absolute'){
			if(container.hasClass(cls)){
				container.css({'min-height' : wHeight - fHeight + 'px'});
			}else{
				if(container.css('box-sizing') === 'border-box'){
					container.css({'min-height' : wHeight - fHeight + 'px'});
				}else{
					container.css({'min-height' : wHeight - fHeight - hHeight + 'px'});
				}
			}
		}else{
			container.css({'min-height' : wHeight - fHeight - hHeight + 'px'});
		}
	}

	$(window).on('load', foo);
	$(window).on('resize', foo);
}

/*	fixed定位元素的横向滚动显示	*/
function scrollPosfix(ele){	//	ele-[字符串] 类名(不要加‘.’)
	foo();

	$(window).on('scroll', foo);

	function foo(){
		var posEle = $('.'+ele);
		if($(window).scrollLeft()>0){
			if(posEle.hasClass(ele)){
				posEle.css('margin-left', -$(window).scrollLeft() + 'px');
			}else{
				posEle.css('margin-left', '0px');
				posEle = null;
			}
		}
	}
}

/*	返回顶部	*/
function goTop(cls){	//	cls-[字符串]	类名
	$(cls).on('click', function(){
		$('body, html').stop().animate({scrollTop: 0}, 400 + $(window).scrollTop() * 0.3);
	});
}

/*	基于xRoll触发的翻滚计数器，[par]需调用xRoll	*/
function rollNumber(par, rate, cld, data, dur){	//par, rate-回调函数提供的参数 cld-数字子集 data-子集data名(用来存储数字) dur-滚动时间
	par.find(cld).each(function(){
		var ele = $(this),
				demo = { score: 0 },
				num = ele.data(data) + '',
				fix = num.split('.') || num,
				len = fix.length > 1 ? fix[1].length : 0;

		if(ele.data('onOff') === undefined){
			ele.data('onOff', true);
		}

		if(rate < 0){
			ele.data('onOff', true);
			ele.text(0);
		}else if(rate >= 1){
			if(ele.data('onOff')){
				ele.data('onOff', false);
				TweenMax.to(demo, dur, {score: num, onUpdate: showScore, onUpdateParams: [ele, demo, len]});
			}
		}

	});

	function showScore(p1, p2, p3) {
		p1.text(p2.score.toFixed(p3));
	}
}

/*	获取外部坐标相对于元素中心点的距离与弧度、角度，函数返回对象{dist: ,rad: ,ang: }	*/
function getAngle($ele, mx, my) {	//	参数 $ele - 元素，mx - 外部x坐标，my - 外部y坐标
	if(!$ele.data('cp')){
		$ele.data('cp', {x: $ele.offset().left + $ele.width() / 2, y: $ele.offset().top +  $ele.height() / 2});
	}

	var rel_x = mx - $ele.data('cp').x;
	var rel_y = my - $ele.data('cp').y;
	var val = {};

	val.dist = Math.sqrt(rel_x * rel_x + rel_y * rel_y);
	val.rad = Math.acos( - rel_y / val.dist);
	val.rad = (rel_x > 0) ? val.rad : 2 * Math.PI - val.rad;
	val.ang = val.rad * (180 / Math.PI);

	return val;
}

function scorllAnimate(ele,c){
	var _offsetAnimate = $(ele).offset().top;
	var _scroll1Animate = $(window).scrollTop() + $(window).height()/2;
	if(!c){
		c = "anim";
	}
	if(_scroll1Animate >= _offsetAnimate){
		$(ele).addClass(c);
	} else {
		$(ele).removeClass(c);
	}
}
/* ******************************************************************************************************************* */
