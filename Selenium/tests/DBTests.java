package com.example.tests;

import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.Matchers.*;

import java.util.logging.Logger;

import org.testng.annotations.Test;

import com.example.fw.GroupObject;
import com.example.fw.Groups;

public class DBTests extends TestBase {
	
	@Test
	public void testDbConnection() throws Exception {
		System.out.println(app.getHibernateHelper().getGroups());
	}

}
