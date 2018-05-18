/*
	Utils.showTip('请勾选同意免责声明');
*/

;(function(window,document,$){
	window.Utils = window.Utils || {};

	var tip = null;
	var box = null;
	var tipTimer = null;
	window.Utils.showTip = function(text,opts){
		var defaults = {
			seconds : 1000,
			backgroundColor:'#000',
			color:'#fff',
			fontSize : '1.5em',
			fontWeight: 'bold',
			fontfamily:'serif',
			width : 'auto',
			height : 'auto',
			padding : '.625em 1.2em .625em 1.2em',
			borderRadius : '0.25em',
			position : 'fixed',
			zIndex : '99998',
			opacity :0.7,
			textAlign : 'center',
			lineHeight : '180%'
		};
		$.extend( defaults, opts);
		if(!tip){
			tip = document.createElement('div');
			document.body.appendChild(tip);
			tip.style.backgroundColor = defaults.backgroundColor;
			tip.style.color = defaults.color;
			tip.style.fontSize = defaults.fontSize;
			tip.style.fontWeight = defaults.fontWeight;
			tip.style.fontFamily = defaults.fontFamily;
			tip.style.width = defaults.width;
			tip.style.height = defaults.height;
			tip.style.padding = defaults.padding;
			tip.style.borderRadius = defaults.borderRadius;
			tip.style.position = defaults.position;
			tip.style.opacity  = defaults.opacity;
			tip.style.zIndex = defaults.zIndex;
			tip.style.textAlign = defaults.textAlign;
			tip.style.lineHeight = defaults.lineHeight;
			box = document.createElement('div');
			document.body.appendChild(box);
			box.style.background = '#fff';
			box.style.width = '100%';
			box.style.height = '100%';
			box.style.opacity  = '0';
			box.style.zIndex = '99999';
			box.style.position = 'absolute';
			box.style.left = '0';
			box.style.top = '0';
		}
		if(!box){

		}

		tip.innerHTML = text;
		tip.style.display = 'inline-block';
		//tip.className = 'tip';

		tip.style.top = (document.documentElement.clientHeight/2 - tip.offsetHeight/2) + 'px';
		tip.style.left = (document.documentElement.clientWidth/2 - tip.offsetWidth/2) + 'px';
		$(tip).fadeIn(0);
		$(box).fadeIn(0)

		if(tipTimer) clearTimeout(tipTimer);
		tipTimer = setTimeout(function(){
			$(tip).fadeOut(500);
			$(box).fadeOut(500);
		},defaults.seconds);
	}
})(window,document,$);