package com.example.fw;

public class GroupObject {

	public String name;
	public String header;
	public String footer;
	public String id;

	public GroupObject() {
	}

	public GroupObject(GroupObject oldGroup) {
		this.id = oldGroup.id;
		this.name = oldGroup.name;
		this.header = oldGroup.header;
		this.footer = oldGroup.footer;
	}

	public String getName() {
		return name;
	}

	public String getHeader() {
		return header;
	}

	public String getFooter() {
		return footer;
	}

	public String getId() {
		return id;
	}

	public GroupObject setName(String name) {
		this.name = name;
		return this;
	}

	public GroupObject setHeader(String header) {
		this.header = header;
		return this;
	}

	public GroupObject setFooter(String footer) {
		this.footer = footer;
		return this;
	}

	public GroupObject setId(String id) {
		this.id = id;
		return this;
	}

	@Override
	public String toString() {
		return "Group [" + id + ": " + name + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		GroupObject other = (GroupObject) obj;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (id != null && other.id != null) {
			return id.equals(other.id);
		}
		return true;
	}

}