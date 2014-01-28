package com.example.tests;

import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.Matchers.*;

import java.io.File;
import java.util.logging.Logger;

import org.junit.AfterClass;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterTest;
import org.testng.annotations.Test;

import com.example.fw.GroupObject;
import com.example.fw.Groups;

public class ExportTests extends TestBase {
	
	private Logger log = Logger.getLogger("ExportTests");
	
	@Test
	public void shouldExportFile() throws Exception {
		final File file = File.createTempFile("export", ".csv");
		file.delete();
		Thread thread = new Thread() {
			@Override
			public void run() {
				log.info("process download dialog");
				app.getAutoItHelper()
					.winWaitAndActivate("Windows Internet Explorer", "", 5000)
					.click("Button3")
					.winWaitAndActivate("Сохранить как", "", 5000)
					.send("Edit1", file.getAbsolutePath())
					.click("Button1");
			}
		};
		thread.start();
		log.info("click export");
		app.getNavigationHelper().clickExport();
		Thread.sleep(2000);
		thread.join();
		// дождаться сохранения файла
		// проверить содержимое файла
	}
	
}
