package com.thirautech.mom.dao;

import java.rmi.UnexpectedException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.time.DurationFormatUtils;
import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.thirautech.mom.util.FrameworkUtil;
import com.thirautech.mom.util.Monitor;
import com.thirautech.mom.util.PrintUtil;

@Repository("momDao")
public class MomDao {
	@Autowired 
	private SqlSessionTemplate sqlSession;//Template;
	
	@Autowired
	private SqlSessionFactory sqlSessionFactory;
	
	@Autowired
	private DataSourceTransactionManager dataSourceTransactionManager;
	
	@Value("#{tuPlatformProperties['momDao.debug.on']}")
	boolean debugOn;
	
	@Value("#{tuPlatformProperties['exception.debug.on']}")
	boolean exceptionOn;
	
	public Map<String,Object> getMap(String query, Map<String,Object> param) {
		PrintUtil.print("MomDao", "getMap", "#", "$", "query", query, true, true, false, debugOn);
		PrintUtil.print(null, null, null, "$", "param", param, false, true, false, debugOn);
		
		if(query == null || query.length() < 1 || param == null || param.isEmpty()) {
			PrintUtil.print(null, null, null, "$", "query가 null 이거나 param이 null입니다.", null, false, true, true, exceptionOn);
			return FrameworkUtil.createResponseMapEmpty();
		}
		
		Map<String,Object> result = null; 
		try {
			result = sqlSession.selectOne(query, param);
		} catch(Exception e) {
			PrintUtil.print(null, null, null, "$", PrintUtil.queryString(query, "E", 0), null, false, true, true, debugOn);
			return FrameworkUtil.createResponseMapEmpty();
		}
		
		if(result == null || result.isEmpty()) {
			PrintUtil.print(null, null, null, "$", PrintUtil.queryString(query, "R", 0), null, false, true, true, debugOn);
			return FrameworkUtil.createResponseMapEmpty();
		}
		
		PrintUtil.print(null, null, null, "$", PrintUtil.queryString(query, "R", 1), null, false, true, true, debugOn);
		return FrameworkUtil.createResponseMap(result, true);
	}
	
	public List<Map<String,Object>> getMapList(String query, Map<String,Object> param) {
		PrintUtil.print("MomDao", "getMapList", "#", "$", "query", query, true, true, false, debugOn);
		PrintUtil.print(null, null, null, "$", "param", param, false, true, false, debugOn);
		
		if(query == null || query.length() < 1 || param == null || param.isEmpty()) {
			PrintUtil.print(null, null, null, "$", "query가 null 이거나 param이 null입니다.", null, false, true, true, exceptionOn);
			return FrameworkUtil.createResponseListEmpty();
		}
		
		/*Map<String,Object> param1 = new HashMap<String, Object>();
		param1.put("divisionCd", param.get("divisionCd"));
		param1.put("companyCd", param.get("companyCd"));
		param1.put("queryId", query.replaceFirst("com.thirautech.mom.", ""));
		param1.put("crudCd", "R");
		param1.put("userId", param.get("userId"));
		param1.put("description", "");
		createMap("com.thirautech.mom.monitor.create_monitor", param1);*/
		
		List<Map<String,Object>> result = null;
		long start = System.currentTimeMillis();
		try {	
			// 2019.01.20 hyjeong begin
			result = sqlSession.selectList(query, param);
			
			long diff = System.currentTimeMillis() - start;
			Date today = new Date(System.currentTimeMillis() + (9 * 3600 * 1000));
			/*Date today = new Date();*/
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			System.out.println("#### " + simpleDateFormat.format(today) + " Select " + param.get("companyCd") + ", " + query.substring(query.indexOf("get_")) + " = " + DurationFormatUtils.formatDuration(diff, "HH:mm:ss:SS"));
			// 2019.01.20 hyjeong end
			
			/*param1.put("cpuUsage", Monitor.getCPUTime());
			param1.put("processTime", DurationFormatUtils.formatDuration(diff, "HH:mm:ss:SS"));
			param1.put("isSuccess", "S");
			modifyMap("com.thirautech.mom.monitor.modify_monitor", param1);*/
		} catch(Exception e) {
			//e.printStackTrace();
			PrintUtil.print(null, null, null, "$", PrintUtil.queryString(query, "E", 0), null, false, true, true, debugOn);
			
			long diff = System.currentTimeMillis() - start;
			Date today = new Date(System.currentTimeMillis() + (9 * 3600 * 1000));
			/*Date today = new Date();*/
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			System.out.println("#### FAIL : " + simpleDateFormat.format(today) + " Select " + param.get("companyCd") + ", " + query.substring(query.indexOf("get_")) + " = " + DurationFormatUtils.formatDuration(diff, "HH:mm:ss:SS"));
			// 2019.01.20 hyjeong end
			
			/*param1.put("cpuUsage", Monitor.getCPUTime());
			param1.put("processTime", DurationFormatUtils.formatDuration(diff, "HH:mm:ss:SS"));
			param1.put("isSuccess", "E");
			modifyMap("com.thirautech.mom.monitor.modify_monitor", param1);*/
			
			return FrameworkUtil.createResponseListEmpty();
		}
		
		PrintUtil.print(null, null, null, "$", PrintUtil.queryString(query, "R", result == null ? 0 : result.size()), null, false, true, true, debugOn);
		
		return result;
	}
	
