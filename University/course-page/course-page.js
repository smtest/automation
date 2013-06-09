exports.openCreateCoursePage = function (casper){
	casper.open(url + '/node').then(function(){
		if (casper.getTitle()!=='Create Course page | School'){	
			
			casper.echo('FAIL openning course create page');	
			casper.exit();
		}
		else {
			casper.echo('PASS openning course create page');
		};
	});
	};