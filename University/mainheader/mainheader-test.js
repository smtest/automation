exports.mainheader=function (casper,url){
	var fs = require('fs');
	casper.echo('--Getting positions of mainheader links on the page');
	var linksPage=[];
	var linksFile=[];
	var next=0;
	var nextSf;
	var dataFile = './mainheaderDataBroken.js';
	var posData;
	var dataPositions;
	var failResults=[];

	function readModuleFile(){
		if (fs.exists(dataFile)){
			posData = require(dataFile);
			linksFile = new posData.mainheaderData();
		}
		else {
			return false;
		}
	};
	function getMainNavLinks(e){
		var links = casper.evaluate(function () {
		var dataObject=[];
		var linksText=document.querySelectorAll('#menu-bar ul li a');
			for (var text in linksText){
				if (linksText[text].textContent){
					var box= linksText[text].getBoundingClientRect();
					var _id;
						if (linksText[text].parentNode.id){
							_id = linksText[text].parentNode.id;
						}
						else
						{
							_id = linksText[text].parentNode.parentNode.id;
						}
						dataObject.push([linksText[text].textContent, '#'+_id, [box.top], [box.left], [box.height]]);
				}
			}
			return dataObject;
		});
	
		for (var i in links){
			if (links[i]!=='undefined')
				linksPage[i]=links[i];
		};
		nextSf=nextLink(1);
	};
	
	function updateBoxParam(){
		for (var i=0;i<linksPage.length;i++){	
			var box=casper.evaluate(function (e){
				return document.querySelector(e).getBoundingClientRect();
			},{e: linksPage[i][1]});
			linksPage[i][2]=linksPage[i][2].concat(box.top);
			linksPage[i][3]=linksPage[i][3].concat(box.left);
			linksPage[i][4]=linksPage[i][4].concat(box.height);
		};		
			nextSf=nextLink();
	};
	
	function nextLink(e){
		if (!e){
			next++;
		};	
		if (next<linksPage.length){
			while (linksPage[next][2][0]==0){
				if (next>=linksPage.length-1)
					return '';
				next++;
			}
			return linksPage[next][1];
		};
		return '';
	};
	
	function addToArr(msg){
		if (function (){
			var i=failResults.length;
			while(i--){
				if (failResults[i]===msg){
				return false;
				};
			};
			return true;
		});
		failResults.push(msg);
	};	
	function verifyHeaderLinksData(){
		if (typeof linksFile!==typeof linksPage&&typeof linksFile!=='object'){
			casper.echo('--FAIL: '+'dataFile'+' is not valid. Run page spider');
			return false;
		};
		var triggerB;
		for (var i=0;i<linksPage.length;i++){
			triggerB=false;	
			for (var j=0;j<linksFile.length;j++){
			
				if (typeof linksFile[j]!=='object'){
					casper.echo('--FAIL: '+'dataFile'+' is not valid. Run page spider');
					return false;
				};
				if (linksPage[i].length!==linksFile[j].length){
					casper.echo('--FAIL: '+'dataFile'+' is not valid. Run page spider');
					return false;					
				};
				if (typeof linksFile[j][0]!=='string'||typeof linksFile[j][1]!=='string'){
					casper.echo('--FAIL: '+'dataFile'+' is not valid. Run page spider');
					return false;
				};
				if (linksPage[i][1]==linksFile[j][1]&&i!==j){
					addToArr('--FAIL '+linksPage[i][0]+' is in wrong place');
				};
				if (linksPage[i][0]==linksFile[j][0]&&linksPage[i][1]==linksFile[j][1]){
					triggerB=true;
					if (linksPage[i][1]!==linksFile[j][1]){
						addToArr('--FAIL '+linksPage[i][0]+' has a wrong node id');
					};
					if (!compareArrays(linksPage[i][2],linksFile[j][2])){
						addToArr('--FAIL '+linksPage[i][0]+' has a wrong top position');
					};
					if (!compareArrays(linksPage[i][3],linksFile[j][3])){
						addToArr('--FAIL '+linksPage[i][0]+' has a wrong left position');
					};
					if (!compareArrays(linksPage[i][4],linksFile[j][4])){
						addToArr('--FAIL '+linksPage[i][0]+' has a wrong height(text size)');
					};
				};
			};
			if (!triggerB) addToArr('--FAIL '+linksPage[i][0]+' is not in a data file');
		};
		
		if (typeof linksFile!==typeof linksPage&&typeof linksFile!=='object'){
			casper.echo('--FAIL: '+'dataFile'+' is not valid. Run spider 1');
			return false;
		};
		var triggerA;
		for (var ii=0;ii<linksFile.length;ii++){
			triggerA=false;
			for (var jj=0;jj<linksPage.length;jj++){
				
				if (typeof linksPage[jj]!=='object'){
					casper.echo('--FAIL: '+'dataFile'+' is not valid. Run page spider');
					return false;
				};
				if (linksFile[ii].length!==linksPage[jj].length){
					casper.echo('--FAIL: '+'dataFile'+' is not valid. Run page spider');
					return false;					
				};
				if (typeof linksPage[jj][0]!=='string'||typeof linksPage[jj][1]!=='string'){
					casper.echo('--FAIL: '+'dataFile'+' is not valid. Run page spider');
					return false;
				};
				if (linksFile[ii][1]==linksPage[jj][1]&&ii!==jj){
					addToArr('--FAIL '+linksFile[ii][0]+' is in wrong place');
				};
				if (linksFile[ii][0]==linksPage[jj][0]&&linksFile[ii][1]==linksPage[jj][1]){
					triggerA=true;
					if (linksFile[ii][1]!==linksPage[jj][1]){
						addToArr('--FAIL '+linksFile[ii][0]+' has a wrong node id');
					};
					if (!compareArrays(linksFile[ii][2],linksPage[jj][2])){
						addToArr('--FAIL '+linksFile[ii][0]+' has a wrong top position');
					};
					if (!compareArrays(linksFile[ii][3],linksPage[jj][3])){
						addToArr('--FAIL '+linksFile[ii][0]+' has a wrong left position');
					};
					if (!compareArrays(linksFile[ii][4],linksPage[jj][4])){
						addToArr('--FAIL '+linksFile[ii][0]+' has a wrong height(text size)');
					};
				};
			};
			if (!triggerA) addToArr('--FAIL '+linksFile[ii][0]+' is not in a header');
		};		
		function compareArrays(arrA,arrB){
			var a=arrA.length;
			while(a--){
				if (arrA[a]!==arrB[a]){
				return false;
				};
			};
			return true;
		};
	};
	
	function outputResults(){
		if (failResults.length!==0){
			for (var i in failResults){
				casper.echo(failResults[i]);
			}				
		}
		else {
			casper.echo('--PASS main header');
		}
	};

	function verifyHeaderSticks(){
		next=0;
		function headerPositionAtTop(){
				if (linksPage[next][2][1]>0)	
			return linksPage[next][2][1];
		};
		
		function headerPositionAfterScroll(){
			var headerTopPosition=casper.evaluate(function (e){
				return document.querySelector(e).getBoundingClientRect().top;
			},{e: linksPage[next][1]});
			return headerTopPosition;
		};

		if (headerPositionAtTop()!==headerPositionAfterScroll())
			casper.echo('--FAIL header sticks');
		else
			casper.echo('--PASS header sticks');
	};
	
	function loopForAllLinks(){
		casper.then(function(){
			casper.mouse.move(nextSf);
			casper.wait(500);
		});
		casper.then(updateBoxParam);
		casper.then(function(){
			if (nextSf)
				loopForAllLinks();
		});
	};
	
	casper.then(function (){
		if (!readModuleFile())
			testIfFileIsFound();
		else
			{
			casper.echo('--FAIL finding file ' + dataFile + ' with mainheader links data. Run spider first.\r\n'+
			'--Skipping main header test.')
			};
	});
	
	function testIfFileIsFound(){
		casper.then(getMainNavLinks);
		casper.then(loopForAllLinks);
		casper.then(verifyHeaderLinksData);
		casper.then(outputResults);
		casper.then(function moveMouseAwayBeforeScrollingWindow(){
			casper.mouse.move(50,50);
		});
		casper.then(function (){
			casper.capture('move mouse.png',{
				top: 0,
				left: 0,
				width: 1366,
				height: 768
			});
		});		
		casper.then(function windowScroll(){
			casper.evaluate(function (){
				window.scroll(0,1000);
			});
		});

		casper.then(function (){
			if (failResults.length!==0)
				verifyHeaderSticks();
		});
		casper.then(function (){
			casper.capture('scroll.png',{
				top: 0,
				left: 0,
				width: 1366,
				height: 768
			});
		});
		
	};

	casper.then(function(){
		//casper.echo('-');
	});
};