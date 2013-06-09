exports.navToPage=function (casper, url){
	var userName, passWord;
	casper.setHttpAuth(userName, passWord);
	//navige to home page
	casper.echo("--Openning "+ url);
	casper.thenOpen(url, function(){
		this.echo("--Opened "+this.getCurrentUrl());
		//this.test.assertTitle('School', 'getting to home page');
		});
	return true;
};