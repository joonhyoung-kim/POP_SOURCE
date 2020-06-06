package com.thirautech.mom.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MomDirectQuery {
	public static String connectionString = null;
	public static String userId = null;
	public static String passwd = null;
	
	public static Map<String, List<Map<String,Object>>> totalRecordItemList = new HashMap<String, List<Map<String,Object>>>();
	public static Map<String, String> isCompleteItemList = new HashMap<String, String>();
	public static Map<String, String> getItemItemListQuery = new HashMap<String, String>();
	
	public static Map<String, List<Map<String,Object>>> totalRecordDemandPlanList = new HashMap<String, List<Map<String,Object>>>();
	public static Map<String, String> isCompleteDemandPlanList = new HashMap<String, String>();
	public static Map<String, String> getDemandPlanItemListQuery = new HashMap<String, String>();
	
	// Deprecate.., 일단 사용 안함
	/*public static boolean getItemItemListReset(Map<String,Object> param) {
		if(param == null || param.size() < 1) {
			return false;
		}
		
		String key = param.get("companyCd").toString() + param.get("divisionCd").toString() + param.get("userId").toString();
		
		if(MomDirectQuery.totalRecordItemList.get(key) != null) {
			MomDirectQuery.totalRecordItemList.get(key).clear();
		}
		
		MomDirectQuery.isCompleteItemList.put(key, "N");
		
		return true;
	}*/
	
	public static List<Map<String,Object>> directQuery(String method, String query, Map<String,Object> param) {
		if(method == null || method.length() < 2 || query == null || param == null || param.get("companyCd") == null || param.get("divisionCd") == null || param.get("userId") == null) {
			return FrameworkUtil.createResponseList(null, false);
		}
		
		if(connectionString == null) {
			if(param.get("companyCd").toString().equals("THIRAUTECH")) {
				MomDirectQuery.connectionString = "jdbc:log4jdbc:oracle:thin:@mom.thirautech.com:13000:orarnbd";
				MomDirectQuery.userId			= "TU_ADMIN";
				MomDirectQuery.passwd			= "tu_admin";
			} else if(param.get("companyCd").toString().equals("FINEALTECH")) {
				MomDirectQuery.connectionString = "jdbc:log4jdbc:oracle:thin:@211.199.87.241:1521:ORCL";
				MomDirectQuery.userId			= "tu_admin";
				MomDirectQuery.passwd			= "tu_admin2018";
			} else {
				MomDirectQuery.connectionString = "jdbc:log4jdbc:oracle:thin:@tu-platform.cnvt0vdvbf4w.ap-northeast-2.rds.amazonaws.com:1521:ORCL";
				MomDirectQuery.userId			= "tuplatform_master";
				MomDirectQuery.passwd			= "tuplatform_master00";
			}
		}
		
		if(method.equals("getItemItemList")) {
			return MomDirectQuery.getItemItemList(query, param);
		} else if(method.equals("getDemandPlanItemList")) {
			return MomDirectQuery.getDemandPlanItemList(query, param);
		}
		
		return FrameworkUtil.createResponseList(null, false);
	}
	
	public static List<Map<String,Object>> getItemItemList(String query, Map<String,Object> param) {
		String key = param.get("companyCd").toString() + param.get("divisionCd").toString() + param.get("userId").toString();
		
		String sql = 
"WITH TEMP1 AS ( "	
+ "		SELECT A.DIVISION_CD "
+ "	         , A.COMPANY_CD "
+ "	         , A.ITEM_ID "
+ "	       	 , A.ITEM_NAME "
+ "	       	 , A.ITEM_GROUP_CODE "
+ "	       	 , A.ITEM_TYPE "
+ "	         , (SELECT MOM_COMMON_PKG.FN_GET_CODE_NAME(A.DIVISION_CD "
+ "	                                                 , A.COMPANY_CD "  
+ "	                                                 , \'ITEM_TYPE\' "
+ "	                                                 , A.ITEM_TYPE) "
+ "	              FROM DUAL) AS ITEM_TYPE_NAME "
+ "	         , A.SPECIFICATION "
+ "	         , A.VENDOR_CD "
+ "	         , (SELECT MOM_COMMON_PKG.FN_GET_VENDOR_NAME(A.DIVISION_CD "
+ "	                                                   , A.COMPANY_CD "
+ "	                                                   , A.VENDOR_CD) " 
+ "	              FROM DUAL) AS VENDOR_NAME "
+ "	         , A.DEPARTURE_VENDOR_CD "
+ "	         , (SELECT MOM_COMMON_PKG.FN_GET_VENDOR_NAME(A.DIVISION_CD "
+ "	                                                   , A.COMPANY_CD "
+ "	                                                   , A.DEPARTURE_VENDOR_CD) " 
+ "	              FROM DUAL) AS DEPARTURE_VENDOR_NAME "
+ "	         , A.UNIT_PRICE "
+ "	         , A.UNIT "
+ "	         , (SELECT MOM_COMMON_PKG.FN_GET_CODE_NAME( A.DIVISION_CD "
+ "	                                                  , A.COMPANY_CD "  
+ "	                                                  , \'ITEM_UNIT\' "
+ "	                                                  , A.UNIT) "
+ "	              FROM DUAL) AS UNIT_NAME " 
+ "	         , A.PURCHASE_UNIT "
+ "	         , A.UNIT_QTY "
+ "	         , A.CONVERSION_UNIT "
+ "	         , NVL(A.CONVERSION_UNIT_QTY, 1) AS CONVERSION_UNIT_QTY "
+ "	         , A.MOQ "
+ "	         , A.MOM "
+ "	         , A.SAFETY_STOCK_QTY "
+ "	         , A.SAFETY_STOCK_DAY "
+ "	         , A.SAFETY_STOCK_DAY_UOM "
+ "	         , A.PROD_MIN_LOT_SIZE "
+ "	         , A.PROD_MAX_LOT_SIZE "
+ "	         , A.PROD_INCREMENT_LOT_SIZE "
+ "	         , A.DEMAND_LOT_SIZE "
+ "	         , A.ACTIVATION_FLAG "
+ "	         , (SELECT MOM_COMMON_PKG.FN_GET_CODE_NAME( A.DIVISION_CD "
+ "	                                                  , A.COMPANY_CD "  
+ "	                                                  , \'USE_FLAG\' "
+ "	                                                  , A.ACTIVATION_FLAG) "
+ "	              FROM DUAL) AS ACTIVATION_FLAG_NAME "          
+ "	         , A.IS_FINITE_FLAG "
+ "	         , (SELECT MOM_COMMON_PKG.FN_GET_CODE_NAME( A.DIVISION_CD "
+ "	                                                  , A.COMPANY_CD "  
+ "	                                                  , \'USE_FLAG\' "
+ "	                                                  , A.IS_FINITE_FLAG) "
+ "	              FROM DUAL) AS IS_FINITE_FLAG_NAME " 
+ "	         , A.FINITE_TERM "
+ "	         , A.FINITE_TERM_UOM "
+ "	         , A.IN_LOCATION_ID "
+ "	         , (SELECT MOM_COMMON_PKG.FN_GET_FACILITY_NAME( A.DIVISION_CD "
+ "	                                                      , A.COMPANY_CD " 
+ "	                                                      , A.IN_LOCATION_ID) " 
+ "	              FROM DUAL) AS IN_LOCATION_NAME "
+ "	         , A.OUT_LOCATION_ID "
+ "	         , (SELECT MOM_COMMON_PKG.FN_GET_FACILITY_NAME( A.DIVISION_CD "
+ "	                                                      , A.COMPANY_CD " 
+ "	                                                      , A.OUT_LOCATION_ID) " 
+ "	              FROM DUAL) AS OUT_LOCATION_NAME "
+ "	         , A.TEST_REPORT_FLAG "
+ "	         , (SELECT MOM_COMMON_PKG.FN_GET_CODE_NAME( A.DIVISION_CD "
+ "	                                                  , A.COMPANY_CD "  
+ "	                                                  , \'USE_FLAG\' "
+ "	                                                  , A.TEST_REPORT_FLAG) "
+ "	              FROM DUAL) AS TEST_REPORT_FLAG_NAME " 
+ "	         , A.IQC_FLAG "
+ "	         , (SELECT MOM_COMMON_PKG.FN_GET_CODE_NAME( A.DIVISION_CD "
+ "	                                                  , A.COMPANY_CD "  
+ "	                                                  , \'USE_FLAG\' "
+ "	                                                  , A.IQC_FLAG) "
+ "	              FROM DUAL) AS IQC_FLAG_NAME "
+ "	         , A.PQC_FLAG "
+ "            , (SELECT MOM_COMMON_PKG.FN_GET_CODE_NAME( A.DIVISION_CD "
+ "                                                    , A.COMPANY_CD "  
+ "                                                    , \'USE_FLAG\' "
+ "                                                    , A.PQC_FLAG) "
+ "                FROM DUAL) AS PQC_FLAG_NAME "
+ "	         , A.OQC_FLAG "
+ "	         , (SELECT MOM_COMMON_PKG.FN_GET_CODE_NAME( A.DIVISION_CD "
+ "	                                                  , A.COMPANY_CD "  
+ "	                                                  , \'USE_FLAG\' "
+ "	                                                  , A.OQC_FLAG) "
+ "	              FROM DUAL) AS OQC_FLAG_NAME "
+ "	         , A.RP_ITEM_ID "
+ "	         , A.VENDOR_ITEM_ID "
+ "	         , A.ALT_ITEM_ID "
+ "	         , A.ITEM_CATEGORY "
+ "	         , A.PURCHASE_TYPE "
+ "	         , (SELECT MOM_COMMON_PKG.FN_GET_CODE_NAME( A.DIVISION_CD "
+ "	                                                  , A.COMPANY_CD "  
+ "	                                                  , \'USE_FLAG\' "
+ "	                                                  , A.PURCHASE_TYPE) "
+ "	              FROM DUAL) AS PURCHASE_TYPE_NAME "
+ "	         , A.ITEM_USER_ID "
+ "	         , (SELECT MOM_COMMON_PKG.FN_GET_USER_NAME( A.DIVISION_CD "
+ "	                                                  , A.COMPANY_CD "  
+ "	                                                  , A.ITEM_USER_ID) "
+ "	              FROM DUAL) AS ITEM_USER_NAME "
+ "	         , A.PACKING_SIZE_WIDTH "
+ "            , A.PACKING_SIZE_HEIGHT "
+ "	         , A.MATERIAL_WEIGHT "
+ "            , A.PALLET_WEIGHT "
+ "            , A.UNIT_WEIGHT "
+ "	         , A.BOX_WEIGHT "
+ "	         , A.ITEM_GROUP_LARGE "
+ "	         , (SELECT MOM_COMMON_PKG.FN_GET_CODE_NAME( A.DIVISION_CD "
+ "	                                                  , A.COMPANY_CD "  
+ "	                                                  , \'ITEM_GROUP_LARGE\' "
+ "	                                                  , A.ITEM_GROUP_LARGE) "
+ "	              FROM DUAL) AS ITEM_GROUP_LARGE_NAME "
+ "	         , A.ITEM_GROUP_MEDIUM "
+ "	         , (SELECT MOM_COMMON_PKG.FN_GET_CODE_NAME( A.DIVISION_CD "
+ "	                                                  , A.COMPANY_CD "  
+ "	                                                  , \'ITEM_GROUP_MEDIUM\' "
+ "	                                                  , A.ITEM_GROUP_MEDIUM) "
+ "	              FROM DUAL) AS ITEM_GROUP_MEDIUM_NAME "
+ "	         , A.ITEM_GROUP_SMALL "
+ "	         , (SELECT MOM_COMMON_PKG.FN_GET_CODE_NAME( A.DIVISION_CD "
+ "	                                                  , A.COMPANY_CD "  
+ "	                                                  , \'ITEM_GROUP_LARGE\' "
+ "	                                                  , A.ITEM_GROUP_SMALL) "
+ "	              FROM DUAL) AS ITEM_GROUP_SMALL_NAME "
+ "	         , A.DESCRIPTION "
+ "	         , A.PRE_BUILD_TERM "
+ "            , A.LEAD_TIME "
+ "	         , A.TRACKING_FLAG "
+ "            , (SELECT MOM_COMMON_PKG.FN_GET_CODE_NAME( A.DIVISION_CD "
+ "                                                     , A.COMPANY_CD "  
+ "                                                     , \'USE_FLAG\' "
+ "                                                     , A.TRACKING_FLAG) "
+ "	              FROM DUAL) AS TRACKING_FLAG_NAME "				
+ "	         , A.ORDER_METHOD "
+ "	         , (SELECT MOM_COMMON_PKG.FN_GET_CODE_NAME( A.DIVISION_CD "
+ "                                                      , A.COMPANY_CD " 
+ "                                                      , \'ORDER_METHOD\' "
+ "                                                      , A.ORDER_METHOD) "
+ "	              FROM DUAL) AS ORDER_METHOD_NAME "
+ "	         , A.ITEM_GRADE "
+ "	         , (SELECT MOM_COMMON_PKG.FN_GET_CODE_NAME( A.DIVISION_CD "
+ "	                                                  , A.COMPANY_CD " 
+ "	                                                  , \'ITEM_GRADE\' "
+ "	                                                  , A.ITEM_GRADE) "
+ "	              FROM DUAL) AS ITEM_GRADE_NAME "
+ "	         , A.BAD_LEVEL "
+ "	         , (SELECT MOM_COMMON_PKG.FN_GET_CODE_NAME( A.DIVISION_CD "
+ "	                                                  , A.COMPANY_CD " 
+ "	                                                  , \'BAD_LEVEL\' "
+ "	                                                  , A.BAD_LEVEL) "
+ "	              FROM DUAL) AS BAD_LEVEL_NAME "         
+ "	         , A.STANDARD_OUT_QTY "
+ "	         , A.DEFECT_RATE "
+ "	         , A.BY_PRODUCT_ITEM_ID "
+ "	         , A.USE_YN "
+ "	         , (SELECT MOM_COMMON_PKG.FN_GET_CODE_NAME( A.DIVISION_CD "
+ "	                                                  , A.COMPANY_CD "  
+ "	                                                  , \'USE_FLAG\' "
+ "	                                                  , A.USE_YN) "
+ "	              FROM DUAL) AS USE_YN_NAME "          
+ "	         , TO_CHAR(A.CREATE_DATE, \'YYYY-MM-DD HH24:MI:SS\') AS CREATE_DATE "
+ "	         , A.CREATE_BY "
+ "	         , (SELECT MOM_COMMON_PKG.FN_GET_USER_NAME( A.DIVISION_CD "
+ "	                                                  , A.COMPANY_CD "  
+ "	                                                  , A.CREATE_BY) "
+ "	              FROM DUAL) AS CREATE_USER_NAME "          
+ "	         , TO_CHAR(A.UPDATE_DATE, \'YYYY-MM-DD HH24:MI:SS\') AS UPDATE_DATE "
+ "	         , A.UPDATE_BY "
+ "	         , (SELECT MOM_COMMON_PKG.FN_GET_USER_NAME( A.DIVISION_CD "
+ "	                                                  , A.COMPANY_CD "  
+ "	                                                  , A.UPDATE_BY) "
+ "	              FROM DUAL) AS UPDATE_USER_NAME "
+ "	         , A.ATTRIBUTE1 "
+ "	         , A.ATTRIBUTE2 "
+ "	         , A.ATTRIBUTE3 "
+ "	         , A.ATTRIBUTE4 "
+ "	         , A.ATTRIBUTE5 "
+ "	         , A.ATTRIBUTE6 "
+ "	         , A.ATTRIBUTE7 "
+ "	         , A.ATTRIBUTE8 "
+ "	         , A.ATTRIBUTE9 "
+ "	         , A.ATTRIBUTE10 "
+ "	         , A.ATTRIBUTE11 "
+ "	         , A.ATTRIBUTE12 "
+ "	         , A.ATTRIBUTE13 "
+ "	         , A.ATTRIBUTE14 "
+ "	         , A.ATTRIBUTE15 "
+ "	         , A.FREE_OFFER_FLAG "
+ "	         , (SELECT MOM_COMMON_PKG.FN_GET_CODE_NAME(?,?, \'FREE_OFFER_FLAG\', A.FREE_OFFER_FLAG) " 
+ "	              FROM DUAL) AS FREE_OFFER_FLAG_NAME "
+ "	         , A.TOOL "
+ "	         , A.PRESS_LINE "
+ "	         , A.SALES_FREE_FLAG "
+ "	         , (SELECT MOM_COMMON_PKG.FN_GET_CODE_NAME(?,?, \'FREE_OFFER_FLAG\', A.SALES_FREE_FLAG) " 
+ "	              FROM DUAL) AS SALES_FREE_FLAG_NAME "
+ "	      FROM  MOM_ITEM_DEFINITION A "
/*+ "	     WHERE  -1 != ? "
+ "	       AND  A.DIVISION_CD  = ? "*/
+ "	     WHERE  A.DIVISION_CD  = ? "
+ "	       AND  A.COMPANY_CD  = ? ";		

if(param.get("itemId") != null && !param.get("itemId").toString().equals("")) {
			sql += "	       AND (A.ITEM_ID LIKE UPPER(\'%\' || \'" + param.get("itemId").toString() + "\' || \'%\') ";
			sql += "	           OR UPPER(A.ITEM_NAME) LIKE UPPER(\'%\' || \'" + param.get("itemId").toString() + "\' || \'%\')) ";
		}
		if(param.get("specification") != null && !param.get("specification").toString().equals("")) {
			sql += "	       AND (UPPER(A.SPECIFICATION) LIKE UPPER(\'%\' || \'" + param.get("specification").toString() + "\' || \'%\')) "; 
		}
		if(param.get("vendorCd") != null && !param.get("vendorCd").toString().equals("")) {
			sql += "	       AND A.VENDOR_CD = \'" + param.get("vendorCd").toString() + "\' ";
		}
		if(param.get("departureVendorCd") != null && !param.get("departureVendorCd").toString().equals("")) {
			sql += "	       AND A.DEPARTURE_VENDOR_CD = \'" + param.get("departureVendorCd").toString() + "\' ";
		}
		if(param.get("inLocationId") != null && !param.get("inLocationId").toString().equals("")) {
			sql += "	       AND A.IN_LOCATION_ID = \'" + param.get("inLocationId").toString() + "\' ";
		}
		if(param.get("outLocationId") != null && !param.get("outLocationId").toString().equals("")) {
			sql += "	       AND A.OUT_LOCATION_ID = \'" + param.get("outLocationId").toString() + "\' ";
		}
		if(param.get("itemUserId") != null && !param.get("itemUserId").toString().equals("")) {
			sql += "	       AND A.ITEM_USER_ID = \'" + param.get("itemUserId").toString() + "\' ";
		}
		if(param.get("itemType") != null && !param.get("itemType").toString().equals("")) {
			sql += "	       AND A.ITEM_TYPE = \'" + param.get("itemType").toString() + "\' ";
		}
		if(param.get("useYn") != null && !param.get("useYn").toString().equals("")) {
			sql += "	       AND A.USE_YN = \'" + param.get("useYn").toString() + "\' ";
		}
		
sql += ("	     ORDER BY A.ITEM_ID "
+ "	  ) "
+ "      SELECT A.* "
+ "           , B.ROW_COUNT "
+ "      FROM (SELECT A.* "
+ "                 , ROWNUM GRIDROW "
+ "             FROM TEMP1 A) A "
+ "         , (SELECT COUNT(*) ROW_COUNT "
+ "              FROM TEMP1) B ");
				/*if(param.get("startPage") != null && !param.get("startPage").toString().equals("") && param.get("endPage") != null && !param.get("endPage").toString().equals("")) {
					sql += "	  WHERE GRIDROW BETWEEN " + param.get("startPage").toString() + " AND " + param.get("endPage").toString() + " ";
				}*/		
		
		boolean initState = false;
		if(			Integer.parseInt(param.get("startPage").toString()) == 1 
				&& 	Integer.parseInt(param.get("endPage").toString()) == 100 
				&& 	(
						MomDirectQuery.getItemItemListQuery.get(key) == null
					|| !sql.equals(MomDirectQuery.getItemItemListQuery.get(key))
					)
		) {
			if(MomDirectQuery.totalRecordItemList.get(key) == null) {
				MomDirectQuery.totalRecordItemList.put(key, new ArrayList<Map<String,Object>>());
			} else {
				MomDirectQuery.totalRecordItemList.get(key).clear();
			}
			
			MomDirectQuery.isCompleteItemList.put(key, "N");
			
			initState = true;
		}
		
		if(initState) {
			List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
			Connection connection = null;
			PreparedStatement preparedStatement = null;
	        ResultSet resultSet = null; 
	        
			try {
	            connection = DriverManager.getConnection(MomDirectQuery.connectionString, MomDirectQuery.userId, MomDirectQuery.passwd);
	        } catch(Exception e) {
	        	try {
	    			Class.forName("oracle.jdbc.driver.OracleDriver");
	    			connection = DriverManager.getConnection(MomDirectQuery.connectionString, MomDirectQuery.userId, MomDirectQuery.passwd);
	    		} catch (Exception e1) {
	    			// TODO Auto-generated catch block
	    			e.printStackTrace();
	    		}
	        }
			
			try {
				preparedStatement = connection.prepareStatement(sql);
				
				preparedStatement.setString(1, param.get("divisionCd") == null ? null : param.get("divisionCd").toString());
				preparedStatement.setString(2, param.get("companyCd" ) == null ? null : param.get("companyCd" ).toString());
				preparedStatement.setString(3, param.get("divisionCd") == null ? null : param.get("divisionCd").toString());
				preparedStatement.setString(4, param.get("companyCd" ) == null ? null : param.get("companyCd" ).toString());
				/*preparedStatement.setInt   (5, (int)(Math.random() * 1000) + 1);*/
				preparedStatement.setString(5, param.get("divisionCd") == null ? null : param.get("divisionCd").toString());
				preparedStatement.setString(6, param.get("companyCd" ) == null ? null : param.get("companyCd" ).toString());
				
				resultSet = preparedStatement.executeQuery();
				
				int i = 0;
				while(resultSet.next()) {
					Map<String, Object> map = new HashMap<String, Object>();
					
					map.put("divisionCd"			,resultSet.getObject("DIVISION_CD"));
					map.put("companyCd"				,resultSet.getObject("COMPANY_CD"));
					map.put("itemId"				,resultSet.getObject("ITEM_ID"));
					map.put("itemName"				,resultSet.getObject("ITEM_NAME"));
					map.put("itemGroupCode"			,resultSet.getObject("ITEM_GROUP_CODE"));
					map.put("itemType"				,resultSet.getObject("ITEM_TYPE"));
					map.put("itemTypeName"			,resultSet.getObject("ITEM_TYPE_NAME"));
					map.put("specification"			,resultSet.getObject("SPECIFICATION"));
					map.put("vendorCd"				,resultSet.getObject("VENDOR_CD"));
					map.put("vendorName"			,resultSet.getObject("VENDOR_NAME"));
					map.put("departureVendorCd"		,resultSet.getObject("DEPARTURE_VENDOR_CD"));
					map.put("departureVendorName"	,resultSet.getObject("DEPARTURE_VENDOR_NAME"));
					map.put("unitPrice"				,resultSet.getObject("UNIT_PRICE"));
					map.put("unit"					,resultSet.getObject("UNIT"));
					map.put("unitName"				,resultSet.getObject("UNIT_NAME"));
					map.put("purchaseUnit"			,resultSet.getObject("PURCHASE_UNIT"));
					map.put("unitQty"				,resultSet.getObject("UNIT_QTY"));
					map.put("conversionUnit"		,resultSet.getObject("CONVERSION_UNIT"));
					map.put("conversionUnitQty"		,resultSet.getObject("CONVERSION_UNIT_QTY"));
					map.put("moq"					,resultSet.getObject("MOQ"));
					map.put("mom"					,resultSet.getObject("MOM"));
					map.put("safetyStockQty"		,resultSet.getObject("SAFETY_STOCK_QTY"));
					map.put("safetyStockDay"		,resultSet.getObject("SAFETY_STOCK_DAY"));
					map.put("safetyStockDayUom"		,resultSet.getObject("SAFETY_STOCK_DAY_UOM"));
					map.put("prodMinLotSize"		,resultSet.getObject("PROD_MIN_LOT_SIZE"));
					map.put("prodMaxLotSize"		,resultSet.getObject("PROD_MAX_LOT_SIZE"));
					map.put("prodIncrementLotSize"	,resultSet.getObject("PROD_INCREMENT_LOT_SIZE"));
					map.put("demandLotSize"			,resultSet.getObject("DEMAND_LOT_SIZE"));
					map.put("activationFlag"		,resultSet.getObject("ACTIVATION_FLAG"));
					map.put("activationFlagName"	,resultSet.getObject("ACTIVATION_FLAG_NAME"));
					map.put("isFiniteFlag"			,resultSet.getObject("IS_FINITE_FLAG"));
					map.put("isFiniteFlagName"		,resultSet.getObject("IS_FINITE_FLAG_NAME"));
					map.put("finiteTerm"			,resultSet.getObject("FINITE_TERM"));
					map.put("finiteTermUom"			,resultSet.getObject("FINITE_TERM_UOM"));
					map.put("inLocationId"			,resultSet.getObject("IN_LOCATION_ID"));
					map.put("inLocationName"		,resultSet.getObject("IN_LOCATION_NAME"));
					map.put("outLocationId"			,resultSet.getObject("OUT_LOCATION_ID"));
					map.put("outLocationName"		,resultSet.getObject("OUT_LOCATION_NAME"));
					map.put("testReportFlag"		,resultSet.getObject("TEST_REPORT_FLAG"));
					map.put("testReportFlagName"	,resultSet.getObject("TEST_REPORT_FLAG_NAME"));
					map.put("iqcFlag"				,resultSet.getObject("IQC_FLAG"));
					map.put("iqcFlagName"			,resultSet.getObject("IQC_FLAG_NAME"));
					map.put("pqcFlag"				,resultSet.getObject("PQC_FLAG"));
					map.put("pqcFlagName"			,resultSet.getObject("PQC_FLAG_NAME"));
					map.put("oqcFlag"				,resultSet.getObject("OQC_FLAG"));
					map.put("oqcFlagName"			,resultSet.getObject("OQC_FLAG_NAME"));
					map.put("rpItemId"				,resultSet.getObject("RP_ITEM_ID"));
					map.put("vendorItemId"			,resultSet.getObject("VENDOR_ITEM_ID"));
					map.put("altItemId"				,resultSet.getObject("ALT_ITEM_ID"));
					map.put("itemCategory"			,resultSet.getObject("ITEM_CATEGORY"));
					map.put("purchaseType"			,resultSet.getObject("PURCHASE_TYPE"));
					map.put("purchaseTypeName"		,resultSet.getObject("PURCHASE_TYPE_NAME"));
					map.put("itemUserId"			,resultSet.getObject("ITEM_USER_ID"));
					map.put("itemUserName"			,resultSet.getObject("ITEM_USER_NAME"));
					map.put("packingSizeWidth"		,resultSet.getObject("PACKING_SIZE_WIDTH"));
					map.put("packingSizeHeight"		,resultSet.getObject("PACKING_SIZE_HEIGHT"));
					map.put("materialWeight"		,resultSet.getObject("MATERIAL_WEIGHT"));
					map.put("palletWeight"			,resultSet.getObject("PALLET_WEIGHT"));
					map.put("unitWeight"			,resultSet.getObject("UNIT_WEIGHT"));
					map.put("boxWeight"				,resultSet.getObject("BOX_WEIGHT"));
					map.put("itemGroupLarge"		,resultSet.getObject("ITEM_GROUP_LARGE"));
					map.put("itemGroupLargeName"	,resultSet.getObject("ITEM_GROUP_LARGE_NAME"));
					map.put("itemGroupMedium"		,resultSet.getObject("ITEM_GROUP_MEDIUM"));
					map.put("itemGroupMediumName"	,resultSet.getObject("ITEM_GROUP_MEDIUM_NAME"));
					map.put("itemGroupSmall"		,resultSet.getObject("ITEM_GROUP_SMALL"));
					map.put("itemGroupSmallName"	,resultSet.getObject("ITEM_GROUP_SMALL_NAME"));
					map.put("description"			,resultSet.getObject("DESCRIPTION"));
					map.put("preBuildTerm"			,resultSet.getObject("PRE_BUILD_TERM"));
					map.put("leadTime"				,resultSet.getObject("LEAD_TIME"));
					map.put("trackingFlag"			,resultSet.getObject("TRACKING_FLAG"));
					map.put("trackingFlagName"		,resultSet.getObject("TRACKING_FLAG_NAME"));
					map.put("orderMethod"			,resultSet.getObject("ORDER_METHOD"));
					map.put("orderMethodName"		,resultSet.getObject("ORDER_METHOD_NAME"));
					map.put("itemGrade"				,resultSet.getObject("ITEM_GRADE"));
					map.put("itemGradeName"			,resultSet.getObject("ITEM_GRADE_NAME"));
					map.put("badLevel"				,resultSet.getObject("BAD_LEVEL"));
					map.put("badLevelName"			,resultSet.getObject("BAD_LEVEL_NAME"));
					map.put("standardOutQty"		,resultSet.getObject("STANDARD_OUT_QTY"));
					map.put("defectRate"			,resultSet.getObject("DEFECT_RATE"));
					map.put("byProductItemId"		,resultSet.getObject("BY_PRODUCT_ITEM_ID"));
					map.put("useYn"					,resultSet.getObject("USE_YN"));
					map.put("useYnName"				,resultSet.getObject("USE_YN_NAME"));
					map.put("createDate"			,resultSet.getObject("CREATE_DATE"));
					map.put("createBy"				,resultSet.getObject("CREATE_BY"));
					map.put("createUserName"		,resultSet.getObject("CREATE_USER_NAME"));
					map.put("updateDate"			,resultSet.getObject("UPDATE_DATE"));
					map.put("updateBy"				,resultSet.getObject("UPDATE_BY"));
					map.put("updateUserName"		,resultSet.getObject("UPDATE_USER_NAME"));
					map.put("attribute1"			,resultSet.getObject("ATTRIBUTE1"));
					map.put("attribute2"			,resultSet.getObject("ATTRIBUTE2"));
					map.put("attribute3"			,resultSet.getObject("ATTRIBUTE3"));
					map.put("attribute4"			,resultSet.getObject("ATTRIBUTE4"));
					map.put("attribute5"			,resultSet.getObject("ATTRIBUTE5"));
					map.put("attribute6"			,resultSet.getObject("ATTRIBUTE6"));
					map.put("attribute7"			,resultSet.getObject("ATTRIBUTE7"));
					map.put("attribute8"			,resultSet.getObject("ATTRIBUTE8"));
					map.put("attribute9"			,resultSet.getObject("ATTRIBUTE9"));
					map.put("attribute10"			,resultSet.getObject("ATTRIBUTE10"));
					map.put("attribute11"			,resultSet.getObject("ATTRIBUTE11"));
					map.put("attribute12"			,resultSet.getObject("ATTRIBUTE12"));
					map.put("attribute13"			,resultSet.getObject("ATTRIBUTE13"));
					map.put("attribute14"			,resultSet.getObject("ATTRIBUTE14"));
					map.put("attribute15"			,resultSet.getObject("ATTRIBUTE15"));
					map.put("freeOfferFlag"			,resultSet.getObject("FREE_OFFER_FLAG"));
					map.put("freeOfferFlagName"		,resultSet.getObject("FREE_OFFER_FLAG_NAME"));
					map.put("tool"					,resultSet.getObject("TOOL"));
					map.put("pressLine"				,resultSet.getObject("PRESS_LINE"));
					map.put("salesFreeFlag"			,resultSet.getObject("SALES_FREE_FLAG"));
					map.put("salesFreeFlagName"		,resultSet.getObject("SALES_FREE_FLAG_NAME"));
					map.put("rowCount"				,resultSet.getObject("ROW_COUNT"));
					
					list.add(map);					
					MomDirectQuery.totalRecordItemList.get(key).add(map);
					
					if(++i == Integer.parseInt(param.get("endPage").toString())) {
						break;
					}
				}
				
				RetrieveTotalItemList retrieveTotalItemList = new RetrieveTotalItemList(connection, preparedStatement, resultSet, key, sql);
				retrieveTotalItemList.start();
				/*retrieveTotal.join();*/
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			return list;
		} else {
			while(MomDirectQuery.isCompleteItemList.get(key).equals("N")) {
				try {
					Thread.sleep(100);
				} catch (InterruptedException e) {
				}
			}
			
			int startPage = Integer.parseInt(param.get("startPage").toString());
			int endPage = Integer.parseInt(param.get("endPage").toString());
			endPage = endPage > MomDirectQuery.totalRecordItemList.get(key).size() ? MomDirectQuery.totalRecordItemList.get(key).size() : endPage;
			
			System.out.println("#### startPage - 1 = " + (startPage - 1) + ", endPage + 1 = " + endPage);
			
			return MomDirectQuery.totalRecordItemList.get(key).subList(startPage - 1, endPage);
		}
	}
	
	public static List<Map<String,Object>> getDemandPlanItemList(String query, Map<String,Object> param) {
		String key = param.get("companyCd").toString() + param.get("divisionCd").toString() + param.get("userId").toString();
		
String sql = 
"WITH TEMP1 AS (SELECT A.MASTER_ID "
+ "		     , A.PLAN_ID "
+ "		     , A.DEMAND_ID "
+ "		     , MIN(A.CUSTOMER_ID)  AS CUSTOMER_ID "
+ "		     , MIN(A.LINE_CODE)    AS LINE_CODE "
+ "		     , MIN((SELECT MOM_COMMON_PKG.FN_GET_VENDOR_NAME(A.MASTER_ID, ? , A.CUSTOMER_ID) "
+ "		              FROM   DUAL ))   AS CUSTOMER_NAME "
+ "		     , MIN(A.ITEM_ID)    AS ITEM_ID "
+ "		     , MIN((SELECT MOM_COMMON_PKG.FN_GET_ITEM_NAME(A.MASTER_ID, ? , A.ITEM_ID) "
+ "		              FROM   DUAL ))   AS ITEM_NAME "
+ "		     , MIN(TO_CHAR(A.START_TIME, \'YYYY-MM-DD HH24:MI:SS\')) AS START_TIME "
+ "		     , SUM(A.QTY)    AS QTY "
+ "		     , MIN(TO_CHAR(DUE_DATE, \'YYYY-MM-DD\')) AS DUE_DATE "
+ "		     , A.SALES_ORDER_ID "
+ "           	 , A.MODEL_SUFFIX "
+ "           	 , MIN (A.MKT) AS MKT "
+ "      		 , MIN((SELECT MOM_COMMON_PKG.FN_GET_SALES_PRICE(A.MASTER_ID, ?, A.CUSTOMER_ID, A.ITEM_ID, A.MKT, \'KRW\', DUE_DATE) FROM DUAL)) AS KRW_PRICE "
+ "       		 , MIN((SELECT MOM_COMMON_PKG.FN_GET_SALES_PRICE(A.MASTER_ID, ?, A.CUSTOMER_ID, A.ITEM_ID, A.MKT, \'USD\', DUE_DATE) FROM DUAL)) AS USD_PRICE ";
if(param.get("pivot") != null && !param.get("pivot").toString().equals("")) {
	sql += param.get("pivot").toString();
}
sql += " FROM TH_MST_DEMAND A WHERE A.MASTER_ID = ? ";
if(param.get("planId") != null && !param.get("planId").toString().equals("")) {
	sql += (" AND A.PLAN_ID   = \'" + param.get("planId").toString() + "\'");
}
if(param.get("vendorCd") != null && !param.get("vendorCd").toString().equals("")) {
	sql += (" AND A.CUSTOMER_ID = \'" + param.get("vendorCd").toString() + "\'");
}
if(param.get("itemId") != null && !param.get("itemId").toString().equals("")) {
	sql += (" AND UPPER(A.ITEM_ID || \'@\' || MOM_COMMON_PKG.FN_GET_ITEM_NAME(A.MASTER_ID, " + param.get("companyCd").toString() + " , A.ITEM_ID)) LIKE \'%\' || UPPER(" + param.get("itemId").toString() + ")|| \'%\' "); 
}
sql += ("		 GROUP BY A.MASTER_ID "
+ "		        , A.PLAN_ID "
+ "		        , A.DEMAND_ID "
+ "		        , A.SALES_ORDER_ID "
+ "                , A.MODEL_SUFFIX "
+ "		 ORDER BY LINE_CODE "
+ "		        , START_TIME "
+ "		        , ITEM_ID ) "
+ " SELECT A.* , "
+ "        B.ROW_COUNT "
+ "   FROM (SELECT A.* , "
+ "                ROWNUM GRIDROW "
+ "           FROM TEMP1 A) A , "
+ "        (SELECT COUNT(*) ROW_COUNT "
+ "           FROM TEMP1) B");
		
		boolean initState = false;
		if(			Integer.parseInt(param.get("startPage").toString()) == 1 
				&& 	Integer.parseInt(param.get("endPage").toString()) == 100 
				&& 	(
						MomDirectQuery.getDemandPlanItemListQuery.get(key) == null
					|| !sql.equals(MomDirectQuery.getDemandPlanItemListQuery.get(key))
					)
		) {
			if(MomDirectQuery.totalRecordDemandPlanList.get(key) == null) {
				MomDirectQuery.totalRecordDemandPlanList.put(key, new ArrayList<Map<String,Object>>());
			} else {
				MomDirectQuery.totalRecordDemandPlanList.get(key).clear();
			}
			
			MomDirectQuery.isCompleteDemandPlanList.put(key, "N");
			
			initState = true;
		}
		
		if(initState) {
			List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
			Connection connection = null;
			PreparedStatement preparedStatement = null;
	        ResultSet resultSet = null; 
	        
			try {
	            connection = DriverManager.getConnection(MomDirectQuery.connectionString, MomDirectQuery.userId, MomDirectQuery.passwd);
	        } catch(Exception e) {
	        	try {
	    			Class.forName("oracle.jdbc.driver.OracleDriver");
	    			connection = DriverManager.getConnection(MomDirectQuery.connectionString, MomDirectQuery.userId, MomDirectQuery.passwd);
	    		} catch (Exception e1) {
	    			// TODO Auto-generated catch block
	    			e.printStackTrace();
	    		}
	        }		

			String[] tokens = null;
			if(param.get("pivot") != null && !param.get("pivot").toString().equals("")) {
				tokens = param.get("pivot").toString().split("AS");
				if(tokens != null && tokens.length > 1) {
					for(int i = 1; i < tokens.length; i++) {
						tokens[i] = tokens[i].substring(tokens[i].indexOf("\"") + 1);
						tokens[i] = tokens[i].substring(0, tokens[i].indexOf("\""));
					}
				}
			}
			
			try {
				preparedStatement = connection.prepareStatement(sql);
				
				preparedStatement.setString(1, param.get("companyCd" ) == null ? null : param.get("companyCd" ).toString());
				preparedStatement.setString(2, param.get("companyCd" ) == null ? null : param.get("companyCd" ).toString());
				preparedStatement.setString(3, param.get("companyCd" ) == null ? null : param.get("companyCd" ).toString());
				preparedStatement.setString(4, param.get("companyCd" ) == null ? null : param.get("companyCd" ).toString());
				preparedStatement.setString(5, param.get("divisionCd") == null ? null : param.get("divisionCd").toString());
				
				resultSet = preparedStatement.executeQuery();
				
				int i = 0;
				while(resultSet.next()) {
					Map<String, Object> map = new HashMap<String, Object>();
					
					map.put("masterId"		,resultSet.getObject("MASTER_ID"));
					map.put("planId"		,resultSet.getObject("PLAN_ID"));
					map.put("demandId"		,resultSet.getObject("DEMAND_ID"));
					map.put("customerId"	,resultSet.getObject("CUSTOMER_ID"));
					map.put("lineCode"		,resultSet.getObject("LINE_CODE"));
					map.put("customerName"	,resultSet.getObject("CUSTOMER_NAME"));
					map.put("itemId"		,resultSet.getObject("ITEM_ID"));
					map.put("itemName"		,resultSet.getObject("ITEM_NAME"));
					map.put("startTime"		,resultSet.getObject("START_TIME"));
					map.put("qty"			,resultSet.getObject("QTY"));
					map.put("dueDate"		,resultSet.getObject("DUE_DATE"));
					map.put("salesOrderId"	,resultSet.getObject("SALES_ORDER_ID"));
					map.put("modelSuffix"	,resultSet.getObject("MODEL_SUFFIX"));
					map.put("mkt"			,resultSet.getObject("MKT"));
					map.put("krwPrice"		,resultSet.getObject("KRW_PRICE"));
					map.put("usdPrice"		,resultSet.getObject("USD_PRICE"));
					
					if(tokens != null && tokens.length > 1) {
						for(int j = 1; j < tokens.length; j++) {
							map.put(tokens[j], resultSet.getObject(tokens[j]));
						}
					}
					
					map.put("rowCount"		,resultSet.getObject("ROW_COUNT"));					
					
					list.add(map);					
					MomDirectQuery.totalRecordDemandPlanList.get(key).add(map);
					
					if(++i == Integer.parseInt(param.get("endPage").toString())) {
						break;
					}
				}
				
				RetrieveTotalDemandPlanList retrieveTotalDemandPlanList = new RetrieveTotalDemandPlanList(connection, preparedStatement, resultSet, key, sql, tokens);
				retrieveTotalDemandPlanList.start();
				/*retrieveTotal.join();*/
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			return list;
		} else {
			while(MomDirectQuery.isCompleteDemandPlanList.get(key).equals("N")) {
				try {
					Thread.sleep(100);
				} catch (InterruptedException e) {
				}
			}
			
			int startPage = Integer.parseInt(param.get("startPage").toString());
			int endPage = Integer.parseInt(param.get("endPage").toString());
			endPage = endPage > MomDirectQuery.totalRecordDemandPlanList.get(key).size() ? MomDirectQuery.totalRecordDemandPlanList.get(key).size() : endPage;
			
			System.out.println("#### startPage - 1 = " + (startPage - 1) + ", endPage + 1 = " + endPage);
			
			return MomDirectQuery.totalRecordDemandPlanList.get(key).subList(startPage - 1, endPage);
		}
		
		/*return null;*/
	}
}

class RetrieveTotalItemList extends Thread {
	private Connection connection = null;
	private PreparedStatement preparedStatement = null;
	private ResultSet resultSet = null;
	private String key = null;
	private String sql = null;
	
	public RetrieveTotalItemList(Connection connection, PreparedStatement preparedStatement, ResultSet resultSet, String key, String sql) {
		this.connection = connection;
		this.preparedStatement = preparedStatement;
		this.resultSet = resultSet;
		this.key = key;
		this.sql = sql;
	}
	
	public void run() {
		try {
			while(resultSet.next()) {
				Map<String, Object> map = new HashMap<String, Object>();
				
				map.put("divisionCd"			,resultSet.getObject("DIVISION_CD"));
				map.put("companyCd"				,resultSet.getObject("COMPANY_CD"));
				map.put("itemId"				,resultSet.getObject("ITEM_ID"));
				map.put("itemName"				,resultSet.getObject("ITEM_NAME"));
				map.put("itemGroupCode"			,resultSet.getObject("ITEM_GROUP_CODE"));
				map.put("itemType"				,resultSet.getObject("ITEM_TYPE"));
				map.put("itemTypeName"			,resultSet.getObject("ITEM_TYPE_NAME"));
				map.put("specification"			,resultSet.getObject("SPECIFICATION"));
				map.put("vendorCd"				,resultSet.getObject("VENDOR_CD"));
				map.put("vendorName"			,resultSet.getObject("VENDOR_NAME"));
				map.put("departureVendorCd"		,resultSet.getObject("DEPARTURE_VENDOR_CD"));
				map.put("departureVendorName"	,resultSet.getObject("DEPARTURE_VENDOR_NAME"));
				map.put("unitPrice"				,resultSet.getObject("UNIT_PRICE"));
				map.put("unit"					,resultSet.getObject("UNIT"));
				map.put("unitName"				,resultSet.getObject("UNIT_NAME"));
				map.put("purchaseUnit"			,resultSet.getObject("PURCHASE_UNIT"));
				map.put("unitQty"				,resultSet.getObject("UNIT_QTY"));
				map.put("conversionUnit"		,resultSet.getObject("CONVERSION_UNIT"));
				map.put("conversionUnitQty"		,resultSet.getObject("CONVERSION_UNIT_QTY"));
				map.put("moq"					,resultSet.getObject("MOQ"));
				map.put("mom"					,resultSet.getObject("MOM"));
				map.put("safetyStockQty"		,resultSet.getObject("SAFETY_STOCK_QTY"));
				map.put("safetyStockDay"		,resultSet.getObject("SAFETY_STOCK_DAY"));
				map.put("safetyStockDayUom"		,resultSet.getObject("SAFETY_STOCK_DAY_UOM"));
				map.put("prodMinLotSize"		,resultSet.getObject("PROD_MIN_LOT_SIZE"));
				map.put("prodMaxLotSize"		,resultSet.getObject("PROD_MAX_LOT_SIZE"));
				map.put("prodIncrementLotSize"	,resultSet.getObject("PROD_INCREMENT_LOT_SIZE"));
				map.put("demandLotSize"			,resultSet.getObject("DEMAND_LOT_SIZE"));
				map.put("activationFlag"		,resultSet.getObject("ACTIVATION_FLAG"));
				map.put("activationFlagName"	,resultSet.getObject("ACTIVATION_FLAG_NAME"));
				map.put("isFiniteFlag"			,resultSet.getObject("IS_FINITE_FLAG"));
				map.put("isFiniteFlagName"		,resultSet.getObject("IS_FINITE_FLAG_NAME"));
				map.put("finiteTerm"			,resultSet.getObject("FINITE_TERM"));
				map.put("finiteTermUom"			,resultSet.getObject("FINITE_TERM_UOM"));
				map.put("inLocationId"			,resultSet.getObject("IN_LOCATION_ID"));
				map.put("inLocationName"		,resultSet.getObject("IN_LOCATION_NAME"));
				map.put("outLocationId"			,resultSet.getObject("OUT_LOCATION_ID"));
				map.put("outLocationName"		,resultSet.getObject("OUT_LOCATION_NAME"));
				map.put("testReportFlag"		,resultSet.getObject("TEST_REPORT_FLAG"));
				map.put("testReportFlagName"	,resultSet.getObject("TEST_REPORT_FLAG_NAME"));
				map.put("iqcFlag"				,resultSet.getObject("IQC_FLAG"));
				map.put("iqcFlagName"			,resultSet.getObject("IQC_FLAG_NAME"));
				map.put("pqcFlag"				,resultSet.getObject("PQC_FLAG"));
				map.put("pqcFlagName"			,resultSet.getObject("PQC_FLAG_NAME"));
				map.put("oqcFlag"				,resultSet.getObject("OQC_FLAG"));
				map.put("oqcFlagName"			,resultSet.getObject("OQC_FLAG_NAME"));
				map.put("rpItemId"				,resultSet.getObject("RP_ITEM_ID"));
				map.put("vendorItemId"			,resultSet.getObject("VENDOR_ITEM_ID"));
				map.put("altItemId"				,resultSet.getObject("ALT_ITEM_ID"));
				map.put("itemCategory"			,resultSet.getObject("ITEM_CATEGORY"));
				map.put("purchaseType"			,resultSet.getObject("PURCHASE_TYPE"));
				map.put("purchaseTypeName"		,resultSet.getObject("PURCHASE_TYPE_NAME"));
				map.put("itemUserId"			,resultSet.getObject("ITEM_USER_ID"));
				map.put("itemUserName"			,resultSet.getObject("ITEM_USER_NAME"));
				map.put("packingSizeWidth"		,resultSet.getObject("PACKING_SIZE_WIDTH"));
				map.put("packingSizeHeight"		,resultSet.getObject("PACKING_SIZE_HEIGHT"));
				map.put("materialWeight"		,resultSet.getObject("MATERIAL_WEIGHT"));
				map.put("palletWeight"			,resultSet.getObject("PALLET_WEIGHT"));
				map.put("unitWeight"			,resultSet.getObject("UNIT_WEIGHT"));
				map.put("boxWeight"				,resultSet.getObject("BOX_WEIGHT"));
				map.put("itemGroupLarge"		,resultSet.getObject("ITEM_GROUP_LARGE"));
				map.put("itemGroupLargeName"	,resultSet.getObject("ITEM_GROUP_LARGE_NAME"));
				map.put("itemGroupMedium"		,resultSet.getObject("ITEM_GROUP_MEDIUM"));
				map.put("itemGroupMediumName"	,resultSet.getObject("ITEM_GROUP_MEDIUM_NAME"));
				map.put("itemGroupSmall"		,resultSet.getObject("ITEM_GROUP_SMALL"));
				map.put("itemGroupSmallName"	,resultSet.getObject("ITEM_GROUP_SMALL_NAME"));
				map.put("description"			,resultSet.getObject("DESCRIPTION"));
				map.put("preBuildTerm"			,resultSet.getObject("PRE_BUILD_TERM"));
				map.put("leadTime"				,resultSet.getObject("LEAD_TIME"));
				map.put("trackingFlag"			,resultSet.getObject("TRACKING_FLAG"));
				map.put("trackingFlagName"		,resultSet.getObject("TRACKING_FLAG_NAME"));
				map.put("orderMethod"			,resultSet.getObject("ORDER_METHOD"));
				map.put("orderMethodName"		,resultSet.getObject("ORDER_METHOD_NAME"));
				map.put("itemGrade"				,resultSet.getObject("ITEM_GRADE"));
				map.put("itemGradeName"			,resultSet.getObject("ITEM_GRADE_NAME"));
				map.put("badLevel"				,resultSet.getObject("BAD_LEVEL"));
				map.put("badLevelName"			,resultSet.getObject("BAD_LEVEL_NAME"));
				map.put("standardOutQty"		,resultSet.getObject("STANDARD_OUT_QTY"));
				map.put("defectRate"			,resultSet.getObject("DEFECT_RATE"));
				map.put("byProductItemId"		,resultSet.getObject("BY_PRODUCT_ITEM_ID"));
				map.put("useYn"					,resultSet.getObject("USE_YN"));
				map.put("useYnName"				,resultSet.getObject("USE_YN_NAME"));
				map.put("createDate"			,resultSet.getObject("CREATE_DATE"));
				map.put("createBy"				,resultSet.getObject("CREATE_BY"));
				map.put("createUserName"		,resultSet.getObject("CREATE_USER_NAME"));
				map.put("updateDate"			,resultSet.getObject("UPDATE_DATE"));
				map.put("updateBy"				,resultSet.getObject("UPDATE_BY"));
				map.put("updateUserName"		,resultSet.getObject("UPDATE_USER_NAME"));
				map.put("attribute1"			,resultSet.getObject("ATTRIBUTE1"));
				map.put("attribute2"			,resultSet.getObject("ATTRIBUTE2"));
				map.put("attribute3"			,resultSet.getObject("ATTRIBUTE3"));
				map.put("attribute4"			,resultSet.getObject("ATTRIBUTE4"));
				map.put("attribute5"			,resultSet.getObject("ATTRIBUTE5"));
				map.put("attribute6"			,resultSet.getObject("ATTRIBUTE6"));
				map.put("attribute7"			,resultSet.getObject("ATTRIBUTE7"));
				map.put("attribute8"			,resultSet.getObject("ATTRIBUTE8"));
				map.put("attribute9"			,resultSet.getObject("ATTRIBUTE9"));
				map.put("attribute10"			,resultSet.getObject("ATTRIBUTE10"));
				map.put("attribute11"			,resultSet.getObject("ATTRIBUTE11"));
				map.put("attribute12"			,resultSet.getObject("ATTRIBUTE12"));
				map.put("attribute13"			,resultSet.getObject("ATTRIBUTE13"));
				map.put("attribute14"			,resultSet.getObject("ATTRIBUTE14"));
				map.put("attribute15"			,resultSet.getObject("ATTRIBUTE15"));
				map.put("freeOfferFlag"			,resultSet.getObject("FREE_OFFER_FLAG"));
				map.put("freeOfferFlagName"		,resultSet.getObject("FREE_OFFER_FLAG_NAME"));
				map.put("tool"					,resultSet.getObject("TOOL"));
				map.put("pressLine"				,resultSet.getObject("PRESS_LINE"));
				map.put("salesFreeFlag"			,resultSet.getObject("SALES_FREE_FLAG"));
				map.put("salesFreeFlagName"		,resultSet.getObject("SALES_FREE_FLAG_NAME"));
				map.put("rowCount"				,resultSet.getObject("ROW_COUNT"));
				
				MomDirectQuery.totalRecordItemList.get(this.key).add(map);
			}
			
			MomDirectQuery.isCompleteItemList.put(this.key, "Y");
			MomDirectQuery.getItemItemListQuery.put(this.key, this.sql);
			
			resultSet.close();
			preparedStatement.close();
			connection.close(); 
			
			System.out.println("#### Thread End : " + MomDirectQuery.totalRecordItemList.get(this.key).size());
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
}

class RetrieveTotalDemandPlanList extends Thread {
	private Connection connection = null;
	private PreparedStatement preparedStatement = null;
	private ResultSet resultSet = null;
	private String key = null;
	private String sql = null;
	private String[] tokens = null;
	
	public RetrieveTotalDemandPlanList(Connection connection, PreparedStatement preparedStatement, ResultSet resultSet, String key, String sql, String[] tokens) {
		this.connection = connection;
		this.preparedStatement = preparedStatement;
		this.resultSet = resultSet;
		this.key = key;
		this.sql = sql;
		this.tokens = tokens;
	}
	
	public void run() {
		try {
			while(resultSet.next()) {
				Map<String, Object> map = new HashMap<String, Object>();
				
				map.put("masterId"		,resultSet.getObject("MASTER_ID"));
				map.put("planId"		,resultSet.getObject("PLAN_ID"));
				map.put("demandId"		,resultSet.getObject("DEMAND_ID"));
				map.put("customerId"	,resultSet.getObject("CUSTOMER_ID"));
				map.put("lineCode"		,resultSet.getObject("LINE_CODE"));
				map.put("customerName"	,resultSet.getObject("CUSTOMER_NAME"));
				map.put("itemId"		,resultSet.getObject("ITEM_ID"));
				map.put("itemName"		,resultSet.getObject("ITEM_NAME"));
				map.put("startTime"		,resultSet.getObject("START_TIME"));
				map.put("qty"			,resultSet.getObject("QTY"));
				map.put("dueDate"		,resultSet.getObject("DUE_DATE"));
				map.put("salesOrderId"	,resultSet.getObject("SALES_ORDER_ID"));
				map.put("modelSuffix"	,resultSet.getObject("MODEL_SUFFIX"));
				map.put("mkt"			,resultSet.getObject("MKT"));
				map.put("krwPrice"		,resultSet.getObject("KRW_PRICE"));
				map.put("usdPrice"		,resultSet.getObject("USD_PRICE"));
				
				if(this.tokens != null && this.tokens.length > 1) {
					for(int j = 1; j < this.tokens.length; j++) {
						map.put(this.tokens[j], resultSet.getObject(this.tokens[j]));
					}
				}
				
				map.put("rowCount"		,resultSet.getObject("ROW_COUNT"));
				
				MomDirectQuery.totalRecordDemandPlanList.get(this.key).add(map);
			}
			
			MomDirectQuery.isCompleteDemandPlanList.put(this.key, "Y");
			MomDirectQuery.getDemandPlanItemListQuery.put(this.key, this.sql);
			
			resultSet.close();
			preparedStatement.close();
			connection.close(); 
			
			System.out.println("#### Thread End : " + MomDirectQuery.totalRecordDemandPlanList.get(this.key).size());
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
}
