This directory is a test suite.
To run the suit execute 'start.js' file in command line as a casperjs file.

The purpose of this test suit is to verify that content admin can create course page and that the page contains all entered
fields and all optonal fields do not have empty text boxes visible.

JS files in the suit my contain one or more test cases.

Description of files in the suite:
  -start.js: starts casper, calls test files in sequence, stops casper;
  -nav-home-and-login-admin.js: navigates to user page, performs http authorization, login as admin, verifies login was a success;
  -course-page.js: navigates to content add page, course add page;
  -Course.js: (name starts with cap C as it is a course page class); fills required fields, saves page, 
   verifies entered present and empty boxes are not visible, fills all fields (except faculty), 
    saves, verifies if all entered is correct.
  
- Mainheader:
  -mainheader-spider.js: module to read and save to js file text, id and positions of all links in mainheader.
  Mouse hover over actions are imitated on all main links, positions of all links are added to existed data. 
  This data will be used in tests to compare links with page under test.