	public Map<String,Object> createMap(String query, Map<String,Object> param) {
		PrintUtil.print("MomDao", "createMap", "#", "$", "query", query, true, true, false, debugOn);
		PrintUtil.print(null, null, null, "$", "param", param, false, true, false, debugOn);
		
		if(query == null || query.length() < 1 || param == null || param.isEmpty()) {
			PrintUtil.print(null, null, null, "$", "query가 null 이거나 param이 null입니다.", null, false, true, true, exceptionOn);
			return FrameworkUtil.createResponseMap(param, false, "MESSAGES20012");
		}
		
		int tuple = 0;
		try {
			tuple = sqlSession.insert(query, param);
		} catch(Exception e) {
			if(param.get("p_err_msg") == null || "".equals(param.get("p_err_msg").toString())) {
				param.put("p_err_code", "E");
				param.put("p_err_msg", PrintUtil.errMsgString(e.getMessage()));
			}
			//e.printStackTrace();
			PrintUtil.print(null, null, null, "$", PrintUtil.queryString(query, "E", 0), null, false, true, true, debugOn);
			return FrameworkUtil.createResponseMap(param, false);
		}
		
		if(tuple == 0 || param.get("p_err_code") != null && param.get("p_err_code").toString().equals("E")) {
			PrintUtil.print(null, null, null, "$", PrintUtil.queryString(query, "E", 0), null, false, true, true, debugOn);
			return FrameworkUtil.createResponseMap(param, false);
		} 
		
		PrintUtil.print(null, null, null, "$", PrintUtil.queryString(query, "C", 1), null, false, true, true, debugOn);
		return FrameworkUtil.createResponseMap(param, true);
	}
	
