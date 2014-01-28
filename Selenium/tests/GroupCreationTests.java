package com.example.tests;

import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.Matchers.*;

import java.util.logging.Logger;

import org.junit.AfterClass;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterTest;
import org.testng.annotations.Test;

import com.example.fw.GroupObject;
import com.example.fw.Groups;

public class GroupCreationTests extends TestBase {
	
	private Logger log = Logger.getLogger("GroupCreationTests");
	
	@Test(dataProvider = "groupsFromFile", dataProviderClass = GroupDataGenerator.class)
	public void testValidGroupCanBeCreated(GroupObject validGroup) throws Exception {
		Groups oldList = app.getGroupHelper().getGroups();
		app.getGroupHelper().createGroup(validGroup);
		Groups newList = app.getGroupHelper().getGroups();
		assertThat(newList, equalTo(oldList.withAdded(validGroup)));
	}
	
	@AfterMethod
	public void testUiAndDbConformsWithModel() {
		if (app.getProperty("ui.check") != null) {
			Groups modelList = app.getGroupHelper().getGroups();
			Groups uiList = app.getGroupHelper().getUiGroups();
			assertThat(uiList, equalTo(modelList));
		}
		if (app.getProperty("db.check") != null) {
			Groups modelList = app.getGroupHelper().getGroups();
			Groups dbList = app.getHibernateHelper().getGroups();
			assertThat(dbList, equalTo(modelList));
		}
	}

}
