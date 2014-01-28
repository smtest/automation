package com.example.fw;

import java.util.Properties;

public class ApplicationManager {

	private static ApplicationManager singleton;

	private WebDriverHelper webDriverHelper;
	private GroupHelper groupHelper;
	private NavigationHelper navigationHelper;
	private DataBaseHelper dataBaseHelper;
	private HibernateHelper hibernateHelper;

	private Properties props;

	private AutoItHelper autoItHelper;

	public static ApplicationManager getInstance() {
		if (singleton == null) {
			singleton = new ApplicationManager();
		}
		return singleton;
	}

	public void stop() {
		if (webDriverHelper != null) {
			webDriverHelper.stop();
		}
	}
	
	public WebDriverHelper getWebDriverHelper() {
		if (webDriverHelper == null) {
			webDriverHelper = new WebDriverHelper(this);
		}
		return webDriverHelper;
	}

	public GroupHelper getGroupHelper() {
		if (groupHelper == null) {
			groupHelper = new GroupHelper(this);
		}
		return groupHelper;
	}

	public NavigationHelper getNavigationHelper() {
		if (navigationHelper == null) {
			navigationHelper = new NavigationHelper(this);
		}
		return navigationHelper;
	}

	public DataBaseHelper getDataBaseHelper() {
		if (dataBaseHelper == null) {
			dataBaseHelper = new DataBaseHelper(this);
		}
		return dataBaseHelper;
	}

	public HibernateHelper getHibernateHelper() {
		if (hibernateHelper == null) {
			hibernateHelper = new HibernateHelper(this);
		}
		return hibernateHelper;
	}

	public AutoItHelper getAutoItHelper() {
		if (autoItHelper == null) {
			autoItHelper = new AutoItHelper(this); 
		}
		return autoItHelper;
	}

	public void setProperties(Properties props) {
		this.props = props;
	}
	
	public String getProperty(String key) {
		return props.getProperty(key);
	}

	public String getProperty(String key, String defaultValue) {
		return props.getProperty(key, defaultValue);
	}

}
