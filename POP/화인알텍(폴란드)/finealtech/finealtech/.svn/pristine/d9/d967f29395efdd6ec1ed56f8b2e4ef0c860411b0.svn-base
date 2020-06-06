package com.thirautech.mom.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class EzMesInter {
	public static String SCT 	= "SCT";
	public static String ILHAE 	= "ILHAE";
	public static String DBELL 	= "DBELL";
	public static Map<String, Object> workOrderList 	= new HashMap<String, Object>();
	public static Map<String, String> connectionString 	= new HashMap<String, String>();
	
	public static void outWorkOrderList(String companyCd, String divisionCd, List<Map<String, Object>> workOrderList) {
		if(EzMesInter.connectionString == null || EzMesInter.connectionString.isEmpty()) {
			EzMesInter.connectionString.put(EzMesInter.SCT, 	"jdbc:sqlserver://112.223.188.244:11433;databaseName=ezMES_STD_4.0;user=ezmesmgr;password=dsinfo");
			EzMesInter.connectionString.put(EzMesInter.ILHAE, 	"jdbc:sqlserver://112.216.251.100:11433;databaseName=ezMES_STD_4.0;user=ezmesmgr;password=dsinfo");
			EzMesInter.connectionString.put(EzMesInter.DBELL, 	"jdbc:sqlserver://112.216.179.38:1433;databaseName=ezMES_STD_4.0;user=ezmesmgr;password=ezmesmgr");
		}
		
		Connection connection = null;
        PreparedStatement preparedStatement = null;
        /*Statement statement = null;
        ResultSet resultSet = null;*/
        
        try {
        	if(EzMesInter.connectionString.get(companyCd) == null) {
        		return;
        	}
        	
            connection = DriverManager.getConnection(EzMesInter.connectionString.get(companyCd));
        } catch(Exception e) {
        	try {
    			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
    			connection = DriverManager.getConnection(EzMesInter.connectionString.get(companyCd));
    		} catch (Exception e1) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		}
        }
        
        /*String sql = "SELECT MAX(IFSEQ) + 1 AS IFSEQ FROM If_Erp_R_WorkOrder";
        int IFSEQ = -1;
        try {
	        statement = connection.createStatement();
	        resultSet = statement.executeQuery(sql);
	        
	        if(resultSet.next()) {
        		IFSEQ = resultSet.getInt(1);
        		System.out.println("IFSEQ = " + IFSEQ);
        	}
        } catch(Exception e) {
        	e.printStackTrace();
        } finally {
        	try {
        		resultSet.close();
        	} catch(Exception e1){
        	}
        	try {
        		statement.close();
        	} catch(Exception e1){
        	}
        }
        
        if(IFSEQ == -1) {
        	try {
        		connection.close();
        	} catch(Exception e){
        	}
        	
        	return;
        }*/
        
        String sql = "INSERT INTO If_Erp_R_WorkOrder("
        		/*+ "IFSEQ"*/
        		+ "WOID"
        		+ ",WONAME"
        		+ ",PRODID"
        		+ ",BOMREV"
        		+ ",PLANQTY"
        		+ ",UNIT"
        		+ ",PLANSTDTTM"
        		+ ",PLANEDDTTM"
        		+ ",AREAID"
        		+ ",PCSGID"
        		+ ",CUSTPRODID"
        		+ ",WOTYPE"
        		+ ",PRIORITY"
        		+ ",DELFLAG"
        		+ ",ATTRIBUTE1"
        		+ ",ATTRIBUTE2"
        		+ ",IFFLAG)"
        		+ "VALUES("
        		+ "?"
        		+ ",?"
        		+ ",?"
        		+ ",?"
        		+ ",?"
        		+ ",?"
        		+ ",?"
        		+ ",?"
        		+ ",?"
        		+ ",?"
        		+ ",?"
        		+ ",?"
        		+ ",?"
        		+ ",?"
        		+ ",?"
        		+ ",?"
        		+ ",?"
        		+ ")";
        
        try {
        	preparedStatement = connection.prepareStatement(sql);
        	
    		for(int i = 0; i < workOrderList.size(); i++) {
    			Map<String, Object> workOrder = workOrderList.get(i);
    			
    			preparedStatement.setString		(1,  workOrder.get("woid").toString());
    			preparedStatement.setString		(2,  workOrder.get("woname").toString());
    			preparedStatement.setString		(3,  workOrder.get("prodid").toString());
    			preparedStatement.setString		(4,  workOrder.get("bomrev").toString());
    			preparedStatement.setInt		(5,  Integer.parseInt(workOrder.get("planqty").toString()));
    			preparedStatement.setString		(6,  workOrder.get("unit") == null ? null : workOrder.get("unit").toString());
    			preparedStatement.setTimestamp	(7,  java.sql.Timestamp.valueOf(workOrder.get("planstdttm").toString().substring(0, 19)));
    			preparedStatement.setTimestamp	(8,  workOrder.get("planeddttm") == null ? null : java.sql.Timestamp.valueOf(workOrder.get("planstdttm").toString().substring(0, 19)));
    			preparedStatement.setString		(9,  workOrder.get("areaid") == null ? null : workOrder.get("areaid").toString());
    			preparedStatement.setString		(10, workOrder.get("pcsgid") == null ? null : workOrder.get("pcsgid").toString());
    			preparedStatement.setString		(11, workOrder.get("custprodid") == null ? null : workOrder.get("custprodid").toString());
    			preparedStatement.setString		(12, workOrder.get("wotype").toString());
    			try {
    				int priority = 9999;
    				priority = Integer.parseInt(workOrder.get("priority").toString().trim());
    				preparedStatement.setInt	(13, priority);
    			} catch(Exception e1) {
    				preparedStatement.setInt(13, 9999);
    			}
    			preparedStatement.setString		(14, workOrder.get("delflag").toString());
    			preparedStatement.setString		(15, divisionCd);
    			preparedStatement.setString		(16, workOrder.get("attribute2") == null ? null : workOrder.get("attribute2").toString());
    			preparedStatement.setString		(17, workOrder.get("ifflag").toString());
    			
    			preparedStatement.executeUpdate();
    			
    			/*System.out.println("########");
    			System.out.println("woid : " 		+ workOrder.get("woid").toString());
    			System.out.println("woname : " 		+ workOrder.get("woname").toString());
    			System.out.println("prodid : " 		+ workOrder.get("prodid").toString());
    			System.out.println("bomrev : " 		+ workOrder.get("bomrev").toString());
    			System.out.println("planqty : " 	+ workOrder.get("planqty").toString());
    			System.out.println("unit : " 		+ workOrder.get("unit") ==  null ? "null" : workOrder.get("unit").toString());
    			System.out.println("planstdttm : " 	+ workOrder.get("planstdttm").toString());
    			System.out.println("planeddttm : " 	+ workOrder.get("planeddttm") ==  null ? "null" : workOrder.get("planeddttm").toString());
    			System.out.println("areaid : " 		+ workOrder.get("areaid") == null ? "null" : workOrder.get("areaid").toString());
    			System.out.println("pcsgid : " 		+ workOrder.get("pcsgid") == null ? "null" : workOrder.get("pcsgid").toString());
    			System.out.println("custprodid : " 	+ workOrder.get("custprodid") == null ? "null" : workOrder.get("custprodid").toString());
    			System.out.println("wotype : " 		+ workOrder.get("wotype").toString());
    			System.out.println("priority : " 	+ workOrder.get("priority") == null ? "null" : workOrder.get("priority").toString());
    			System.out.println("delflag : " 	+ workOrder.get("delflag").toString());
    			System.out.println("attribute1 : " 	+ divisionCd);
    			System.out.println("attribute2 : " 	+ "null");
    			System.out.println("########");*/
    		}
    		
    		connection.commit();
    		
    		System.out.println("commit()");
    	} catch(Exception e){
    		e.printStackTrace();
    		try {
    			connection.rollback();
    		} catch(Exception e1) {
    		}
    	} finally {
    		try {
    			preparedStatement.close();
    		} catch(Exception e) {
    		}
    		
    		try {
    			connection.close();
    		} catch(Exception e) {
    		}
    	}
	}
}
