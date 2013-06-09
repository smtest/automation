This directory contains two test suits.
To run a suit execute 'start.js' file in command line as a casperjs file.

The purpose of these test suites is to verify that main links and children links are in correct postion, text is wrapping,
size of the font is correct, detect missing and new links.
JS files in the suit my contain one or more test cases.

Description of files in the suite:
  
  -mainheader-spider.js: module is used to read and save to js file text, id and positions of all links in mainheader.
  Mouse hover over actions are imitated on each main link, positions of all links are added to existed data. 
  This data will be used in tests to compare links with page under test.
  -mainheader-test.js: module is used to read text, id and positions of all links in mainheader. Retrived data then compared with data
  from js file saved by spider.
