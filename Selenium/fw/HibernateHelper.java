package com.example.fw;

import java.util.List;

import org.hibernate.Session;

public class HibernateHelper extends HelperBase {

	public HibernateHelper(ApplicationManager manager) {
		super(manager);
	}

	public String getLastGroupId() {
        Session session = HibernateUtil.getSessionFactory().getCurrentSession();
        session.beginTransaction();
        return session.createQuery("select max(id)from GroupObject").uniqueResult().toString();
	}

	public Groups getGroups() {
        Session session = HibernateUtil.getSessionFactory().getCurrentSession();
        session.beginTransaction();
        return new Groups((List<GroupObject>) session.createQuery("from GroupObject").list());
	}
}
