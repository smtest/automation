//	This module is a main header spider.
//	It can be ran on any page by provided url.
//	It reads following attributes and parameters of all links in the header:
//	- Link text;
//	- id;
//	- top position;
//	- left position;
//	- height.
//	Then mouse hover over action is imitated on each main link one by one
//	for children links become visible.
//	Then top, left and heigth is read again and added for each link.
//	Finally all data is saved in js file
//	

exports.mainheader=function (casper,url){

	var fs = require('fs');
	casper.echo('--Getting positions of mainheader links on the page');
	var linksData=[];
	var linksPage=[];
	var next=0;
	var nextSf;
	
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
				linksData[i]=links[i];
		};
		nextSf=nextLink(1);
	};	
				
	function writeModuleFile(){
		var dataFile = './mainheaderData.js';
		var top='//' + url + "\r\n" + 'exports.mainheaderData=function (){' + "\r\n\t"+'var mainheaderData = [' + '\r\n';
		for (var param in linksData){
			var top1 ='["'+linksData[param][0]+ '",'+'"'+linksData[param][1]+'",'+'['+linksData[param][2]+'],'+'['+linksData[param][3]+'],'+'['+linksData[param][4]+']],';
			if (linksData[param][2][0]==0)
				top +="\r\n" + '\t\t' + top1;
			else
				top +="\r\n" + '\t' + top1;				
		};
		top += "\r\n" + '\t'+'];' + "\r\n" + '\t'+'return mainheaderData;'+ "\r\n" +'};';
		fs.write(dataFile, top, 'w');
		return dataFile;
	};
		
	function updateBoxParam(){
			//casper.capture(nextSf+ '.png');
		for (var i=0;i<linksData.length;i++){	
			var box=casper.evaluate(function (e){
				return document.querySelector(e).getBoundingClientRect();
			},{e: linksData[i][1]});
			linksData[i][2]=linksData[i][2].concat(box.top);
			linksData[i][3]=linksData[i][3].concat(box.left);
			linksData[i][4]=linksData[i][4].concat(box.height);
			
		};		
			nextSf=nextLink();
	};

	function nextLink(e){
		if (!e){
			next++;
		};	
		if (next<linksData.length){
			while (linksData[next][2][0]==0){
				if (next>=linksData.length-1)
					return '';
				next++;
			}
			return linksData[next][1];
		};
			
		return '';
	};

	function loopForAllLinks(){
	
		casper.then(function(){
			casper.mouse.move(nextSf);
			casper.wait(500);
		});
		
		casper.then(function(){
			updateBoxParam();
		});
		
		
		casper.then(function(){
			//casper.echo('recive '+ nextSf );
			if (nextSf)
				loopForAllLinks();
		});
	};
	
	casper.then(function(){
		getMainNavLinks();
	});

	casper.then(function(){
		loopForAllLinks();
	});

	casper.then(function(){
		
		casper.echo('--Main header links parameters are saved in js file: '+ writeModuleFile());
	});

	function readFromFile (){
		var file = fs.read(dataFile);
	};
};