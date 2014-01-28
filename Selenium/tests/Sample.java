package com.example.tests;

import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Sample {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		String title = "Select (test test test)";
		Pattern p = Pattern.compile(".*\\((.*)\\)");
		Matcher m = p.matcher(title);
		if (m.matches()) {
			System.out.println(m.group(1));
		};
	}

}
