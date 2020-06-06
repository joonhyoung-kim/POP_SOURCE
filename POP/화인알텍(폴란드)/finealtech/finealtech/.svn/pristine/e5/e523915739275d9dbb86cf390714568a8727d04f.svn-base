package com.thirautech.mom.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.thirautech.mom.service.MomService;

public class InterfaceUtil {
	public static Map<String, String> driver = null;
	
	public static boolean writeOut(MomService momService, String queryId, List<Map<String, Object>> paramList) {
		if(paramList == null || paramList.size() == 0) {
			return false;
		}
		
		List<Map<String, Object>> result = momService.getMapList("com.thirautech.mom.common.get_ifDbInfo_list", paramList.get(0));
		if(result == null || result.size() == 0) {
			return false;
		}
		
		if(result.get(0).get("tableId") == null) {
			return false;
		} 
		
		if(InterfaceUtil.driver == null) {
			InterfaceUtil.driver = new HashMap<String, String>();
			InterfaceUtil.driver.put("ORACLE", "oracle.jdbc.OracleDriver");
			InterfaceUtil.driver.put("MS-SQL", "com.microsoft.sqlserver.jdbc.SQLServerDriver");
		}
		
		String connectionString = "";
		if(result.get(0).get("dbType").toString().equals("ORACLE")) {
			connectionString = "jdbc:oracle:thin:@" + result.get(0).get("dbHost").toString() + ":" + result.get(0).get("dbPort").toString() + ":" + result.get(0).get("dbName").toString();
		} else if(result.get(0).get("dbType").toString().equals("MS-SQL")) {
			connectionString = "jdbc:sqlserver://" + result.get(0).get("dbHost").toString() + ":" + result.get(0).get("dbPort").toString() + ";databaseName=" + result.get(0).get("dbName").toString() + ";user=" + result.get(0).get("userId1").toString() + ";password=" + result.get(0).get("password").toString();
		}
		
		Connection connection = null;
        PreparedStatement preparedStatement = null;
		try {
			if(result.get(0).get("dbType").toString().equals("ORACLE")) {
				connection = DriverManager.getConnection(connectionString, result.get(0).get("userId1").toString(), result.get(0).get("password").toString());
			} else if(result.get(0).get("dbType").toString().equals("MS-SQL")) {
				connection = DriverManager.getConnection(connectionString);
			}
			
			connection.setAutoCommit(false);
        } catch(Exception e) {
        	try {
    			Class.forName(InterfaceUtil.driver.get(result.get(0).get("dbType").toString()));
    			
    			if(result.get(0).get("dbType").toString().equals("ORACLE")) {
    				connection = DriverManager.getConnection(connectionString, result.get(0).get("userId1").toString(), result.get(0).get("password").toString());
    			} else if(result.get(0).get("dbType").toString().equals("MS-SQL")) {
    				connection = DriverManager.getConnection(connectionString);
    			}
    			
    			connection.setAutoCommit(false);
    		} catch (Exception e1) {
    			// TODO Auto-generated catch block
    			e1.printStackTrace();
    		}
        } 
		
		for(int i = 0; i < result.size(); i++) {
			if(queryId.indexOf(result.get(i).get("queryId").toString()) >= 0 && result.get(i).get("tableId").toString().indexOf("IF_MOM_ITEM_DEFINITION") >= 0) {
				String sql = "INSERT INTO IF_MOM_ITEM_DEFINITION_R("
						+ " TRANS_SEQ"
						+ ", DIVISION_CD"
						+ ", COMPANY_CD"
						+ ", ITEM_ID"
						+ ", ITEM_NAME"
						+ ", ITEM_GROUP_CODE"
						+ ", ITEM_TYPE"
						+ ", SPECIFICATION"
						+ ", VENDOR_CD"
						+ ", DEPARTURE_VENDOR_CD"
						+ ", UNIT_PRICE"
						+ ", UNIT"
						+ ", PURCHASE_UNIT"
						+ ", UNIT_QTY"
						+ ", CONVERSION_UNIT"
						+ ", CONVERSION_UNIT_QTY"
						+ ", MOQ"
						+ ", MOM"
						+ ", SAFETY_STOCK_QTY"
						+ ", SAFETY_STOCK_DAY"
						+ ", SAFETY_STOCK_DAY_UOM"
						+ ", PROD_MIN_LOT_SIZE"
						+ ", PROD_MAX_LOT_SIZE"
						+ ", PROD_INCREMENT_LOT_SIZE"
						+ ", DEMAND_LOT_SIZE"
						+ ", ACTIVATION_FLAG"
						+ ", IS_FINITE_FLAG"
						+ ", FINITE_TERM"
						+ ", FINITE_TERM_UOM"
						+ ", IN_LOCATION_ID"
						+ ", OUT_LOCATION_ID"
						+ ", TEST_REPORT_FLAG"
						+ ", IQC_FLAG"
						+ ", PQC_FLAG"
						+ ", OQC_FLAG"
						+ ", RP_ITEM_ID"
						+ ", VENDOR_ITEM_ID"
						+ ", ALT_ITEM_ID"
						+ ", ITEM_CATEGORY"
						+ ", PURCHASE_TYPE"
						+ ", ITEM_USER_ID"
						+ ", PACKING_SIZE_WIDTH"
						+ ", PACKING_SIZE_HEIGHT"
						+ ", MATERIAL_WEIGHT"
						+ ", PALLET_WEIGHT"
						+ ", UNIT_WEIGHT"
						+ ", BOX_WEIGHT"
						+ ", ITEM_GROUP_LARGE"
						+ ", ITEM_GROUP_MEDIUM"
						+ ", ITEM_GROUP_SMALL"
						+ ", PRE_BUILD_TERM"
						+ ", LEAD_TIME"
						+ ", TRACKING_FLAG"
						+ ", ORDER_METHOD"
						+ ", ITEM_GRADE"
						+ ", BAD_LEVEL"
						+ ", STANDARD_OUT_QTY"
						+ ", DEFECT_RATE"
						+ ", BY_PRODUCT_ITEM_ID"
						+ ", USE_YN"
						+ ", DESCRIPTION"
						+ ", CREATE_DATE"
						+ ", CREATE_BY"
						+ ", UPDATE_DATE"
						+ ", UPDATE_BY"
						+ ", TID"
						+ ", ATTRIBUTE1"
						+ ", ATTRIBUTE2"
						+ ", ATTRIBUTE3"
						+ ", ATTRIBUTE4"
						+ ", ATTRIBUTE5"
						+ ", ATTRIBUTE6"
						+ ", ATTRIBUTE7"
						+ ", ATTRIBUTE8"
						+ ", ATTRIBUTE9"
						+ ", ATTRIBUTE10"
						+ ", ATTRIBUTE11"
						+ ", ATTRIBUTE12"
						+ ", ATTRIBUTE13"
						+ ", ATTRIBUTE14"
						+ ", ATTRIBUTE15"
						+ ", FREE_OFFER_FLAG"
						+ ", CONVERSION_UNIT"
						+ ", TOOL"
						+ ", PRESS_LINE"
						+ ", SALES_FREE_FLAG"
						+ ", POP_MAKE_LOT_QTY"
						+ ", POP_INPUT_TYPE"
						+ ", POP_CT_QTY"
						+ ", POP_GT_LABELID"
						+ ", POP_CT_LABELID"
						+ ", POP_PALLET_LABELID"
						+ ", POP_EAN"
						+ ", POP_UPC"
						+ ", POP_DESTINATION"
						+ ", POP_MADEBY"
						+ ", POP_GANBAN_LABELID"
						+ ", LABELDESC"
						+ ", LABELSPEC"
						+ ", TRNASFER_DATE"
						+ ", TRANSFER_FLAG"
						+ ", CRUD_FLAG"
						+ ")"
						+ " VALUES("
						+ " S_IF_SEQ.NEXTVAL"
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
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",'N'"
						+ ",'C'"
						+ ")";
				
				try {
					java.util.Date today = new java.util.Date();
				    
		        	preparedStatement = connection.prepareStatement(sql);
		        	
		        	for(int j = 0; j < paramList.size(); j++) {
		    			Map<String, Object> param = paramList.get(j);
//	    			for(int i = 0; i < paramList.size(); i++) {
//		    			Map<String, Object> param = paramList.get(i);
		    			
		    			preparedStatement.setString( 1, param.get("divisionCd").toString());
		    			preparedStatement.setString( 2, param.get("companyCd").toString());
		    			preparedStatement.setString( 3, param.get("itemId") == null ? null : param.get("itemId").toString());     
		    			preparedStatement.setString( 4, param.get("itemName") == null ? null : param.get("itemName").toString());     
		    			preparedStatement.setString( 5, param.get("itemGroupCode") == null ? null : param.get("itemGroupCode").toString());     
		    			preparedStatement.setString( 6, param.get("itemType") == null ? null : param.get("itemType").toString());    
		    			preparedStatement.setString( 7, param.get("specification") == null ? null : param.get("specification").toString());     
		    			preparedStatement.setString( 8, param.get("vendorCd") == null ? null : param.get("vendorCd").toString());    
		    			preparedStatement.setString( 9, param.get("departureVendorCd") == null ? null : param.get("departureVendorCd").toString());    
		    			if(param.get("unitPrice") != null && !param.get("unitPrice").toString().equals("")) {
		    				preparedStatement.setInt(10, Integer.parseInt(param.get("unitPrice").toString()));
		    			} else {
		    				preparedStatement.setObject(10, null);
		    			}
		    			preparedStatement.setString(11, param.get("unit") == null ? null : param.get("unit").toString());     
		    			preparedStatement.setString(12, param.get("purchaseUnit") == null ? null : param.get("purchaseUnit").toString());     
		    			if(param.get("unitQty") != null && !param.get("unitQty").toString().equals("")) {
		    				preparedStatement.setInt(13, Integer.parseInt(param.get("unitQty").toString()));
		    			} else {
		    				preparedStatement.setObject(13, null);
		    			}
		    			preparedStatement.setString(14, param.get("conversionUnit") == null ? null : param.get("conversionUnit").toString());    
		    			if(param.get("conversionUnitQty") != null && !param.get("conversionUnitQty").toString().equals("")) {
		    				preparedStatement.setInt(15, Integer.parseInt(param.get("conversionUnitQty").toString()));
		    			} else {
		    				preparedStatement.setObject(15, null);
		    			}
		    			if(param.get("moq") != null && !param.get("moq").toString().equals("")) {
		    				preparedStatement.setInt(16, Integer.parseInt(param.get("moq").toString()));
		    			} else {
		    				preparedStatement.setObject(16, null);
		    			}
		    			if(param.get("mom") != null && !param.get("mom").toString().equals("")) {
		    				preparedStatement.setInt(17, Integer.parseInt(param.get("mom").toString()));
		    			} else {
		    				preparedStatement.setObject(17, null);
		    			}
		    			if(param.get("safetyStockQty") != null && !param.get("safetyStockQty").toString().equals("")) {
		    				preparedStatement.setInt(18, Integer.parseInt(param.get("safetyStockQty").toString()));
		    			} else {
		    				preparedStatement.setObject(18, null);
		    			}
		    			if(param.get("safetyStockDay") != null && !param.get("safetyStockDay").toString().equals("")) {
		    				preparedStatement.setInt(19, Integer.parseInt(param.get("safetyStockDay").toString()));
		    			} else {
		    				preparedStatement.setObject(19, null);
		    			}
		    			if(param.get("safetyStockDayUom") != null && !param.get("safetyStockDayUom").toString().equals("")) {
		    				preparedStatement.setInt(20, Integer.parseInt(param.get("safetyStockDayUom").toString()));
		    			} else {
		    				preparedStatement.setObject(20, null);
		    			}
		    			if(param.get("prodMinLotSize") != null && !param.get("prodMinLotSize").toString().equals("")) {
		    				preparedStatement.setInt(21, Integer.parseInt(param.get("prodMinLotSize").toString()));
		    			} else {
		    				preparedStatement.setObject(21, null);
		    			}
		    			if(param.get("prodMaxLotSize") != null && !param.get("prodMaxLotSize").toString().equals("")) {
		    				preparedStatement.setInt(22, Integer.parseInt(param.get("prodMaxLotSize").toString()));
		    			} else {
		    				preparedStatement.setObject(22, null);
		    			}
		    			preparedStatement.setString(23, param.get("prodIncrementLotSize") == null ? null : param.get("prodIncrementLotSize").toString());     
		    			preparedStatement.setString(24, param.get("demandLotSize") == null ? null : param.get("demandLotSize").toString());     
		    			preparedStatement.setString(25, param.get("activationFlag") == null ? null : param.get("activationFlag").toString());    
		    			preparedStatement.setString(26, param.get("isFiniteFlag") == null ? null : param.get("isFiniteFlag").toString());     
		    			if(param.get("finiteTerm") != null && !param.get("finiteTerm").toString().equals("")) {
		    				preparedStatement.setInt(27, Integer.parseInt(param.get("finiteTerm").toString()));
		    			} else {
		    				preparedStatement.setObject(27, null);
		    			}
		    			preparedStatement.setString(28, param.get("finiteTermUom") == null ? null : param.get("finiteTermUom").toString());     
		    			preparedStatement.setString(29, param.get("inLocationId") == null ? null : param.get("inLocationId").toString());     
		    			preparedStatement.setString(30, param.get("outLocationId") == null ? null : param.get("outLocationId").toString());     
		    			preparedStatement.setString(31, param.get("testReportFlag") == null ? null : param.get("testReportFlag").toString());     
		    			preparedStatement.setString(32, param.get("iqcFlag") == null ? null : param.get("iqcFlag").toString());     
		    			preparedStatement.setString(33, param.get("pqcFlag") == null ? null : param.get("pqcFlag").toString());     
		    			preparedStatement.setString(34, param.get("oqcFlag") == null ? null : param.get("oqcFlag").toString());     
		    			preparedStatement.setString(35, param.get("rpItemId") == null ? null : param.get("rpItemId").toString());     
		    			preparedStatement.setString(36, param.get("vendorItemId") == null ? null : param.get("vendorItemId").toString());     
		    			preparedStatement.setString(37, param.get("altItemId") == null ? null : param.get("altItemId").toString());     
		    			preparedStatement.setString(38, param.get("itemCategory") == null ? null : param.get("itemCategory").toString());     
		    			preparedStatement.setString(39, param.get("purchaseType") == null ? null : param.get("purchaseType").toString());     
		    			preparedStatement.setString(40, param.get("itemUserId") == null ? null : param.get("itemUserId").toString());     
		    			if(param.get("packingSizeWidth") != null && !param.get("packingSizeWidth").toString().equals("")) {
		    				preparedStatement.setInt(41, Integer.parseInt(param.get("packingSizeWidth").toString()));
		    			} else {
		    				preparedStatement.setObject(41, null);
		    			}
		    			if(param.get("packingSizeHeight") != null && !param.get("packingSizeHeight").toString().equals("")) {
		    				preparedStatement.setInt(42, Integer.parseInt(param.get("packingSizeHeight").toString()));
		    			} else {
		    				preparedStatement.setObject(42, null);
		    			}
		    			if(param.get("materialWeight") != null && !param.get("materialWeight").toString().equals("")) {
		    				preparedStatement.setInt(43, Integer.parseInt(param.get("materialWeight").toString()));
		    			} else {
		    				preparedStatement.setObject(43, null);
		    			}
		    			if(param.get("palletWeight") != null && !param.get("palletWeight").toString().equals("")) {
		    				preparedStatement.setInt(44, Integer.parseInt(param.get("palletWeight").toString()));
		    			} else {
		    				preparedStatement.setObject(44, null);
		    			}
		    			if(param.get("unitWeight") != null && !param.get("unitWeight").toString().equals("")) {
		    				preparedStatement.setInt(45, Integer.parseInt(param.get("unitWeight").toString()));
		    			} else {
		    				preparedStatement.setObject(45, null);
		    			}
		    			if(param.get("boxWeight") != null && !param.get("boxWeight").toString().equals("")) {
		    				preparedStatement.setInt(46, Integer.parseInt(param.get("boxWeight").toString()));
		    			} else {
		    				preparedStatement.setObject(46, null);
		    			}
		    			preparedStatement.setString(47, param.get("itemGroupLarge") == null ? null : param.get("itemGroupLarge").toString());     
		    			preparedStatement.setString(48, param.get("itemGroupMedium") == null ? null : param.get("itemGroupMedium").toString());     
		    			preparedStatement.setString(49, param.get("itemGroupSmall") == null ? null : param.get("itemGroupSmall").toString());     
		    			if(param.get("preBuildTerm") != null && !param.get("preBuildTerm").toString().equals("")) {
		    				preparedStatement.setInt(50, Integer.parseInt(param.get("preBuildTerm").toString()));
		    			} else {
		    				preparedStatement.setObject(50, null);
		    			}
		    			if(param.get("leadTime") != null && !param.get("leadTime").toString().equals("")) {
		    				preparedStatement.setInt(51, Integer.parseInt(param.get("leadTime").toString()));
		    			} else {
		    				preparedStatement.setObject(51, null);
		    			}
		    			preparedStatement.setString(52, param.get("trackingFlag") == null ? null : param.get("trackingFlag").toString());     
		    			preparedStatement.setString(53, param.get("orderMethod") == null ? null : param.get("orderMethod").toString());     
		    			preparedStatement.setString(54, param.get("itemGrade") == null ? null : param.get("itemGrade").toString());     
		    			preparedStatement.setString(55, param.get("badLevel") == null ? null : param.get("badLevel").toString());     
		    			if(param.get("standardOutQty") != null && !param.get("standardOutQty").toString().equals("")) {
		    				preparedStatement.setInt(56, Integer.parseInt(param.get("standardOutQty").toString()));
		    			} else {
		    				preparedStatement.setObject(56, null);
		    			}
		    			if(param.get("defectRate") != null && !param.get("defectRate").toString().equals("")) {
		    				preparedStatement.setInt(57, Integer.parseInt(param.get("defectRate").toString()));
		    			} else {
		    				preparedStatement.setObject(57, null);
		    			}
		    			preparedStatement.setString(58, param.get("byProductItemId") == null ? null : param.get("byProductItemId").toString());     
		    			preparedStatement.setString(59, param.get("useYn") == null ? null : param.get("useYn").toString());    
		    			preparedStatement.setString(60, param.get("description") == null ? null : param.get("description").toString());    
		    			if(result.get(i).get("dbType").toString().equals("ORACLE")) {
	    				   preparedStatement.setDate(61, new java.sql.Date(today.getTime()));
	    				} else if(result.get(i).get("dbType").toString().equals("MS-SQL")) {
	    				   preparedStatement.setTimestamp(61, new Timestamp(today.getTime()));
	    				}
		    			preparedStatement.setString(62, param.get("createBy") == null ? null : param.get("createBy").toString());    
		    			if(result.get(i).get("dbType").toString().equals("ORACLE")) {
	    				   preparedStatement.setDate(63, new java.sql.Date(today.getTime()));
	    				} else if(result.get(i).get("dbType").toString().equals("MS-SQL")) {
	    				   preparedStatement.setTimestamp(63, new Timestamp(today.getTime()));
	    				}
		    			preparedStatement.setString(64, param.get("updateBy") == null ? null : param.get("updateBy").toString());     
		    			preparedStatement.setString(65, param.get("tid") == null ? null : param.get("tid").toString());    
		    			preparedStatement.setString(66, param.get("attribute1") == null ? null : param.get("attribute1").toString());     
		    			preparedStatement.setString(67, param.get("attribute2") == null ? null : param.get("attribute2").toString());     
		    			preparedStatement.setString(68, param.get("attribute3") == null ? null : param.get("attribute3").toString());     
		    			preparedStatement.setString(69, param.get("attribute4") == null ? null : param.get("attribute4").toString());     
		    			preparedStatement.setString(70, param.get("attribute5") == null ? null : param.get("attribute5").toString());     
		    			preparedStatement.setString(71, param.get("attribute6") == null ? null : param.get("attribute6").toString());     
		    			preparedStatement.setString(72, param.get("attribute7") == null ? null : param.get("attribute7").toString());     
		    			preparedStatement.setString(73, param.get("attribute8") == null ? null : param.get("attribute8").toString());     
		    			preparedStatement.setString(74, param.get("attribute9") == null ? null : param.get("attribute9").toString());     
		    			preparedStatement.setString(75, param.get("attribute10") == null ? null : param.get("attribute10").toString());   
		    			preparedStatement.setString(76, param.get("attribute11") == null ? null : param.get("attribute11").toString());   
		    			preparedStatement.setString(77, param.get("attribute12") == null ? null : param.get("attribute12").toString());   
		    			preparedStatement.setString(78, param.get("attribute13") == null ? null : param.get("attribute13").toString());   
		    			preparedStatement.setString(79, param.get("attribute14") == null ? null : param.get("attribute14").toString());   
		    			preparedStatement.setString(80, param.get("attribute15") == null ? null : param.get("attribute15").toString());   
		    			preparedStatement.setString(81, param.get("freeOfferFlag") == null ? null : param.get("freeOfferFlag").toString());    
		    			preparedStatement.setString(82, param.get("conversionUnit") == null ? null : param.get("conversionUnit").toString()); 
		    			preparedStatement.setString(83, param.get("tool") == null ? null : param.get("tool").toString());     
		    			preparedStatement.setString(84, param.get("pressLine") == null ? null : param.get("pressLine").toString());    
		    			preparedStatement.setString(85, param.get("salesFreeFlag") == null ? null : param.get("salesFreeFlag").toString());     
		    			if(param.get("popMakeLotQty") != null && !param.get("popMakeLotQty").toString().equals("")) {
		    				preparedStatement.setInt(86, Integer.parseInt(param.get("popMakeLotQty").toString()));
		    			} else {
		    				preparedStatement.setObject(86, null);
		    			}
		    			preparedStatement.setString(87, param.get("popInputType").toString());
		    			if(param.get("popCtQty") != null && !param.get("popCtQty").toString().equals("")) {
		    				preparedStatement.setInt(88, Integer.parseInt(param.get("popCtQty").toString()));
		    			} else {
		    				preparedStatement.setObject(88, null);
		    			}
		    			preparedStatement.setString(89, param.get("popGtLabelid") == null ? null : param.get("popGtLabelid").toString());    
		    			preparedStatement.setString(90, param.get("popCtLabelid") == null ? null : param.get("popCtLabelid").toString());     
		    			preparedStatement.setString(91, param.get("popPalletLabelid") == null ? null : param.get("popPalletLabelid").toString());     
		    			preparedStatement.setString(92, param.get("popEan") == null ? null : param.get("popEan").toString());     
		    			preparedStatement.setString(93, param.get("popUpc") == null ? null : param.get("popUpc").toString());    
		    			preparedStatement.setString(94, param.get("popDestination") == null ? null : param.get("popDestination").toString());    
		    			preparedStatement.setString(95, param.get("popMadeby") == null ? null : param.get("popMadeby").toString());     
		    			preparedStatement.setString(96, param.get("popGanbanLabelid") == null ? null : param.get("popGanbanLabelid").toString());     
		    			preparedStatement.setString(97, param.get("popLabelDesc") == null ? null : param.get("popLabelDesc").toString());     
		    			preparedStatement.setString(98, param.get("popLabelSpec") == null ? null : param.get("popLabelSpec").toString());	    			                           
		    			if(result.get(i).get("dbType").toString().equals("ORACLE")) {
	    				   preparedStatement.setDate(99, new java.sql.Date(today.getTime()));
	    				} else if(result.get(i).get("dbType").toString().equals("MS-SQL")) {
	    				   preparedStatement.setTimestamp(99, new Timestamp(today.getTime()));
	    				}
		    			preparedStatement.executeUpdate();
		    		}
		    		
		    		connection.commit();
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
			else if(queryId.indexOf(result.get(i).get("queryId").toString()) >= 0 && result.get(i).get("tableId").toString().indexOf("IF_MOM_BOR") >= 0) {
				String sql = "INSERT INTO IF_MOM_BOR_R("
						+ " TRANS_SEQ"
						+ ", DIVISION_CD"
						+ ", COMPANY_CD"
						+ ", ITEM_ID"
						+ ", ROUTE_CD"
						+ ", RESOURCE_CD"
						+ ", TACT_TIME"
						+ ", EARLY_PRODUCING_TERM"
						+ ", EARLY_PRODUCING_TERM_UOM"
						+ ", PROD_LOT_SIZE"
						+ ", ALT_PRIORITY"
						+ ", TAT"
						+ ", YIELD"
						+ ", CYCLE_TIME"
						+ ", USE_YN"
						+ ", DESCRIPTION"
						+ ", CREATE_DATE"
						+ ", CREATE_BY"
						+ ", UPDATE_DATE"
						+ ", UPDATE_BY"
						+ ", TID"
						+ ", TRANSFER_DATE"
						+ ", TRANSFER_FLAG"
						+ ", CRUD_FLAG"
						+ ")"
						+ " VALUES("
						+ " S_IF_SEQ.NEXTVAL"
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
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",?"
						+ ",'N'"
						+ ",'C'"
						+ ")";
				try {
					java.util.Date today = new java.util.Date();
				    
		        	preparedStatement = connection.prepareStatement(sql);
		        	
		        	for(int j = 0; j < paramList.size(); j++) {
		    			Map<String, Object> param = paramList.get(j);
//		        	for(int i = 0; i < paramList.size(); i++) {
//		    			Map<String, Object> param = paramList.get(i);
		    			
		    			preparedStatement.setString( 1, param.get("divisionCd").toString());
		    			preparedStatement.setString( 2, param.get("companyCd").toString());
		    			preparedStatement.setString( 3, param.get("itemId") == null ? null : param.get("itemId").toString());     
		    			preparedStatement.setString( 4, param.get("routeCd") == null ? null : param.get("routeCd").toString());     
		    			preparedStatement.setString( 5, param.get("resourceCd") == null ? null : param.get("resourceCd").toString());     
		    			if(param.get("tactTime") != null && !param.get("tactTime").toString().equals("")) {
		    				preparedStatement.setInt(6, Integer.parseInt(param.get("tactTime").toString()));
		    			} else {
		    				preparedStatement.setObject(6, null);
		    			}
		    			if(param.get("earlyProductingTerm") != null && !param.get("earlyProductingTerm").toString().equals("")) {
		    				preparedStatement.setInt(7, Integer.parseInt(param.get("earlyProductingTerm").toString()));
		    			} else {
		    				preparedStatement.setObject(7, null);
		    			}
		    			preparedStatement.setString(8, param.get("earlyProductingTermUom") == null ? null : param.get("earlyProductingTermUom").toString());    
		    			if(param.get("prodLotSize") != null && !param.get("prodLotSize").toString().equals("")) {
		    				preparedStatement.setInt(9, Integer.parseInt(param.get("prodLotSize").toString()));
		    			} else {
		    				preparedStatement.setObject(9, null);
		    			}
		    			if(param.get("altPriority") != null && !param.get("altPriority").toString().equals("")) {
		    				preparedStatement.setInt(10, Integer.parseInt(param.get("altPriority").toString()));
		    			} else {
		    				preparedStatement.setObject(10, null);
		    			}  
		    			if(param.get("tat") != null && !param.get("tat").toString().equals("")) {
		    				preparedStatement.setInt(11, Integer.parseInt(param.get("tat").toString()));
		    			} else {
		    				preparedStatement.setObject(11, null);
		    			}  
		    			if(param.get("yield") != null && !param.get("yield").toString().equals("")) {
		    				preparedStatement.setInt(12, Integer.parseInt(param.get("yield").toString()));
		    			} else {
		    				preparedStatement.setObject(12, null);
		    			} 
		    			if(param.get("cycleTime") != null && !param.get("cycleTime").toString().equals("")) {
		    				preparedStatement.setInt(13, Integer.parseInt(param.get("cycleTime").toString()));
		    			} else {
		    				preparedStatement.setObject(13, null);
		    			} 	
		    			preparedStatement.setString(14, param.get("useYn") == null ? null : param.get("useYn").toString());   
		    			preparedStatement.setString(15, param.get("description") == null ? null : param.get("description").toString());
		    			if(result.get(i).get("dbType").toString().equals("ORACLE")) {
	    				   preparedStatement.setDate(16, new java.sql.Date(today.getTime()));
	    				} else if(result.get(i).get("dbType").toString().equals("MS-SQL")) {
	    				   preparedStatement.setTimestamp(16, new Timestamp(today.getTime()));
	    				}
		    			preparedStatement.setString(17, param.get("createBy") == null ? null : param.get("createBy").toString());  
		    			if(result.get(i).get("dbType").toString().equals("ORACLE")) {
	    				   preparedStatement.setDate(18, new java.sql.Date(today.getTime()));
	    				} else if(result.get(i).get("dbType").toString().equals("MS-SQL")) {
	    				   preparedStatement.setTimestamp(18, new Timestamp(today.getTime()));
	    				}
		    			preparedStatement.setString(19, param.get("updateBy") == null ? null : param.get("updateBy").toString()); 
		    			preparedStatement.setString(20, param.get("tid") == null ? null : param.get("tid").toString());
		    			if(result.get(i).get("dbType").toString().equals("ORACLE")) {
	    				   preparedStatement.setDate(21, new java.sql.Date(today.getTime()));
	    				} else if(result.get(i).get("dbType").toString().equals("MS-SQL")) {
	    				   preparedStatement.setTimestamp(21, new Timestamp(today.getTime()));
	    				}
		    			preparedStatement.executeUpdate();
		    		}
		    		
		    		connection.commit();
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
			else if(queryId.indexOf(result.get(i).get("queryId").toString()) >= 0 && result.get(i).get("tableId").toString().indexOf("IF_MOM_RESOURCE") >= 0) {
				String sql = "INSERT INTO IF_MOM_RESOURCE_R("
						+ " TRANS_SEQ"
						+ " ,DIVISION_CD"
	 					+ " ,COMPANY_CD"
						+ " ,RESOURCE_CD"
						+ " ,RESOURCE_NAME"
						+ " ,RESOURCE_GROUP_CD"
						+ " ,RESOURCE_TYPE"
						+ " ,RUN_COUNT"
						+ " ,RECIPE_ID"
						+ " ,PLC_STATE"
						+ " ,STATE"
						+ " ,PREV_STATE"
						+ " ,STATE_TIME"
						+ " ,PREV_STATE_TIME"
						+ " ,VENDOR_CD"
						+ " ,MODEL_NUMBER"
						+ " ,SERIAL_NO"
						+ " ,EC_SERVER_NAME"
						+ " ,CONTROL_MODE"
						+ " ,PREV_CONTROL_MODE"
						+ " ,CONTROL_MODE_TIME"
						+ " ,PREV_CONTROL_MODE_TIME"
						+ " ,OPERATION_MODE"
						+ " ,ALARM_ID"
						+ " ,CAPABILITY"
						+ " ,CAPABILITY_UNIT"
						+ " ,MAX_CAPACITY"
						+ " ,MIN_CAPACITY"
						+ " ,TACT_TIME"
						+ " ,TACT_TIME_UNIT"
						+ " ,LOCATION_CD"
						+ " ,PROCESS_STATE"
						+ " ,PREV_PROCESS_STATE"
						+ " ,WORK_PERSON_CNT"
						+ " ,SPECIFICATION"
						+ " ,CYCLE_TIME"
						+ " ,DAY_TIME"
						+ " ,NIGHT_TIME"
						+ " ,OPERATION_RATE"
						+ " ,REAL_OPERATION_TIME"
						+ " ,RESOURCE_FREIGHT_RATE"
						+ " ,PRODUCTION_AMOUNT"
						+ " ,PRODUCTION_YEAR"
						+ " ,INSTALLATION_DATE"
						+ " ,PRODUCTION_PLACE"
						+ " ,USE_PLACE"
						+ " ,INSPECTION_DATE"
						+ " ,INSPECTION_TYPE"
						+ " ,INSPECTION_INTERVAL"
						+ " ,MEASURE_USER_INIT"
						+ " ,LINE_INIT"
						+ " ,MEASURE_TYPE"
						+ " ,UNUSUAL_DATA"
						+ " ,GOOD_LOCATION_CD"
						+ " ,BAD_LOCATION_CD"
						+ " ,MES_UINT_FLAG"
						+ " ,MES_LINE_CD"
						+ " ,OUTSOURCING_FLAG"
						+ " ,USE_YN"
						+ " ,DESCRIPTION"
						+ " ,CREATE_DATE"
						+ " ,CREATE_BY"
						+ " ,UPDATE_DATE"
						+ " ,UPDATE_BY"
						+ " ,TID"
						+ " ,TRANSFER_DATE"
						+ " ,TRANSFER_FLAG"
						+ " ,CRUD_FLAG"
						+ ")"
						+ " VALUES("
						+ " S_IF_SEQ.NEXTVAL"
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
						+ ",?"
						+ ",'N'"
						+ ",'C'"
						+ ")";
				try {
					java.util.Date today = new java.util.Date();
		        	preparedStatement = connection.prepareStatement(sql);
		        	for(int j = 0; j < paramList.size(); j++) {
		    			Map<String, Object> param = paramList.get(j);
//	    			for(int i = 0; i < paramList.size(); i++) {
//		    			Map<String, Object> param = paramList.get(i);
		    			preparedStatement.setString( 1, param.get("divisionCd").toString());
		    			preparedStatement.setString( 2, param.get("companyCd").toString());
		    			preparedStatement.setString( 3, param.get("resourceCd") == null ? null : param.get("resourceCd").toString());     
		    			preparedStatement.setString( 4, param.get("resourceName") == null ? null : param.get("resourceName").toString());     
		    			preparedStatement.setString( 5, param.get("resourceGroupCd") == null ? null : param.get("resourceGroupCd").toString());  
		    			preparedStatement.setString( 6, param.get("resourceType") == null ? null : param.get("resourceType").toString()); 
		    			if(param.get("runCount") != null && !param.get("runCount").toString().equals("")) {
		    				preparedStatement.setInt(7, Integer.parseInt(param.get("runCount").toString()));
		    			} else {
		    				preparedStatement.setObject(7, null);
		    			}
		    			preparedStatement.setString( 8, param.get("recipeId") == null ? null : param.get("recipeId").toString());    
		    			preparedStatement.setString( 9, param.get("plcState") == null ? null : param.get("plcState").toString());  
		    			preparedStatement.setString( 10, param.get("state") == null ? null : param.get("state").toString());  
		    			preparedStatement.setString(11, param.get("prevState") == null ? null : param.get("prevState").toString());
		    			if(result.get(i).get("dbType").toString().equals("ORACLE")) {
	    				   preparedStatement.setDate(12, param.get("stateTime") == null ? null : java.sql.Date.valueOf(param.get("stateTime").toString()));
	    				} else if(result.get(i).get("dbType").toString().equals("MS-SQL")) {
	    				   preparedStatement.setTimestamp(12, param.get("stateTime") == null ? null : Timestamp.valueOf(param.get("stateTime").toString()));
	    				}
		    			if(result.get(i).get("dbType").toString().equals("ORACLE")) {
	    				   preparedStatement.setDate(13, param.get("prevStateTime")== null ? null : java.sql.Date.valueOf(param.get("prevStateTime").toString()));
	    				} else if(result.get(i).get("dbType").toString().equals("MS-SQL")) {
	    				   preparedStatement.setTimestamp(13, param.get("prevStateTime") == null ? null : Timestamp.valueOf(param.get("prevStateTime").toString()));
	    				}
		    			preparedStatement.setString(14, param.get("vendorCd") == null ? null : param.get("vendorCd").toString());
		    			preparedStatement.setString(15, param.get("modelNumber") == null ? null : param.get("modelNumber").toString());
		    			preparedStatement.setString(16, param.get("serialNo") == null ? null : param.get("serialNo").toString());
		    			preparedStatement.setString(17, param.get("ecServerName") == null ? null : param.get("ecServerName").toString());
		    			preparedStatement.setString(18, param.get("controlMode") == null ? null : param.get("controlMode").toString());
		    			preparedStatement.setString(19, param.get("prevControlMode") == null ? null : param.get("prevControlMode").toString());
		    			if(result.get(i).get("dbType").toString().equals("ORACLE")) {
	    				   preparedStatement.setDate(20, param.get("controlModeTime") == null ? null : java.sql.Date.valueOf(param.get("controlModeTime").toString()));
	    				} else if(result.get(i).get("dbType").toString().equals("MS-SQL")) {
	    				   preparedStatement.setTimestamp(20, param.get("controlModeTime") == null ? null : Timestamp.valueOf(param.get("controlModeTime").toString()));
	    				}
		    			if(result.get(i).get("dbType").toString().equals("ORACLE")) {
	    				   preparedStatement.setDate(21, param.get("prevControlModeTime") == null ? null : java.sql.Date.valueOf(param.get("prevControlModeTime").toString()));
	    				} else if(result.get(i).get("dbType").toString().equals("MS-SQL")) {
	    				   preparedStatement.setTimestamp(21, param.get("prevControlModeTime") == null ? null : Timestamp.valueOf(param.get("prevControlModeTime").toString()));
	    				}
		    			preparedStatement.setString(22, param.get("operationMode") == null ? null : param.get("operationMode").toString());
		    			preparedStatement.setString(23, param.get("alarmId") == null ? null : param.get("alarmId").toString());
		    			if(param.get("capability") != null && !param.get("capability").toString().equals("")) {
		    				preparedStatement.setInt(24, Integer.parseInt(param.get("capability").toString()));
		    			} else {
		    				preparedStatement.setObject(24, null);
		    			}
		    			preparedStatement.setString(25, param.get("capabilityUnit") == null ? null : param.get("capabilityUnit").toString());
		    			if(param.get("maxCapacity") != null && !param.get("maxCapacity").toString().equals("")) {
		    				preparedStatement.setInt(26, Integer.parseInt(param.get("maxCapacity").toString()));
		    			} else {
		    				preparedStatement.setObject(26, null);
		    			}
		    			if(param.get("minCapacity") != null && !param.get("minCapacity").toString().equals("")) {
		    				preparedStatement.setInt(27, Integer.parseInt(param.get("minCapacity").toString()));
		    			} else {
		    				preparedStatement.setObject(27, null);
		    			}
		    			if(param.get("tactTime") != null && !param.get("tactTime").toString().equals("")) {
		    				preparedStatement.setInt(28, Integer.parseInt(param.get("tactTime").toString()));
		    			} else {
		    				preparedStatement.setObject(28, null);
		    			}
		    			preparedStatement.setString(29, param.get("tactTimeUnit") == null ? null : param.get("tactTimeUnit").toString());
		    			preparedStatement.setString(30, param.get("locationCd") == null ? null : param.get("locationCd").toString());
		    			preparedStatement.setString(31, param.get("processState") == null ? null : param.get("processState").toString());
		    			preparedStatement.setString(32, param.get("prevProcessState") == null ? null : param.get("prevProcessState").toString());
		    			if(param.get("workPersonCnt") != null && !param.get("workPersonCnt").toString().equals("")) {
		    				preparedStatement.setInt(33, Integer.parseInt(param.get("workPersonCnt").toString()));
		    			} else {
		    				preparedStatement.setObject(33, null);
		    			}
		    			preparedStatement.setString(34, param.get("specification") == null ? null : param.get("specification").toString());
		    			if(param.get("cycleTime") != null && !param.get("cycleTime").toString().equals("")) {
		    				preparedStatement.setInt(35, Integer.parseInt(param.get("cycleTime").toString()));
		    			} else {
		    				preparedStatement.setObject(35, null);
		    			}
		    			if(result.get(i).get("dbType").toString().equals("ORACLE")) {
	    				   preparedStatement.setDate(36, param.get("dayTime") == null ? null : java.sql.Date.valueOf(param.get("dayTime").toString()));
	    				} else if(result.get(i).get("dbType").toString().equals("MS-SQL")) {
	    				   preparedStatement.setTimestamp(36, param.get("dayTime") == null ? null : Timestamp.valueOf(param.get("dayTime").toString()));
	    				}
		    			if(result.get(i).get("dbType").toString().equals("ORACLE")) {
	    				   preparedStatement.setDate(37, param.get("nightTime") == null ? null : java.sql.Date.valueOf(param.get("nightTime").toString()));
	    				} else if(result.get(i).get("dbType").toString().equals("MS-SQL")) {
	    				   preparedStatement.setTimestamp(37, param.get("nightTime") == null ? null : Timestamp.valueOf(param.get("nightTime").toString()));
	    				}
		    			if(param.get("operationRate") != null && !param.get("operationRate").toString().equals("")) {
		    				preparedStatement.setInt(38, Integer.parseInt(param.get("operationRate").toString()));
		    			} else {
		    				preparedStatement.setObject(38, null);
		    			}
		    			if(result.get(i).get("dbType").toString().equals("ORACLE")) {
	    				   preparedStatement.setDate(39, param.get("realOperationTime") == null ? null : java.sql.Date.valueOf(param.get("realOperationTime").toString()));
	    				} else if(result.get(i).get("dbType").toString().equals("MS-SQL")) {
	    				   preparedStatement.setTimestamp(39, param.get("realOperationTime") == null ? null : Timestamp.valueOf(param.get("realOperationTime").toString()));
	    				}
		    			if(param.get("resourceFreightRate") != null && !param.get("resourceFreightRate").toString().equals("")) {
		    				preparedStatement.setInt(40, Integer.parseInt(param.get("resourceFreightRate").toString()));
		    			} else {
		    				preparedStatement.setObject(40, null);
		    			}
		    			if(param.get("productionAmount") != null && !param.get("productionAmount").toString().equals("")) {
		    				preparedStatement.setInt(41, Integer.parseInt(param.get("productionAmount").toString()));
		    			} else {
		    				preparedStatement.setObject(41, null);
		    			}
		    			if(result.get(i).get("dbType").toString().equals("ORACLE")) {
	    				   preparedStatement.setDate(42, param.get("productionYear") == null ? null : java.sql.Date.valueOf(param.get("productionYear").toString()));
	    				} else if(result.get(i).get("dbType").toString().equals("MS-SQL")) {
	    				   preparedStatement.setTimestamp(42, param.get("productionYear") == null ? null : Timestamp.valueOf(param.get("productionYear").toString()));
	    				}
		    			if(result.get(i).get("dbType").toString().equals("ORACLE")) {
	    				   preparedStatement.setDate(43, param.get("installationDate") == null ? null : java.sql.Date.valueOf(param.get("installationDate").toString()));
	    				} else if(result.get(i).get("dbType").toString().equals("MS-SQL")) {
	    				   preparedStatement.setTimestamp(43, param.get("installationDate") == null ? null : Timestamp.valueOf(param.get("installationDate").toString()));
	    				}
		    			preparedStatement.setString(44, param.get("productionPlace") == null ? null : param.get("productionPlace").toString());
		    			preparedStatement.setString(45, param.get("usePlace") == null ? null : param.get("usePlace").toString());
		    			if(result.get(i).get("dbType").toString().equals("ORACLE")) {
	    				   preparedStatement.setDate(46, param.get("inspectionDate") == null ? null : java.sql.Date.valueOf(param.get("inspectionDate").toString()));
	    				} else if(result.get(i).get("dbType").toString().equals("MS-SQL")) {
	    				   preparedStatement.setTimestamp(46, param.get("inspectionDate") == null ? null : Timestamp.valueOf(param.get("inspectionDate").toString()));
	    				}
		    			preparedStatement.setString(47, param.get("inspectionType") == null ? null : param.get("inspectionType").toString());
		    			preparedStatement.setString(48, param.get("inspectionInterval") == null ? null : param.get("inspectionInterval").toString());
		    			preparedStatement.setString(49, param.get("measureUserInit") == null ? null : param.get("measureUserInit").toString());
		    			preparedStatement.setString(50, param.get("lineInit") == null ? null : param.get("lineInit").toString());
		    			preparedStatement.setString(51, param.get("measureType") == null ? null : param.get("measureType").toString());
		    			preparedStatement.setString(52, param.get("unusualData") == null ? null : param.get("unusualData").toString());
		    			preparedStatement.setString(53, param.get("goodLocationCd") == null ? null : param.get("goodLocationCd").toString());
		    			preparedStatement.setString(54, param.get("badLocationCd") == null ? null : param.get("badLocationCd").toString());
		    			preparedStatement.setString(55, param.get("mesUintFlag") == null ? null : param.get("mesUintFlag").toString());
		    			preparedStatement.setString(56, param.get("mesLineCd") == null ? null : param.get("mesLineCd").toString());
		    			preparedStatement.setString(57, param.get("outsourcingFlag") == null ? null : param.get("outsourcingFlag").toString());
		    			preparedStatement.setString(58, param.get("useYn") == null ? null : param.get("useYn").toString());   
		    			preparedStatement.setString(59, param.get("description") == null ? null : param.get("description").toString());
		    			if(result.get(i).get("dbType").toString().equals("ORACLE")) {
	    				   preparedStatement.setDate(60, new java.sql.Date(today.getTime()));
	    				} else if(result.get(i).get("dbType").toString().equals("MS-SQL")) {
	    				   preparedStatement.setTimestamp(60, new Timestamp(today.getTime()));
	    				}
		    			preparedStatement.setString(61, param.get("createBy") == null ? null : param.get("createBy").toString());  
		    			if(result.get(i).get("dbType").toString().equals("ORACLE")) {
	    				   preparedStatement.setDate(62, new java.sql.Date(today.getTime()));
	    				} else if(result.get(i).get("dbType").toString().equals("MS-SQL")) {
	    				   preparedStatement.setTimestamp(62, new Timestamp(today.getTime()));
	    				}
		    			preparedStatement.setString(63, param.get("updateBy") == null ? null : param.get("updateBy").toString()); 
		    			preparedStatement.setString(64, param.get("tid") == null ? null : param.get("tid").toString());
		    			if(result.get(i).get("dbType").toString().equals("ORACLE")) {
	    				   preparedStatement.setDate(65, new java.sql.Date(today.getTime()));
	    				} else if(result.get(i).get("dbType").toString().equals("MS-SQL")) {
	    				   preparedStatement.setTimestamp(65, new Timestamp(today.getTime()));
	    				}
		    			preparedStatement.executeUpdate();
		    		}
		    		
		    		connection.commit();
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
		
		return true;
	}
}