	public Map<String,Object> createMapList(String query, List<Map<String,Object>> param) {
		PrintUtil.print("MomDao", "createMapList", "#", "$", "query", query, true, true, false, debugOn);
		PrintUtil.print(null, null, null, "$", "param", param, false, true, false, debugOn);
		
		String namespace = query.substring(0, query.lastIndexOf(".")+1);
		String postfix = query.substring(query.lastIndexOf(".")+1);
		postfix = postfix.substring(postfix.indexOf("_")+1);
		String updateQuery = namespace + "modify_" + postfix;
		
		if(query == null || query.length() < 1 || param == null || param.isEmpty()) {
			PrintUtil.print(null, null, null, "$", "query가 null 이거나 param이 null입니다.", null, false, true, true, exceptionOn);
			return FrameworkUtil.createResponseMap(param == null || param.isEmpty() ? null : param.get(0), false, "MESSAGES20012");
		}
		
		// 트렌젝션 시작
        long startTime = System.currentTimeMillis();
        boolean isSuccess = true;
        
        /*Map<String,Object> param1 = new HashMap<String, Object>();
		param1.put("divisionCd", param.get(0).get("divisionCd"));
		param1.put("companyCd", param.get(0).get("companyCd"));
		param1.put("queryId", query.replaceFirst("com.thirautech.mom.", ""));
		param1.put("crudCd", "C");
		param1.put("userId", param.get(0).get("userId"));
		if(param.get(0).get("isExcel") != null && param.get(0).get("isExcel").toString().equals("E")) {
			param1.put("description", "E");
		}
		createMap("com.thirautech.mom.monitor.create_monitor", param1);*/
		
		long start = System.currentTimeMillis();
        int i = 0;
        if(FrameworkUtil.isProcedure(query) || (param.get(0).get("cudFlag") != null && param.get(0).get("cudFlag").toString().equals("E"))) {    
        	DefaultTransactionDefinition defaultTransactionDefinition = new DefaultTransactionDefinition();
        	defaultTransactionDefinition.setName("Transaction");
        	defaultTransactionDefinition.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        	
        	TransactionStatus transactionStatus = dataSourceTransactionManager.getTransaction(defaultTransactionDefinition);
        	SqlSession sqlSession1 = null;
        	try {
        		sqlSession1 = sqlSessionFactory.openSession(false);
        		int successCount = 0;
        		for(i = 0; i < param.size(); i++) {   
	        		sqlSession1.insert(query, param.get(i));
	        		if(param.get(i).get("p_err_code") != null && param.get(i).get("p_err_code").toString().equals("E")) {
	        			throw new UnexpectedException(param.get(i).get("p_err_msg").toString());
	        		}
	        		
	        		successCount++;
        		}
        		
        		if(successCount != param.size()) {
        			throw new Exception();
        		}
        		
	        	sqlSession1.flushStatements();
	        	dataSourceTransactionManager.commit(transactionStatus);
	        	
	        	/*long diff = System.currentTimeMillis() - start;
	        	param1.put("cpuUsage", Monitor.getCPUTime());
				param1.put("processTime", DurationFormatUtils.formatDuration(diff, "HH:mm:ss:SS"));
				param1.put("isSuccess", "S");
				modifyMap("com.thirautech.mom.monitor.modify_monitor", param1);*/
            } catch(Exception e) {
            	PrintUtil.print(null, null, null, "$", String.valueOf(i+1) + "번째 프로시저\n" + PrintUtil.queryString(query, "E", 0), null, false, true, true, exceptionOn);
            	isSuccess = false;
            	dataSourceTransactionManager.rollback(transactionStatus);
            	
            	/*long diff = System.currentTimeMillis() - start;
	        	param1.put("cpuUsage", Monitor.getCPUTime());
				param1.put("processTime", DurationFormatUtils.formatDuration(diff, "HH:mm:ss:SS"));
				param1.put("isSuccess", "E");
				modifyMap("com.thirautech.mom.monitor.modify_monitor", param1);*/
            } finally {
            	sqlSession1.close();
        	}
        } else {
        	DefaultTransactionDefinition defaultTransactionDefinition = new DefaultTransactionDefinition();
        	defaultTransactionDefinition.setName("Transaction");
        	defaultTransactionDefinition.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        	
        	TransactionStatus transactionStatus = dataSourceTransactionManager.getTransaction(defaultTransactionDefinition);
        	SqlSession sqlSession1 = null;
        	try {
        		sqlSession1 = sqlSessionFactory.openSession(ExecutorType.SIMPLE);
        		int successCount = 0;
    			for(i = 0; i < param.size(); i++) {
        			try {
	        			int tuple = sqlSession1.insert(query, param.get(i));
	        			if(tuple > 0 || (param.get(i).get("p_err_code") != null && param.get(i).get("p_err_code").toString().equals("S"))) {
	        				successCount++;
	        				continue;
	        			} 
        			} catch(Exception e1) {
        				/*if(param.get(i).get("p_err_msg") != null && !param.get(i).get("p_err_msg").toString().equals("")) {
        					throw new UnexpectedException(param.get(i).get("p_err_msg").toString());
        				} else {
        					throw new Exception();
        				}*/
        			}
        			
        			int tuple = sqlSession1.update(updateQuery, param.get(i));
        			if(tuple > 0 || (param.get(i).get("p_err_code") != null && param.get(i).get("p_err_code").toString().equals("S"))) {
        				successCount++;
        				continue;
        			} 
        				
        			if(param.get(i).get("p_err_msg") != null && !param.get(i).get("p_err_msg").toString().equals("")) {
    					throw new UnexpectedException(param.get(i).get("p_err_msg").toString());
    				} else {
    					throw new Exception();
    				}
        		}
        		
    			if(successCount != param.size()) {
        			throw new Exception();
        		}
    			
	        	sqlSession1.flushStatements();
	        	dataSourceTransactionManager.commit(transactionStatus);
	        	
	        	/*long diff = System.currentTimeMillis() - start;
	        	param1.put("cpuUsage", Monitor.getCPUTime());
				param1.put("processTime", DurationFormatUtils.formatDuration(diff, "HH:mm:ss:SS"));
				param1.put("isSuccess", "S");
				modifyMap("com.thirautech.mom.monitor.modify_monitor", param1);*/
            } catch(Exception e) {
            	//e.printStackTrace(System.out);
            	Map<String,Object> errMap = new HashMap<String,Object>();
            	errMap.put("p_err_code", "E");
            	//p_err_msg 없는 경우에만 system error
            	if(param.get(i).get("p_err_msg") == null) {
            		errMap.put("p_err_msg", PrintUtil.errMsgString(e.getMessage()));
            	} else {
            		errMap.put("p_err_msg", param.get(i).get("p_err_msg"));
            	}
//            	System.out.println("p_err_msg4 : " + param.get(i).get("p_err_msg"));
            	param.add(i, errMap);
            	PrintUtil.print(null, null, null, "$", String.valueOf(i+1) +"번째 query\n" + PrintUtil.queryString(query, "E", 0), null, false, true, true, exceptionOn);
            	isSuccess = false;
            	dataSourceTransactionManager.rollback(transactionStatus);
            	
            	/*long diff = System.currentTimeMillis() - start;
	        	param1.put("cpuUsage", Monitor.getCPUTime());
				param1.put("processTime", DurationFormatUtils.formatDuration(diff, "HH:mm:ss:SS"));
				param1.put("isSuccess", "E");
				modifyMap("com.thirautech.mom.monitor.modify_monitor", param1);*/
            } finally {
            	sqlSession1.close();
        	}
        }
        
        long endTime = System.currentTimeMillis();
        long resutTime = endTime - startTime;
        
        PrintUtil.print(null, null, null, "$", "Transaction 소요시간", resutTime/1000 + "(ms)", false, true, true, debugOn);
        
        return FrameworkUtil.createResponseMap(i == param.size() ? param.get(0) : param.get(i), isSuccess);
	}
	
