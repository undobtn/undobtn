
var $window = $(window), gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();

$(function () {
    // setup garden
	$loveHeart = $("#loveHeart");
	var offsetX = $loveHeart.width() / 2;
	var offsetY = $loveHeart.height() / 2 - 55;
    $garden = $("#garden");
    gardenCanvas = $garden[0];
	gardenCanvas.width = $("#loveHeart").width();
    gardenCanvas.height = $("#loveHeart").height()
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);
	
	$("#content").css("width", $loveHeart.width() + $("#code").width());
	$("#content").css("height", Math.max($loveHeart.height(), $("#code").height()));
	$("#content").css("margin-top", Math.max(($window.height() - $("#content").height()) / 3, 10));
	$("#content").css("margin-left", Math.max(($window.width() - $("#content").width()) / 2, 10));

    // renderLoop
    setInterval(function () {
        garden.render();
    }, Garden.options.growSpeed);
});

$(window).resize(function() {
    var newWidth = $(window).width();
    var newHeight = $(window).height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

function getHeartPoint(angle) {
	var t = angle / Math.PI;
	var x = 18.5 * (16 * Math.pow(Math.sin(t), 3));
	var y = - 19 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
	return new Array(offsetX + x, offsetY + y);
}

function startHeartAnimation() {
	var interval = 50;
	var angle = 10;
	var heart = new Array();
	var animationTimer = setInterval(function () {
		var bloom = getHeartPoint(angle);
		var draw = true;
		for (var i = 0; i < heart.length; i++) {
			var p = heart[i];
			var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
			if (distance < Garden.options.bloomRadius.max * 1.3) {
				draw = false;
				break;
			}
		}
		if (draw) {
			heart.push(bloom);
			garden.createRandomBloom(bloom[0], bloom[1]);
		}
		if (angle >= 30) {
			clearInterval(animationTimer);
			showMessages();
		} else {
			angle += 0.2;
		}
	}, interval);
}

(function($) {
	$.fn.typewriter = function() {
		this.each(function() {
			var $ele = $(this), str = $ele.html(), progress = 0;
			$ele.html('');
			var timer = setInterval(function() {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? ' ' : ''));
				if (progress >= str.length) {
					clearInterval(timer);
				}
			}, 100);
		});
		return this;
	};
})(jQuery);

function timeElapse(date){
	// var current = Date();
	// var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
	// var days = Math.floor(seconds / (3600 * 24));
	// seconds = seconds % (3600 * 24);
	// var hours = Math.floor(seconds / 3600);
	// if (hours < 10) {
	// 	hours = "0" + hours;
	// }
	// seconds = seconds % 3600;
	// var minutes = Math.floor(seconds / 60);
	// if (minutes < 10) {
	// 	minutes = "0" + minutes;
	// }
	// seconds = seconds % 60;
	// if (seconds < 10) {
	// 	seconds = "0" + seconds;
	// }
	// var result = "<span class=\"digit\">" + days + "</span> Days <span class=\"digit\">" + hours + "</span> Hours <span class=\"digit\">" + minutes + "</span> Minutes <span class=\"digit\">" + seconds + "</span>Seconds"; 
	// $("#elapseClock").html(result);
}

function showMessages() {
	adjustWordsPosition();
	$('#messages').fadeIn(5000, function() {
		showLoveU();
	});
}

function adjustWordsPosition() {
	$('#words').css("position", "absolute");
	$('#words').css("top", $("#garden").position().top + 195);
	$('#words').css("left", $("#garden").position().left + 70);
}

function adjustCodePosition() {
	$('#code').css("margin-top", ($("#garden").height() - $("#code").height()) / 2);
}

function showLoveU() {
	$('#loveu').fadeIn(3000);
}

function GetDateDiff(startDate,endDate)  
{  
    var startTime = new Date(Date.parse(startDate.replace(/-/g,   "/"))).getTime();     
    var endTime = new Date(Date.parse(endDate.replace(/-/g,   "/"))).getTime();     
    var dates = Math.abs((startTime - endTime))/(1000*60*60*24);     
    return  dates;    
}
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

var time_now_server,time_now_client,time_end,time_server_client,timerID,timeSpan;
time_end=new Date("2016 03 14 13:10:50");
time_end=time_end.getTime();
timeSpan=parseInt(GetDateDiff("2016/3/14",getNowFormatDate()));
console.log(timeSpan);


time_now_server=new Date("2015 11 14 17:30:30");
time_now_server=time_now_server.getTime();
time_now_client=new Date();
time_now_client=time_now_client.getTime();
time_server_client=time_now_server-time_now_client;
setTimeout("show_time()",1000);
function show_time(){
var time_now,time_distance,str_time;
var int_day,int_hour,int_minute,int_second;
var time_now=new Date();
time_now=time_now.getTime()+time_server_client;
time_distance=time_end-time_now;
if(time_distance>0){
int_day=Math.floor(time_distance/86400000)
time_distance-=int_day*86400000;
int_hour=Math.floor(time_distance/3600000)
time_distance-=int_hour*3600000;
int_minute=Math.floor(time_distance/60000)
time_distance-=int_minute*60000;
int_second=Math.floor(time_distance/1000)
if(int_hour<10)
int_hour="0"+int_hour;
if(int_minute<10)
int_minute="0"+int_minute;
if(int_second<10)
int_second="0"+int_second;
// str_time=int_day+"天"+int_hour+"小时"+int_minute+"分钟"+int_second+"秒";
// timer.innerHTML=str_time;
int_day=int_day-timeSpan;
var result = "<span class=\"digit\">" + int_day + "</span> Days <span class=\"digit\">" + int_hour + "</span> Hours <span class=\"digit\">" + int_minute + "</span> Minutes <span class=\"digit\">" + int_second + "</span>Seconds  "; 
	$("#elapseClock").html(result);

setTimeout("show_time()",1000);
}else{
clearTimeout(timerID)
} 
}
