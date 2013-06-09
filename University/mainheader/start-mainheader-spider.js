var casper = require('casper').create();
casper.options.viewportSize = {width: 1366, height: 768};
var navModule = require('./nav-to-page');
//var spiderModule = require('./spider-rainbowbars');
var mainheaderModule = require('./mainheader-spider');
// start test suit
casper.start().then(
	function(){
	this.echo('--Start!')
	});

var url;
casper.then(function () {
	navModule.navToPage(casper, url);
	});

casper.then(function () {
	mainheaderModule.mainheader(casper, url);
	});
	
//	end test suit
casper.run(function(){
	this.echo('--Done!');
	this.exit();
	});