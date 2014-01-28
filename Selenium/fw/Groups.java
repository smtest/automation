package com.example.fw;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;


public class Groups {
	
	private Set<GroupObject> storedGroups = null;
	
	public Groups(Collection<GroupObject> groups) {
		storedGroups = new HashSet<GroupObject>(groups);
	}

	public Groups withAdded(GroupObject group) {
		Groups groups2 = new Groups(storedGroups);
		group.setId("$$$");
		groups2.storedGroups.add(group);
		group.setId(null);
		return groups2;
	}
	
	public Groups without(GroupObject group) {
		Groups groups2 = new Groups(storedGroups);
		groups2.storedGroups.remove(group);
		return groups2;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((storedGroups == null) ? 0 : storedGroups.hashCode());
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
		Groups other = (Groups) obj;
		if (storedGroups == null) {
			if (other.storedGroups != null)
				return false;
		} else if (!storedGroups.equals(other.storedGroups))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Groups [storedGroups=" + storedGroups + "]";
	}

	public GroupObject getSomeGroup() {
		return storedGroups.iterator().next();
	}

}
