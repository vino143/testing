var qstData =[20,100];
var correctAns = [], numData =[] , numVal = 5, leftPos = 0;
var partitionPos = [[172,300,428,556,684,812],[172,236,300,364,428,492,556,620,684,748,812],[],[172,179,185,192,198,205,211,217,224,230,236,243,250,256,262,268,275,282,288,294,301,307,314,320,326,333,339,346,352,358,364,371,377,384,391,397,404,410,416,422,429,435,442,448,454,461,467,474,480,487,493,499,506,512,518,525,531,537,544,550,557,563,570,576,582,588,595,601,608,614,621,627,634,640,646,653,659,666,672,679,685,691,698,704,711,717,723,730,736,742,748,755,762,768,774,781,788,794,800,807,814]];
var rulerIndex = 0, orignalIndex = 0, clear, zVal = 6;
function gameStart() {
	assignPartitionPos();
	activateEvents();
	generateQst();
	clear = setInterval(function() {
		$('#helpBtn').toggleClass('btnActive');
	},150);
	setTimeout(function() {
		window.clearInterval(clear);
		$('#helpBtn').removeClass('btnActive');
	},2000);
}
function assignPartitionPos() {
	var pos = 172;
	for(var i = 0; i <= 20; i++) {
		partitionPos[2].push(pos);
		pos = pos + 32;		
	}
}
function generateQst() {
	//$('.marker').hide();
	$('.marker').show().css({left:'172px'});
	$('#redMarker').css({zIndex:4})
	var indexVal = 0;
	numVal = 5;
	rulerIndex = 0, orignalIndex = 0;
	qstData =[20,100];
	qstData.sort(function() { return 0.5 - Math.random()});
	qstData.length = 1;
	qstData.push(5);
	qstData.push(10);
	qstData.sort(function(a, b){return a-b});
	$.each(qstData,function(k,d) {
		var num = Math.floor(Math.random() * d) + 1;
		if(num == d) {
			num = num - 1;
		}
		if(d == 10) {
			if(num == (numData[0] + numData[0])) {
				num = 9;
			}
		}
		else if(d == 20) {
			if(num == (numData[1] + numData[1])) {
				num = 19;
			}
		}
		else if(d == 100) {
			if(num == (numData[1] + numData[1])) {
				num = 91;
			}
		}
		numData.push(num);
		$('#qstData').children('p').eq(k).text(num+'/'+d);
		$('.qstTxt').eq(k).text(num+'/'+d);
		correctAns.push(num/d);
		correctAns.push((num/d)* 100);
	});
	 $('.btn').each(function(k,d) {
		if(qstData.indexOf(parseInt($(this).text())) == -1) {
			//$(this).off('click').addClass('disablePartition');
		}
		else {
			$(this).attr('orignalIndex',indexVal);
			indexVal++;
		}
	}); 
	//$('#redTxt').text('0/5');
	$('.ruler').hide();
	$('#ruler1').show();
	$('#btn1').addClass('btnActive');
	rulerIndex = 0;
	//setRulerPos();
}
function activateEvents() {
	$('.btn').off('click').on('click', shwRuler);
	$('#nxtBtn').off('click').on('click', shwNxtQst);
	$('#helpBtn').off('click').on('click', shwHelp);
	$('#clsBtn').off('click').on('click', hideHelp);
	$('input').off('keyup').on('keyup',enableSubmitBtn).keypress(function(evt) {
		evt = (evt) ? evt : window.event;
		var charCode = (evt.which) ? evt.which : evt.keyCode;
		if(charCode == 46) {
			return true;
		}
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			return false;
		}
		return true;
	});
	
	$('.marker').draggable({axis:'x',zIndex: 1000,start: setPos, drag:onDrag, stop:setzIndex});
}
function setzIndex(event, ui) {
	$(this).css({zIndex:zVal});
	zVal++;
}
function setPos(event, ui) {
	//leftPos = findClosest(ui.position.left);
	ui.position.left = "0px";
	ui.position.top = "0px";
}
function onDrag(event, ui) {
	leftPos = findClosest(ui.position.left);
	ui.position.left = leftPos;
	if(ui.position.left <= 172){ui.position.left = 172;}
	if(ui.position.left >= 815){ui.position.left = 815;}
	var currElem = ($(this).attr('index'));
	$('.traingleTxt').eq(currElem).text(partitionPos[rulerIndex].indexOf(leftPos)+ '/'+numVal);
}
function findClosest (currentPos) {
	var closest = partitionPos[rulerIndex].reduce(function (prev, curr) {
	  return (Math.abs(curr - currentPos) < Math.abs(prev - currentPos) ? curr : prev);
	});
	return closest;
}
function shwHelp() {
	$(this).addClass('btnActive');
	$('#popup').show();
	$('#audioPlayer').attr('src','../audios/help.mp3');
	$('#audioPlayer')[0].play();
}
function hideHelp() {
	$(this).parent().hide();
	$('#helpBtn').removeClass('btnActive');
	$('#audioPlayer')[0].pause();
}
function enableSubmitBtn() {
	var isEmpty = false;
	$('input').each(function() {
		if($(this).val() == '') {
			isEmpty = true;
		}
	});
	if(!isEmpty) {
		$('#submitBtn').off('click').on('click',validateAns).css({opacity: '1.0', cursor: 'pointer'});
	}
	else {
		$('#submitBtn').off('click').css({opacity: '0.5', cursor: 'default'});
	}
}
function shwRuler() {
	numVal = $(this).text();
	var prevIndex;
	//$('.traingleTxt').text('');
	$('.btn').removeClass('btnActive');
	$(this).addClass('btnActive');
	$(".ruler").hide();
	$('#ruler'+$(this).attr('ruler')).show();
	prevIndex = orignalIndex;
	orignalIndex = parseInt($(this).attr('orignalIndex')) || '';
	rulerIndex = parseInt($(this).attr('ruler')) - 1;
	if($(this).attr('id') == 'btn4') {
		orignalIndex = 2;
	}
	if(orignalIndex == '') {
		orignalIndex = prevIndex;
	}
	if($(this).attr('id') == 'btn1') {
		orignalIndex = 0;
	}
	//$(".marker,.traingleTxt").hide();//css({left:'172px'});
	for(var i=0; i <= orignalIndex; i++) {
		$('.marker').eq(i).show().css({zIndex:i+1});
		$(".traingleTxt").eq(i).show();
	}
	setRulerPos();
}
function setRulerPos() {
	$('.marker').each(function(k,d) {
		var posVal = $(this).position().left;
		var closest = partitionPos[rulerIndex].reduce(function (prev, curr) {
			return (Math.abs(curr - posVal) < Math.abs(prev - posVal) ? curr : prev);
		});
		posVal = closest;
		$(this).css({left:posVal+'px'});
		posVal = partitionPos[rulerIndex].indexOf(posVal);
		if(posVal != -1)
		$(".traingleTxt").eq(k).text(posVal+'/'+numVal)
	});
}
function validateAns() {
	var isWrong = false;
	$('.wrong').hide();
	$('input').each(function(k,v) {
		if($(this).val() != correctAns[k]) {
			isWrong = true;
			$('.wrong').eq(k).show();
		}
	});
	if(isWrong) {
		$('#validateCover').css({background:'rgba(0, 0, 0, 0.2) url(../images/wrong.png)'}).fadeIn('slow');
		$('#audioPlayer').attr('src','../audios/wrong.mp3');
		$('#audioPlayer')[0].play();
	}
	else {
		$('#validateCover').css({background:'rgba(0, 0, 0, 0.2) url(../images/right.png)'}).fadeIn('slow');
		$('#audioPlayer').attr('src','../audios/correct.mp3');
		$('#audioPlayer')[0].play();
	}
	setTimeout(function() {
		$('#validateCover').fadeOut('slow');
		if(!isWrong){shwNxtQst();}
	},2000);
}
function shwNxtQst() {
	$('input').val('');
	$('.wrong').hide();
	$('.traingleTxt').text('');
	$('#submitBtn').off('click').css({opacity: '0.5', cursor: 'default'});
	$('.btn').removeClass('disablePartition btnActive');
	correctAns = [], numData = [];
	activateEvents();
	zVal = 5;
	$('#redMarker').css({zIndex:4});
	$('#blueMarker').css({zIndex:3});
	$('#yellowMarker').css({zIndex:2});
	generateQst();
}