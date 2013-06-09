var casper = require('casper').create();
casper.options.viewportSize = {width: 1366, height: 768};
// module to navigate to home page
var navModule = require('./nav-to-page');
//var spiderModule = require('./spider-rainbowbars');
var mainheaderModule = require('./mainheader-test');

// start test suit
casper.start().then(
	function(){
	this.echo('--Start!')
});

<<<<<<< HEAD
var url;

=======
//var url = 'http://lassondedev.devcloud.acquia-sites.com';
var url = 'http://localhost:8080/articles-page/12';
//var url = 'http://lassonde.yorku.ca/articles-page/12'
//var url = 'http://lassonde.yorku.ca/accept'
>>>>>>> 837a7986e8a3d2aa86262669280f55ecd681a9ca
casper.then(function (){
	navModule.navToPage(casper, url);
});

casper.then(function () {
	mainheaderModule.mainheader(casper, url);
});
	
casper.then(function () {
	//verifyElementsModule.elements(casper, url);
});
//	end test suit
casper.run(function(){
	this.echo('--Done!');
	this.exit();
});
