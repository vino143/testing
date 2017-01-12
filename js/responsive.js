var stageWidth=1024,stageHeight=768,scale;
function Responsive()
{
	fitIntoWindow();
	this.scale=function()
	{
		$(window).resize(function()
		{
			fitIntoWindow();
		});
	}
}
function fitIntoWindow()
{
	var leftPos=0;
	var height=$(window).innerHeight();
	var width=$(window).innerWidth();
	height=height/768;
	width=width/1024;
	scale=Math.min(width,height);
	var scaleRatio='scale('+scale+')';	
	leftPos=($(window).innerWidth()-(1024*scale))/2;
	$('body').css({position:'absolute',top:'0px',left:leftPos+'px',transform:scaleRatio,padding:0,margin:0});
}