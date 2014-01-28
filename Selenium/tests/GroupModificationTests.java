package com.example.tests;

import java.util.logging.Logger;

import org.testng.annotations.Test;

import com.example.fw.GroupObject;
import com.example.fw.Groups;

public class GroupModificationTests extends TestBase {

	@Test
	public void testFirstGroupCanBeRemoved() throws Exception {
		Groups groups = app.getGroupHelper().getGroups();
		GroupObject oldGroup = groups.getSomeGroup();
		GroupObject newGroup = new GroupObject(oldGroup);
		newGroup.setName("12312");
		app.getGroupHelper().modifyGroup(oldGroup, newGroup);
		// validate
	}

}
