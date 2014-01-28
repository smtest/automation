package com.example.tests;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

import org.testng.annotations.Test;

import com.example.fw.GroupObject;
import com.example.fw.Groups;

public class GroupRemovalTests extends TestBase {

	@Test
	public void testSomeGroupCanBeRemoved() throws Exception {
		Groups oldGroups = app.getGroupHelper().getGroups();
		GroupObject someGroup = oldGroups.getSomeGroup();
		app.getGroupHelper().deleteGroup(someGroup);
		Groups newGroups = app.getGroupHelper().getGroups();
		assertThat(newGroups, equalTo(oldGroups.without(someGroup)));
	}

}
