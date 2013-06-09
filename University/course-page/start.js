var casper = require('casper').create();
casper.options.viewportSize = {width: 1366, height: 768};
// module to navigate to home page and login as admin
var navAndLogingModule = require('./nav-home-and-login-admin');
// module to open course create page
var openCreateCoursePageModule = require('./course-page');
// module to create course page and test elements
var courseClass = require('./Course');
// start test suit
casper.start().then(
	function(){
	this.echo('--Start!')
	});
// url to integration env. usr/pwd need to be entered 
var url;
//	do http basic authorization, login as admin
casper.then(function openHomePageAndLogin () {
	navAndLogingModule.navAndLogin(casper, url);
	});
casper.then(function createCourse () {
	openCreateCoursePageModule.openCreateCoursePage(casper, url);
	});
casper.then(function () {
	courseClass.createCasperjsCourse(casper);
	});
//	end test suit
casper.run(function(){
	this.echo('--Done!');
	this.exit();
	});