exports.createCasperjsCourse = function (casper){
// things to improve.
// capture errors on the page (too many char in name, etc.) and echo while exiting;
// waitfor() on each field before filling form
// add assertion on assistant's name and webpage box text when not entered in first verification
// pass found no empty boxes msg multiple times, make one time
// change text in final assertTitle msg
//test 

	casper.then(createPage);
	
	function createPage(){
		function Course(){
			
			var content = {
				courseName: ['#edit-title', 'Ghostology For Everyone. How ghosts can help. Like by making this course name very long', 'h1.node-title'],
				courseNumber: ['#edit-field-course-code-und-0-value', 'GHOSTOLOGY-101. THIS-IS-COURSE-NUMBER', 'h1.node-title'],
				courseWebsiteTitle: ['#edit-field-course-website-und-0-title', 'Casperjs is a ghost but helpful one. Learn more by this link', 'section#section-course-website'],
				courseWebsiteUrl: ['#edit-field-course-website-und-0-url', 'http://www.casperjs.org/', 'section#section-course-website a'],
				assistantName: ['#edit-fgm-node-course-page-form-group-teacher-assistants-fields-items-0-field-teacher-assistant-s-name-und-value', 'Mrs.Ghostly. Some relative to Casperjs.', 'section#section-teacher-assistant'],
				assistantEmail:['#edit-fgm-node-course-page-form-group-teacher-assistants-fields-items-0-field-teacher-assistant-s-email-und-email','ghostly@dongeon.com', 'section#section-teacher-assistant']
			};
			var required = [
				'courseName',
				'courseNumber'
				];
			
			this.initElem = function (){
				for (var elem in content){
					var curElem = content[elem];
					curElem[4]=false;
				}					
			};
			
			this.initElem();
			
			this.fillCourseForm = function (elems){
				for (var elem in content){
					var curElem = content[elem];
					if (elems)
						fillFormCommon();
					else
						for (var requiredElem in required)
							if (required[requiredElem]==elem)
								fillFormCommon();
				}
				function fillFormCommon (){
						curElem[4]=true;
						casper.evaluate(function(cElem, cValue){
							document.querySelector(cElem).setAttribute('value',cValue);
						},{
							cElem: curElem[0],
							cValue: curElem[1]
						});	
				};
			
			};
		
			this.verifyCoursePage = function (elems){
				for (var elem in content){
					var curElem = content[elem];
					if (curElem[4]){
						if (elem =='courseWebsiteUrl')
							//casper.test.assertSelectorHasText((curElem[2])[0].href, curElem[1]);
							this.assertElementVIP(curElem)
						else
							casper.test.assertSelectorHasText(curElem[2], curElem[1]);
						}
					else {
						casper.test.assertDoesntExist(curElem[2], 'Found No emtpty boxes');
					};
				}
			};
			
			this.capture = function (cat){
				casper.capture(cat);
			};
			
			this.assertElementVIP = function (elem){
				var text = casper.evaluate(function(cElem, cValue){
					return document.querySelectorAll(cElem)[0].href;
					},{
						cElem: elem[2],
						cValue: elem[1]
					});
				casper.test.assert(text == elem[1],'Found ' + elem[1] + ' within element '+ elem[2]);
			};
			
			this.assertTitle = function (){
				var curElem = content.courseName;
				if (casper.getTitle()!==curElem[1] + ' | Lassonde School of Engineering'){					
					casper.echo('FAIL openning course create page');	
					casper.exit();
				}
				else {
					casper.echo('PASS openning ' + '"' + curElem[1] + '"' + 'course page');
				};
				
			};
		};
		
		var currCourse = new Course();

		casper.then(function (){
			currCourse.fillCourseForm();
		});
				
		casper.then(function (){
			casper.click('#edit-submit');
		});
		
		casper.then(function (){
			currCourse.assertTitle();
		});
			
		casper.then(function (){
			currCourse.verifyCoursePage();
		});
		
		casper.then(function (){
			this.clickLabel('Edit', 'a');
		});
		
		casper.then(function (){
			currCourse.fillCourseForm(1);
		});
		
		casper.then(function (){
			this.click('#edit-submit');
		});
		
		casper.then(function () {
			currCourse.verifyCoursePage();
		});

		casper.then(function () {
			currCourse.assertTitle();
		});
		
	};	

		casper.then(function(){
			this.capture('course-page.png');
		});
	
};
