package com.thirautech.mom.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.thirautech.mom.util.FrameworkUtil;
import com.thirautech.mom.util.PrintUtil;

@Repository("popDao")
public class PopDao {
	@Autowired 
	private SqlSessionTemplate sqlSession;
	
	@Autowired
	private SqlSessionFactory sqlSessionFactory;
	
	@Autowired
	private DataSourceTransactionManager dataSourceTransactionManager;
	
	public List<Map<String,Object>> getMapList(String query, List<Map<String,Object>> param) {
		return sqlSession.selectList(query, param.get(0));
	}
	
	public List<Map<String,Object>> getLabelObjectMapList(String query, Map<String,Object> param) {
        System.out.println("@@@222param(labelID) : " + param);
		return sqlSession.selectList(query, param);
	}
	
	
	public List<Map<String,Object>> upsertMap(String query, List<Map<String,Object>> param) {
		DefaultTransactionDefinition defaultTransactionDefinition = new DefaultTransactionDefinition();
    	defaultTransactionDefinition.setName("Transaction");
    	defaultTransactionDefinition.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
    	
    	TransactionStatus transactionStatus = dataSourceTransactionManager.getTransaction(defaultTransactionDefinition);
    	SqlSession sqlSession1 = null;
    	try {
    		sqlSession1 = sqlSessionFactory.openSession(ExecutorType.SIMPLE);
    		for(int i = 0; i < param.size(); i++) {
    			try {
    				int tuple = sqlSession1.insert(query, param.get(i));
        			param.get(i).put("executeCount", tuple);
        		} catch(Exception e1) {
        			throw new Exception();
        		}
        	}
			
			dataSourceTransactionManager.commit(transactionStatus);
        } catch(Exception e) {
        	dataSourceTransactionManager.rollback(transactionStatus);
        } finally {
        	sqlSession1.close();
    	}
    	
    	return param;
	}
}