	public Map<String,Object> upsertMap(String query, Map<String,Object> param) {
		PrintUtil.print("MomDao", "upsertMap", "#", "$", "query", query, true, true, false, debugOn);
		PrintUtil.print(null, null, null, "$", "param", param, false, true, false, debugOn);
		
		if(query == null || query.length() < 1 || param == null || param.isEmpty()) {
			PrintUtil.print(null, null, null, "$", "query가 null 이거나 param이 null입니다.", null, false, true, true, exceptionOn);
			return FrameworkUtil.createResponseMap(param, false, "MESSAGES20012");
		}
		
		try {
			int tuple = sqlSession.insert(query, param);
			
			if((param.get("p_err_code") != null && param.get("p_err_code").toString().equals("S")) || tuple > 0) {
				PrintUtil.print(null, null, null, "$", PrintUtil.queryString(query, "C", 1), null, false, true, true, debugOn);
				return FrameworkUtil.createResponseMap(param, true);
			}
		} catch(Exception e) {
		}
		
		String namespace = query.substring(0, query.lastIndexOf(".")+1);
		String postfix = query.substring(query.lastIndexOf(".")+1);
		postfix = postfix.substring(postfix.indexOf("_")+1);
		query = namespace + "modify_" + postfix; 
		
		int tuple = sqlSession.insert(query, param);
		
		if((param.get("p_err_code") != null && param.get("p_err_code").toString().equals("E")) || tuple == 0) {
			PrintUtil.print(null, null, null, "$", PrintUtil.queryString(query, "E", 0), null, false, true, true, debugOn);
			return FrameworkUtil.createResponseMap(param, false);
		}
		
		PrintUtil.print(null, null, null, "$", PrintUtil.queryString(query, "U", 1), null, false, true, true, debugOn);
		
		return FrameworkUtil.createResponseMap(param, true);
	}
		
