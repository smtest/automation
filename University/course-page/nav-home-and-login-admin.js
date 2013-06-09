exports.navAndLogin=function (casper,url){

	var userName='', passWord='';

	casper.setHttpAuth(userName, passWord);
	
	casper.echo('--Openning user page');
	//navige to user login page
	casper.thenOpen(url + '/user', function(){
		casper.test.assertTitle('User login | School', 'getting in user login page');
		});
	
	//login
	casper.then(function(){

		casper.fill('form#user-login',{
		'name': userName,
		'pass': passWord
		}, true);
		
	}

	);
	
	casper.then(function (){
		casper.test.assertTitle('admin | School', 'loggin success');
	})

};