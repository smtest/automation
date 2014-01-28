package com.example.tests;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

import org.testng.annotations.DataProvider;

import com.example.fw.GroupObject;

public class GroupDataGenerator {

	static Random rnd = new Random();

	@DataProvider(name = "randomGroups")
	public static Iterator<Object[]> generateRandomGroups() {
		List<GroupObject> groups = new GroupDataGenerator().generateRandomGroupList(5);
		List<Object[]> list = new ArrayList<Object[]>();
		for (GroupObject group : groups) {
			list.add(new Object[]{group});
		}
		return list.iterator();
	}
	
	@DataProvider(name = "groupsFromFile")
	public static Iterator<Object[]> loadGroupsFromFile() throws IOException {
		List<Object[]> list = new ArrayList<Object[]>();
		BufferedReader reader = new BufferedReader(new FileReader("groups.dat"));
		String line = reader.readLine();
		while (line != null) {
			String[] parts = line.split("\t");
			GroupObject group = new GroupObject()
				.setName(parts[0])
				.setHeader(parts[1])
				.setFooter(parts[2]);
			list.add(new Object[]{group});
			line = reader.readLine();
		}
		return list.iterator();
	}
	
	public static void main(String[] args) {
		if (args.length < 2) {
			System.out.println("Specify two parameters: file and count");
			return;
		}
		String file = args[0];
		int count = Integer.parseInt(args[1]);
		try {
			new GroupDataGenerator().generateDataToFile(file, count);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private void generateDataToFile(String fileName, int count) throws IOException {
		List<GroupObject> groups = generateRandomGroupList(count);
		File file = new File(fileName);
		if (file.exists()) {
			//file.delete();
			System.out.println("File exists, stop generator");
			return;
		}
		FileWriter writer = new FileWriter(file);
		for (GroupObject group : groups) {
			writer.write(group.name + "\t" + group.header + "\t" + group.footer + "\n");
		}
		writer.close();
	}

	private List<GroupObject> generateRandomGroupList(int count) {
		List<GroupObject> list = new ArrayList<GroupObject>();
		for (int i = 0; i < count; i++) {
			GroupObject group = new GroupObject()
				.setName("name"+rnd.nextInt())
				.setHeader("header"+rnd.nextInt())
				.setFooter("footer"+rnd.nextInt());
			list.add(group);
		}
		return list;
	}
	
}