	public Map<String,Object> modifyMap(String query, Map<String,Object> param) {
		PrintUtil.print("MomDao", "modifyMap", "#", "$", "query", query, true, true, false, debugOn);
		PrintUtil.print(null, null, null, "$", "param", param, false, true, false, debugOn);
		
		if(query == null || query.length() < 1 || param == null || param.isEmpty()) {
			PrintUtil.print(null, null, null, "$", "query가 null 이거나 param이 null입니다.", null, false, true, true, exceptionOn);
			return FrameworkUtil.createResponseMap(param, false, "MESSAGES20012");
		}
		
		int tuple = 0;
		try {
			tuple = sqlSession.update(query, param);
		} catch(Exception e){
			if(param.get("p_err_msg") == null || "".equals(param.get("p_err_msg").toString())) {
				param.put("p_err_code", "E");
				param.put("p_err_msg", PrintUtil.errMsgString(e.getMessage()));
			}
			//e.printStackTrace();
			PrintUtil.print(null, null, null, "$", PrintUtil.queryString(query, "E", 0), null, false, true, true, exceptionOn);
			return FrameworkUtil.createResponseMap(param, false);
		}
		
		if(param.get("p_err_code") != null && param.get("p_err_code").toString().equals("E")) {
			PrintUtil.print(null, null, null, "$", PrintUtil.queryString(query, "E", 0), null, false, true, true, debugOn);
			return FrameworkUtil.createResponseMap(param, false);
		}
		
		PrintUtil.print(null, null, null, "$", PrintUtil.queryString(query, "U", tuple), null, false, true, true, debugOn);
		
		return FrameworkUtil.createResponseMap(param, true);
	}
	
	public Map<String,Object> modifyMapList(String query, List<Map<String,Object>> param) {
		PrintUtil.print("MomDao", "modifyMapList", "#", "$", "query", query, true, true, false, debugOn);
		PrintUtil.print(null, null, null, "$", "param", param, false, true, false, debugOn);
		
		if(query == null || query.length() < 1 || param == null || param.isEmpty()) {
			PrintUtil.print(null, null, null, "$", "query가 null 이거나 param이 null입니다.", null, false, true, true, exceptionOn);
			return FrameworkUtil.createResponseMap(param == null || param.isEmpty() ? null : param.get(0), false, "MESSAGES20012");
		}
		
		// 트렌젝션 시작
        long startTime = System.currentTimeMillis();
        boolean isSuccess = true;
        int i = 0;
        
    	DefaultTransactionDefinition defaultTransactionDefinition = new DefaultTransactionDefinition();
    	defaultTransactionDefinition.setName("Transaction");
    	defaultTransactionDefinition.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
    	
    	TransactionStatus transactionStatus = dataSourceTransactionManager.getTransaction(defaultTransactionDefinition);
    	SqlSession sqlSession1 = null;
    	try {
    		sqlSession1 = sqlSessionFactory.openSession(ExecutorType.SIMPLE);
    		int successCount = 0;
    		int tuple = 0;
			for(i = 0; i < param.size(); i++) {
    			try {
        			tuple = sqlSession1.update(query, param.get(i));
        			if(tuple >= 1 || (param.get(i).get("p_err_code") != null && param.get(i).get("p_err_code").toString().equals("S"))) {
        				successCount++;
        			} else { 
        				if(param.get(i).get("p_err_msg") != null && !param.get(i).get("p_err_msg").toString().equals("")) {
        					throw new UnexpectedException(param.get(i).get("p_err_msg").toString());
        				} else {
        					throw new Exception();
        				}
        			}
    			} catch(Exception e1) {
    				throw new Exception(e1);
    			}
    		}
    		
			if(successCount != param.size()) {
    			throw new Exception();
    		}
        	sqlSession1.flushStatements();
        	dataSourceTransactionManager.commit(transactionStatus);
        } catch(Exception e) {
        	Map<String,Object> errMap = new HashMap<String,Object>();
        	errMap.put("p_err_code", "E");
        	errMap.put("p_err_msg", PrintUtil.errMsgString(e.getMessage()));
        	param.add(i, errMap);
        	PrintUtil.print(null, null, null, "$", String.valueOf(i+1) +"번째 query\n" + PrintUtil.queryString(query, "E", 0), null, false, true, true, exceptionOn);
        	isSuccess = false;
        	dataSourceTransactionManager.rollback(transactionStatus);
        } finally {
        	sqlSession1.close();
    	}
      
        
        long endTime = System.currentTimeMillis();
        long resutTime = endTime - startTime;
        
        PrintUtil.print(null, null, null, "$", "Transaction 소요시간", resutTime/1000 + "(ms)", false, true, true, debugOn);
        
        return FrameworkUtil.createResponseMap(i == param.size() ? param.get(0) : param.get(i), isSuccess);
	}
	
