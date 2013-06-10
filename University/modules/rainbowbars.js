exports.rainbowbars=function(casper){
	// this module is verifying presense and colors of all rainbow color bars
	casper.echo('--Verify that rainbow bars exist and have all colors')
	function objRainbowBar (clrs){

		this.violet ='rgb(158, 32, 100)',
		this.red ='rgb(208, 54, 44)',
		this.blue ='rgb(38, 69, 120)',
		this.light_blue='rgb(89, 164, 140)',
		this.yellow='rgb(240, 201, 41)'

	this.verify = function (){
	   if (this.violet == clrs[0]
	       && this.red == clrs[1]
		   && this.blue == clrs[2]
		   && this.light_blue == clrs[3]
		   && this.yellow == clrs[4]){
	       return true;
	       }
	   else {
	       return false;
	   }
	};
	}

	var rainbowBar = [
		'header#header',
		'section#content-footer',
		'footer#footer',
		'div#block-views-exp-articles-page',
	];

	var currentRainbowBar=0;

	casper.then(verifyIfAllRainbowBarsColorsOk);

	function verifyIfAllRainbowBarsColorsOk(){
		if (currentRainbowBar<rainbowBar.length){
		var divRainbowBar = new objRainbowBar(getColorsOfSelectedRainbowBar());
		casper.echo((divRainbowBar.verify())?'--PASS colors in ' + rainbowBar[currentRainbowBar]:'--FAIL colors in ' + rainbowBar[currentRainbowBar]);
		currentRainbowBar++;
		verifyIfAllRainbowBarsColorsOk();
		};
	};
	function getColorsOfSelectedRainbowBar(){
		var bcolors = [];
		bcolors = casper.evaluate(function getColorsFromElement(e) {
			var colorDivs=document.querySelectorAll(e);
			var colorInd =0;
			backgroundColorOfEachSection = function bcolorss(){
				if (colorInd<colorDivs.length){
					var style = window.getComputedStyle(colorDivs[colorInd], null);
					var color = style.getPropertyValue('background-color');
					colorInd++;
				}
					return color;
			};
				return Array.prototype.map.call(colorDivs, backgroundColorOfEachSection);
				}, rainbowBar[currentRainbowBar]+' div.rainbow-wrapper'+' div');
				return bcolors;
	};
	
};


