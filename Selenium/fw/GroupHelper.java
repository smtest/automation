package com.example.fw;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.testng.Reporter;


public class GroupHelper extends HelperWithWebDriverBase {
	
	private Groups groupModel;
	private int lastGroupId;

	public GroupHelper(ApplicationManager manager) {
		super(manager);
		lastGroupId = Integer.parseInt(
				manager.getHibernateHelper().getLastGroupId());
	}

	public Groups getGroups() {
		if (groupModel == null) {
			groupModel = manager.getHibernateHelper().getGroups();
		}
		return groupModel;
	}
		
	public Groups getUiGroups() {
		HashSet<GroupObject> set = new HashSet<GroupObject>();
		manager.getNavigationHelper().goToGroupListPage();
		WebElement form = findElements(By.tagName("form")).get(1);
		List<WebElement> checkboxes = form.findElements(By.name("selected[]"));
		for (WebElement checkbox : checkboxes) {
			String title = checkbox.getAttribute("title");
			Pattern p = Pattern.compile(".*\\((.*)\\)");
			Matcher m = p.matcher(title);
			if (m.matches()) {
				title = m.group(1);
			}
			GroupObject group = new GroupObject()
				.setName(title)
				.setId(checkbox.getAttribute("value"));
			set.add(group);
		}
		return new Groups(set);
	}

	public void createGroup(GroupObject groupObject) {
		manager.getNavigationHelper().goToGroupListPage();
		initGroupCreation();
		fillGroupForm(groupObject);
		submitGroupCreation();
		returnToGroupListPage();
		lastGroupId = lastGroupId + 1;
		groupObject.setId("" + lastGroupId);
		groupModel = groupModel.withAdded(groupObject);
	}

	public void deleteGroup(GroupObject groupObject) {
		manager.getNavigationHelper().goToGroupListPage();
		checkGroup(groupObject);
		click(By.name("delete"));
		returnToGroupListPage();
		groupModel = groupModel.without(groupObject);
	}

	private void checkGroup(GroupObject groupObject) {
		click(By.xpath("//input[@value='"+groupObject.id+"']"));
	}

	public void modifyGroup(GroupObject oldGroupObject, GroupObject newGroupObject) {
		manager.getNavigationHelper().goToGroupListPage();
		initGroupModification(oldGroupObject);
		fillGroupForm(newGroupObject);
		submitGroupModification();
		returnToGroupListPage();
		groupModel = groupModel.without(oldGroupObject).withAdded(newGroupObject);
	}

	private void initGroupCreation() {
		click(By.name("new"));
	}

	private void initGroupModification(GroupObject groupObject) {
		checkGroup(groupObject);
		click(By.name("edit"));
	}

	private void fillGroupForm(GroupObject groupObject) {
		Reporter.log("filling group form");
		type("group_name", groupObject.name);
		type("group_header", groupObject.header);
		type("group_footer", groupObject.footer);
		//type("group_owner", groupObject.owner);
	}

	private void submitGroupCreation() {
		click(By.name("submit"));
	}

	private void submitGroupModification() {
		click(By.name("update"));
	}

	private void returnToGroupListPage() {
		click(By.linkText("group page"));
	}

}