	public Map<String,Object> removeMap(String query, Map<String,Object> param) {
		PrintUtil.print("MomDao", "removeMap", "#", "$", "query", query, true, true, false, debugOn);
		PrintUtil.print(null, null, null, "$", "param", param, false, true, false, debugOn);
		
		if(query == null || query.length() < 1 || param == null || param.isEmpty()) {
			PrintUtil.print(null, null, null, "$", "query가 null 이거나 param이 null입니다.", null, false, true, true, exceptionOn);
			return FrameworkUtil.createResponseMap(param, false, "MESSAGES20012");
		}
		
		int tuple = 0;
		try {
			tuple = sqlSession.delete(query, param);
		} catch(Exception e){
			if(param.get("p_err_msg") == null || "".equals(param.get("p_err_msg").toString())) {
				param.put("p_err_code", "E");
				param.put("p_err_msg", PrintUtil.errMsgString(e.getMessage()));
			}
			PrintUtil.print(null, null, null, "$", PrintUtil.queryString(query, "E", 0), null, false, true, true, exceptionOn);
			return FrameworkUtil.createResponseMap(param, false);
		}
		
		if(param.get("p_err_code") != null && param.get("p_err_code").toString().equals("E")) {
			PrintUtil.print(null, null, null, "$", PrintUtil.queryString(query, "E", 0), null, false, true, true, debugOn);
			return FrameworkUtil.createResponseMap(param, false);
		}
		
		PrintUtil.print(null, null, null, "$", PrintUtil.queryString(query, "D", tuple), null, false, true, true, debugOn);
		
		return FrameworkUtil.createResponseMap(param, true);
	}
	
	public Map<String,Object> removeMapList(String query, List<Map<String,Object>> param) {
		PrintUtil.print("MomDao", "removeMapList", "#", "$", "query", query, true, true, false, debugOn);
		PrintUtil.print(null, null, null, "$", "param", param, false, true, false, debugOn);
		
		if(query == null || query.length() < 1 || param == null || param.isEmpty()) {
			PrintUtil.print(null, null, null, "$", "query가 null 이거나 param이 null입니다.", null, false, true, true, exceptionOn);
			return FrameworkUtil.createResponseMap(param == null || param.isEmpty() ? null : param.get(0), false, "MESSAGES20012");
		}
		
		// 트렌젝션 시작
        long startTime = System.currentTimeMillis();
        boolean isSuccess = true;
        int i = 0;
        
    	DefaultTransactionDefinition defaultTransactionDefinition = new DefaultTransactionDefinition();
    	defaultTransactionDefinition.setName("Transaction");
    	defaultTransactionDefinition.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
    	
    	TransactionStatus transactionStatus = dataSourceTransactionManager.getTransaction(defaultTransactionDefinition);
    	SqlSession sqlSession1 = null;
    	try {
    		sqlSession1 = sqlSessionFactory.openSession(ExecutorType.SIMPLE);
    		int successCount = 0;
    		int tuple = 0;
			for(i = 0; i < param.size(); i++) {
    			try {
        			tuple = sqlSession1.delete(query, param.get(i));
        			if(tuple >= 1 || (param.get(i).get("p_err_code") != null && param.get(i).get("p_err_code").toString().equals("S"))) {
        				successCount++;
        			} else { 
        				if(param.get(i).get("p_err_msg") != null && !param.get(i).get("p_err_msg").toString().equals("")) {
        					throw new UnexpectedException(param.get(i).get("p_err_msg").toString());
        				} else {
        					throw new Exception();
        				}
        			}
    			} catch(Exception e1) {
    				throw new Exception(e1);
    			}
    		}
    		
			if(successCount != param.size()) {
    			throw new Exception();
    		}
        	sqlSession1.flushStatements();
        	dataSourceTransactionManager.commit(transactionStatus);
        } catch(Exception e) {
        	Map<String,Object> errMap = new HashMap<String,Object>();
        	errMap.put("p_err_code", "E");
        	errMap.put("p_err_msg", PrintUtil.errMsgString(e.getMessage()));
        	param.add(i, errMap);
        	PrintUtil.print(null, null, null, "$", String.valueOf(i+1) +"번째 query\n" + PrintUtil.queryString(query, "E", 0), null, false, true, true, exceptionOn);
        	isSuccess = false;
        	dataSourceTransactionManager.rollback(transactionStatus);
        } finally {
        	sqlSession1.close();
    	}
      
        
        long endTime = System.currentTimeMillis();
        long resutTime = endTime - startTime;
        
        PrintUtil.print(null, null, null, "$", "Transaction 소요시간", resutTime/1000 + "(ms)", false, true, true, debugOn);
        
        return FrameworkUtil.createResponseMap(i == param.size() ? param.get(0) : param.get(i), isSuccess);
	}
}
