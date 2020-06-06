package com.thirautech.mom.util;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.thirautech.framework.security.manager.AuthManager;
import com.thirautech.mom.service.MomService;

public class FrameworkUtil {
	public static Map<String, Object> procedureMap;
	public static Map<String, Object> directQueryMap;
	public static Map<String, Object> multiLanguage;
	
	// Deprecated
	public static List<Map<String,Object>> toCamelCase(List<Map<String,Object>> oldList) {
		return oldList;
		/*if(oldList == null || oldList.size() < 1 || 1 == 1) {
			return oldList;
		}
		
		List<Map<String,Object>> newList = new ArrayList<Map<String,Object>>();
		for(int i = 0; i < oldList.size(); i++) {
			Map<String, Object> oldMap = oldList.get(i);
			if(oldMap == null || oldMap.size() < 1) {
				newList.add(oldMap);
				continue;
			}		
			
			Map<String, Object> newMap = new HashMap<String, Object>();
			Iterator<String> iteratorKey = oldMap.keySet().iterator(); 
			while (iteratorKey.hasNext()) {
				String oldKey = iteratorKey.next();
				if(oldKey.indexOf("_") < 0) {
					newMap.put(oldKey, oldMap.get(oldKey));
					continue;
				}
				String newKey = "";
				for(int j = 0; j < oldKey.length(); j++) {
					if(oldKey.charAt(j) == '_' && j < oldKey.length()-1) {
						newKey += Character.toUpperCase(oldKey.charAt(j+1));
						j++;
						continue;
					} else if(Character.isUpperCase(oldKey.charAt(j))) {
						newKey += Character.toLowerCase(oldKey.charAt(j));
					} else {
						newKey += oldKey.charAt(j);
					}
				}

				newMap.put(newKey, oldMap.get(oldKey));
			}
			
			oldMap.clear();
			oldMap = null;
			
			newList.add(newMap);
		}
		
		return newList;*/
	}
	
	public static String toCamelCase(String underScore) {
		if (underScore.indexOf('_') < 0
	            && Character.isLowerCase(underScore.charAt(0))) {
	            return underScore;
	        }
	        StringBuilder result = new StringBuilder();
	        boolean nextUpper = false;
	        int len = underScore.length();

	        for (int i = 0; i < len; i++) {
	            char currentChar = underScore.charAt(i);
	            if (currentChar == '_') {
	                nextUpper = true;
	            } else {
	                if (nextUpper) {
	                    result.append(Character.toUpperCase(currentChar));
	                    nextUpper = false;
	                } else {
	                    result.append(Character.toLowerCase(currentChar));
	                }
	            }
	        }
		return result.toString();
	}
	
	public static Map<String,Object> toCamelCase(Map<String,Object> oldMap) {
		return oldMap;
		
		/*if(oldMap == null || oldMap.size() < 1 || 1 == 1) {
			return oldMap;
		}		
		
		Map<String, Object> newMap = new HashMap<String, Object>();
		Iterator<String> iteratorKey = oldMap.keySet().iterator(); 
		while (iteratorKey.hasNext()) {
			String oldKey = iteratorKey.next();
			if(oldKey.indexOf("_") < 0) {
				newMap.put(oldKey, oldMap.get(oldKey));
				continue;
			}
			String newKey = "";
			for(int i = 0; i < oldKey.length(); i++) {
				if(oldKey.charAt(i) == '_' && i < oldKey.length()-1) {
					newKey += Character.toUpperCase(oldKey.charAt(i+1));
					i++;
					continue;
				} else if(Character.isUpperCase(oldKey.charAt(i))) {
					newKey += Character.toLowerCase(oldKey.charAt(i));
				} else {
					newKey += oldKey.charAt(i);
				}
			}

			newMap.put(newKey, oldMap.get(oldKey));
		}	
		
		oldMap.clear();
		oldMap = null;
		
		return newMap;*/
	}
	
	public static String checkMultiLanguage(MomService momService, String companyCd, String divisionCd, String locale) {
		if(FrameworkUtil.multiLanguage == null) {
			FrameworkUtil.multiLanguage = new HashMap<String, Object>();
		}
		
		if(AuthManager.getSessionAttribute("userId") == null) {
			return null;
		}
		
		if(
				/*(
					FrameworkUtil.multiLanguage.get(companyCd + divisionCd + locale + "SERVER") != null &&
					((Map<String, Object>)FrameworkUtil.multiLanguage.get(companyCd + divisionCd + locale + "SERVER")).size() > 0
				)
				||*/ 
				//(
					FrameworkUtil.multiLanguage.get(companyCd + divisionCd + locale + "XML") != null &&
					((Map<String, Object>)FrameworkUtil.multiLanguage.get(companyCd + divisionCd + locale + "XML")).size() > 0
				//)
		) {
			return companyCd + divisionCd + locale;
		}
		
		String query = "com.thirautech.mom.lang.get_language_list";
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("companyCd", companyCd);
		param.put("divisionCd", divisionCd);
		param.put("locale", locale);
		param.put("widget", "SERVER");
		
		Map<String, Object> xmlMap = new HashMap<String, Object>();
		List<Map<String,Object>> list = momService.getMapList(query, param);
		for(int i = 0; i < list.size(); i++) {
			/*if(list.get(i).get("pageId").toString().equals("SERVER")) {
				serverMap.put(list.get(i).get("codeType").toString(), list.get(i).get("keyword").toString());
			} else {*/
				xmlMap.put(list.get(i).get("codeType").toString(), list.get(i).get("keyword").toString());
			//}
		}
		
		//FrameworkUtil.multiLanguage.put(companyCd + divisionCd + locale + "SERVER", serverMap);
		FrameworkUtil.multiLanguage.put(companyCd + divisionCd + locale + "XML", xmlMap);
		
		return companyCd + divisionCd + locale;
	}
	
	// flag means "SERVER" or "XML", key1 means  key of Multi-Lang
	public static String getMultiMessage(String flag, String key1) {
		String companyCd = AuthManager.getSessionAttribute("companyCd").toString();
		String divisionCd = AuthManager.getSessionAttribute("divisionCd").toString();
		String locale = AuthManager.getSessionAttribute("locale").toString();
		
		if(FrameworkUtil.multiLanguage == null || FrameworkUtil.multiLanguage.get(companyCd + divisionCd + locale + flag) == null) {
			return null;
		}
		
		@SuppressWarnings("unchecked")
		Map<String, Object> map = (Map<String, Object>)FrameworkUtil.multiLanguage.get(companyCd + divisionCd + locale + flag);
		
		return map.get(key1) == null ? null : map.get(key1).toString();
	}
	
	public static String removeDummy(String query, String crud) {
		if(query == null || query.equals("")) {
			return "";
		}
		
		int pos = query.indexOf(".dummy");
		if(pos >= 0) {
			query = query.substring(0, pos);
		}
		
		pos = query.lastIndexOf(".") + 1;
		
		if(crud.equals("R")) {
			query = query.substring(0, pos) + "get_" + query.substring(pos) + "_list";
		} else if(crud.equals("C")) {
			query = query.substring(0, pos) + "create_" + query.substring(pos);
		} else if(crud.equals("U")) {
			query = query.substring(0, pos) + "modify_" + query.substring(pos);
		} else if(crud.equals("D")) {
			query = query.substring(0, pos) + "remove_" + query.substring(pos);
		} else {
			query = query.substring(0, pos) + "get_" + query.substring(pos);
		}
		
		return query;
	}
	
	// Deprecated.., 이제 사용 안함
	/*public static Map<String, Object> createParam(Map<String, Object> oldParam) {
		Map<String, Object> newParam = new HashMap<String, Object>();
		Iterator<String> iteratorKey = oldParam.keySet().iterator(); 
		String strD = "";
		while (iteratorKey.hasNext()) {
			String key = iteratorKey.next();
			
			try {
				if(oldParam.get(key) == null) {
					newParam.put(key, null);
				} else {
					// 특수문자(+)를 ASCII 코드로 변환
					strD = oldParam.get(key).toString().replaceAll("\\+", "%2B");
					newParam.put(key, URLDecoder.decode(strD, StandardCharsets.UTF_8.name()));
				}
			} 
			catch (IllegalArgumentException e) {
				// 특수문자 %로 에러 발생 시 [%, +]를 ASCII 코드로 변환
				strD = oldParam.get(key).toString().replaceAll("\\%", "%25").replaceAll("\\+", "%2B");
				try {
					newParam.put(key, URLDecoder.decode(strD, StandardCharsets.UTF_8.name()));
				} catch (Exception ex) {
					ex.printStackTrace();
				}
			}
			catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				PrintUtil.print("FrameworkUtil", "createParam", "#", "$", "URLDecoder.decode 오류", oldParam.get(key).toString() + "을 디코딩 하려다 오류 발생", true, true, true, true);
				e.printStackTrace();
				
				oldParam.clear();
				oldParam = null;
				
				return new HashMap<String, Object>();
			} 
		}
		
		oldParam.clear();
		oldParam = null;
		
		if(AuthManager.getSessionAttribute("userId") != null) {
			String userId = AuthManager.getSessionAttribute("userId").toString();
			String companyCd = AuthManager.getSessionAttribute("companyCd").toString();
			String divisionCd = AuthManager.getSessionAttribute("divisionCd").toString();
			String locale = AuthManager.getSessionAttribute("locale").toString();
			
			@SuppressWarnings("unchecked")
			Map<String, Object> map = (Map<String, Object>)FrameworkUtil.multiLanguage.get(companyCd + divisionCd + locale + "XML");
			
			newParam.put("userId"    , userId);
			newParam.put("createBy"  , userId);
			newParam.put("updateBy"  , userId);
			newParam.put("companyCd" , companyCd);
			newParam.put("divisionCd", divisionCd);
			if(newParam.get("locale") == null) {
				newParam.put("locale", locale);
			}
			
			if(map != null) {
				iteratorKey = map.keySet().iterator(); 
				while (iteratorKey.hasNext()) {
					String key1 = iteratorKey.next();
					String value1 = map.get(key1).toString();
					newParam.put(key1, value1);
				}
			}
		}
		
		newParam.put("p_err_code", "");
		newParam.put("p_err_msg" , "");
		
		return newParam;
	}*/
	
	public static Map<String, Object> createParam(Map<String, Object> param, String crud, Map<String, Object> map, String userId, String divisionCd, String companyCd, String locale) {
		/*
		 * 2020.04.04 hyjeong begin
		 * oldParam -> newParam 복사를 param 레퍼런스로 교체
		 */
		Iterator<String> iteratorKey = param.keySet().iterator(); 
		
		while (iteratorKey.hasNext()) {
			String key = iteratorKey.next();
			String strD;
			try {
				if(param.get(key) != null) {
					// 특수문자(+)를 ASCII 코드로 변환
					strD = param.get(key).toString().replaceAll("\\+", "%2B");
					param.put(key, URLDecoder.decode(strD, StandardCharsets.UTF_8.name()));
				}
			} catch (IllegalArgumentException e) {
				// 특수문자 %로 에러 발생 시 [%, +]를 ASCII 코드로 변환
				strD = param.get(key).toString().replaceAll("\\%", "%25").replaceAll("\\+", "%2B");
				try {
					param.put(key, URLDecoder.decode(strD, StandardCharsets.UTF_8.name()));
				} catch (Exception ex) {
					ex.printStackTrace();
				}
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				PrintUtil.print("FrameworkUtil", "createParam", "#", "$", "URLDecoder.decode 오류", param.get(key).toString() + "을 디코딩 하려다 오류 발생", true, true, true, true);
				e.printStackTrace();
				
				return new HashMap<String, Object>();
			}
		}
		
		if(param.get("userId") == null) {
			if(userId != null) {
				param.put("userId"  , userId);
				param.put("createBy", userId);
				param.put("updateBy", userId);
			} else {
				userId = AuthManager.getSessionAttribute("userId") == null ? null : AuthManager.getSessionAttribute("userId").toString();
				if(userId != null) {
					param.put("userId"  , userId);
					param.put("createBy", userId);
					param.put("updateBy", userId);
				}
			}
		}
		if(param.get("divisionCd") == null) {
			if(divisionCd != null) {
				param.put("divisionCd", divisionCd);
			} else {
				divisionCd = AuthManager.getSessionAttribute("divisionCd") == null ? null : AuthManager.getSessionAttribute("divisionCd").toString();
				if(divisionCd != null) {
					param.put("divisionCd", divisionCd);
				}
			}
		}
		if(param.get("companyCd") == null) {
			if(companyCd != null) {
				param.put("companyCd", companyCd);
			} else {
				companyCd = AuthManager.getSessionAttribute("companyCd") == null ? null : AuthManager.getSessionAttribute("companyCd").toString();
				if(companyCd != null) {
					param.put("companyCd", companyCd);
				}
			}
		}
		if(param.get("locale") == null) {
			if(locale != null) {
				param.put("locale", locale);
			} else {
				locale = AuthManager.getSessionAttribute("locale") == null ? null : AuthManager.getSessionAttribute("locale").toString();
				if(locale != null) {
					param.put("locale", locale);
				}
			}
		}		
		
		if(divisionCd != null && companyCd != null && locale != null && !crud.equals("C") && !crud.equals("L")) {
			if(map == null) {
				map = (Map<String, Object>)FrameworkUtil.multiLanguage.get(companyCd + divisionCd + locale + "XML");
			}
			
			iteratorKey = map.keySet().iterator(); 
			while (iteratorKey.hasNext()) {
				String key1 = iteratorKey.next();
				String value1 = map.get(key1).toString();
				param.put(key1, value1);
			}
		}
		
		param.put("p_err_code", "");
		param.put("p_err_msg" , "");
		
		return param;
	}
	
	public static List<Map<String, Object>> createParam(List<Map<String, Object>> list, String crud) {
		String userId = AuthManager.getSessionAttribute("userId").toString();
		String companyCd = AuthManager.getSessionAttribute("companyCd").toString();
		String divisionCd = AuthManager.getSessionAttribute("divisionCd").toString();
		String locale = AuthManager.getSessionAttribute("locale") == null ? null : AuthManager.getSessionAttribute("locale").toString();
		
		Map<String, Object> multiMap = null;
		if(!crud.equals("C") && !crud.equals("L")) {
			multiMap = (Map<String, Object>)FrameworkUtil.multiLanguage.get(companyCd + divisionCd + locale + "XML");	
		}
		
		for(int i = 0; i < list.size(); i++) {
			Map<String, Object> map = list.get(i);
			if(map == null || map.isEmpty()) {
				if(i == 0) {
					return new ArrayList<Map<String, Object>>();
				}
				
				break;
			}
			
			FrameworkUtil.createParam(map, crud, multiMap, userId, divisionCd, companyCd, locale);
		}
		
		return list;
	}
	
	public static Map<String, Object> json2Map(String json) {
		/*java.nio.charset.Charset UTF8_CHARSET = java.nio.charset.Charset.forName("UTF-8");*/
		if(json == null || json.toString().length() < 1) {
			return null;
		}
		
		try {
			json = URLDecoder.decode(json, StandardCharsets.UTF_8.name());
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		String line = json.replace("{","").replace("}","").replace("[","").replace("]","").replace("\"","");
		String[] tokens = line.split(",");
		Map<String, Object> map = new HashMap<String, Object>();
		for(int j = 0; j < tokens.length; j++) {
			tokens[j] = tokens[j].replaceAll("#22#", "\"").replaceAll("#44#", ",");
			if(tokens[j].indexOf(":") == tokens[j].length() - 1) {
				if(tokens[j].indexOf(":") < 0) {
					break;
				} else {
					map.put(tokens[j].substring(0,tokens[j].indexOf(":")).trim(),null);
				}
			} else if(tokens[j].indexOf(":") < 0) {
				int k = j - 1;
				for(; k >= 0; k--) {
					if(map.get(tokens[k].substring(0,tokens[k].indexOf(":")).trim()) != null) {
						break;
					}
				}
				
				map.put(tokens[k].substring(0,tokens[k].indexOf(":")).trim(), map.get(tokens[k].substring(0,tokens[k].indexOf(":")).trim()) + "," + tokens[j]);
			} else {
				String value = tokens[j].substring(tokens[j].indexOf(":")+1).trim();
				if(value.equals("true")) {
					map.put(tokens[j].substring(0,tokens[j].indexOf(":")).trim(), true);
				} else if(value.equals("false")) {
					map.put(tokens[j].substring(0,tokens[j].indexOf(":")).trim(), false);
				} else {
					map.put(tokens[j].substring(0,tokens[j].indexOf(":")).trim(), value);
				}
			}
		}
		
		return map;
	}
	
	public static List<Map<String, Object>> json2List(String json) {
		if(json == null || json.toString().length() < 1) {
			return null;
		}
		
		String[] tokens = json.split("},");
		
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		for(int i = 0; i < tokens.length; i++) {
			Map<String, Object> map = FrameworkUtil.json2Map(tokens[i]);
			if(map == null) {
				return list;
			}
			
			list.add(map);
		}
		
		return list;
	}
	
	public static List<Map<String, Object>> map2List(Map<String, Object> map) {
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		list.add(map);
		
		return list;
	}
	
	public static boolean isProcedure(String query) {
		if(FrameworkUtil.procedureMap == null) {
			FrameworkUtil.procedureMap = new HashMap<String, Object>();
		}
		
		if(FrameworkUtil.procedureMap.size() == 0) {
			FrameworkUtil.procedureMap.put("com.thirautech.mom.plan.demand.demandPlan.create_productPlanCreate", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.plan.order.salesOrder.create_salesOrder", "Y");			
			FrameworkUtil.procedureMap.put("com.thirautech.mom.plan.order.salesOrder.create_salesMstCreate", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.plan.order.salesOrder.create_demandPlanCreate", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.plan.plan.planningUpload.create_planningUploadProc", "Y");			
			FrameworkUtil.procedureMap.put("com.thirautech.mom.plan.plan.salesOrderUploadPO.create_salesOrderUploadPOProc", "Y");			
			FrameworkUtil.procedureMap.put("com.thirautech.mom.purchase.stock.materialMove.create_materialMoveProc", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.purchase.stock.othersInOutFinished.create_othersInOutFinishedProc", "Y");			
			FrameworkUtil.procedureMap.put("com.thirautech.mom.purchase.supplier.materialDelivery.create_materialDelivery", "Y");			
			FrameworkUtil.procedureMap.put("com.thirautech.mom.reference.price.costPrice.create_costPrice", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.reference.price.globalPrice.create_globalPrice", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.reference.price.materialPrice.create_materialPrice", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.reference.workinghours.shift.create_shift", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.shipping.productShipping.create_productShipping", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.shipping.productShipping.create_productShippingB2BI", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.shipping.productShippingClose.create_productShippingClose", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.shipping.productShippingCloseStatus.create_productShippingCloseCancel", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.shipping.productShippingStatus.create_productShippingCancel", "Y");		
			FrameworkUtil.procedureMap.put("com.thirautech.mom.purchase.supplier.deliveryPresentCondition.create_cancelMaterialDelivery", "Y");	
			FrameworkUtil.procedureMap.put("com.thirautech.mom.purchase.materialLedger.materialRelease.create_materialRelease", "Y");	
			FrameworkUtil.procedureMap.put("com.thirautech.mom.purchase.purchasing.irregularOrderCancel.create_cancelMaterialOrderProc", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.purchase.materialLedger.materialInput.create_materialInputCreate", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.quality.qualityInput.create_upsertIqc", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.purchase.materialLedger.materialInputStatus.create_cancelMaterialInput", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.workOrder.workOrderResult.create_workOrderResultCreate", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.workOrder.workOrderResult.create_workOrderResultCancel", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.workOrder.workOrderResult.create_workOrderCancel", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.quality.processQualityCoorperation.create_upsertPqc", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.shipping.customerOrderStockStatus.create_customerOrderStockMove", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.purchase.material.materialRequest.create_materialRequestSave", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.plan.plan.salesOrderUpload.create_salesOrderUploadProc", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.plan.plan.salesOrderUpload.create_salesOrderUploadCreateProc", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.common.create_itemStockInException", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.shipping.exceptionShipping.create_exceptionShipping", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.shipping.exceptionShippingCancel.create_itemStockOutExceptionCancel", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.close.monthlyClosing.create_monthlyVendorClose", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.close.monthlyClosing.create_itemInoutPriceUpdate", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.close.monthlyClosingCancel.create_monthlyVendorCloseCancel", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.close.monthlySalesBuyClosing.create_monthlySalesBuyClosing", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.close.monthlyMaterialPriceConfirm.create_monthlyMaterialPriceConfirm", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.close.monthlyMaterialPriceConfirm.create_monthlyMaterialPriceConfirmCancel", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.shipping.itemReplacementStatus.create_itemReplacementCancel", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.workOrder.workOrderCreate.create_decompositionItem", "Y");
			FrameworkUtil.procedureMap.put("com.thirautech.mom.plan.order.salesOrder.create_orderClose", "Y");
			//FrameworkUtil.procedureMap.put("", "Y");
		}
		
		if(FrameworkUtil.procedureMap.get(query) != null && FrameworkUtil.procedureMap.get(query).toString().equals("Y")) {
			return true;
		}
		
		return false;
	}
	
	public static String isDirectQuery(String query) {
		// 2019.01.20 hyjeong begin
		return null;
		/*if(FrameworkUtil.directQueryMap == null) {
			FrameworkUtil.directQueryMap = new HashMap<String, Object>();
		}
		
		if(FrameworkUtil.directQueryMap.size() == 0) {
			FrameworkUtil.directQueryMap.put("com.thirautech.mom.reference.itemInfo.item.get_item_list", "getItemItemList");
			FrameworkUtil.directQueryMap.put("com.thirautech.mom.plan.demand.demandPlan.get_demandPlan_list", "getDemandPlanItemList");
		}
		
		return FrameworkUtil.directQueryMap.get(query) == null ? null : FrameworkUtil.directQueryMap.get(query).toString();*/
		// 2019.01.20 hyjeong end
	}

	public static Map<String, Object> createResponseMapEmpty() {
		Map<String, Object> map = new HashMap<String, Object>();
		return map;
	}
	
	public static Map<String, Object> createResponseMap(Map<String, Object> map, boolean result) {
		if(map == null) {
			map = new HashMap<String, Object>();
		}
		
		if(result) {
			map.put("result", "success");
		} else {
			map.put("result", "fail");
		}
		
		return map;
	}
	
	public static Map<String, Object> createResponseMap(Map<String, Object> map, boolean result, String p_err_msg) {
		if(map == null) {
			map = new HashMap<String, Object>();
		}
		
		if(result) {
			map.put("result", "success");
			map.put("p_err_code", "S");
		} else {
			map.put("result", "fail");
			map.put("p_err_code", "E");
		}
		
		map.put("p_err_msg", p_err_msg);
		
		return map;
	}
	
	public static List<Map<String, Object>> createResponseListEmpty() {
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		
		return list;
	}
	
	public static List<Map<String, Object>> createResponseList(List<Map<String, Object>> list, boolean result) {
		if(list == null) {
			list = new ArrayList<Map<String, Object>>();
		}
		
		if(list.size() == 0) {
			Map<String, Object> map = new HashMap<String, Object>();
			if(result) {
				map.put("result", "success");
			} else {
				map.put("result", "fail");
			}
			list.add(map);
		} else {
			for(int i = 0; i < list.size(); i++) {
				if(result) {
					list.get(i).put("result", "success");
				} else {
					list.get(i).put("result", "fail");
				}
			}
		}
		
		return list;
	}
	
	public static Map<String, Object> jsonDataMap(String json) {
        Map<String, Object> map = new HashMap<String, Object>();
        ObjectMapper mapper = new ObjectMapper();
        try {
        	if (null != json && !"".equals(json)) {
                map = mapper.readValue(json, new TypeReference<HashMap<String, Object>>() {
                });
            }
        } catch(Exception e) {
        	e.printStackTrace();
        }
        
        return map;
    }

	public static List<Map<String, Object>> getMapList(List<Map<String, Object>> list, String query) {
		if(list == null) {
			return FrameworkUtil.createResponseListEmpty();
		}
		
		if(list.isEmpty() || !query.equals("com.thirautech.mom.plan.plan.planningUpload.get_planningUpload_list")) {
			return list;
		}
		
		for(int i = 0; i < list.size(); i++) {
			if(list.get(i).get("attr1") == null || list.get(i).get("attr1").toString().length() < 2) {
			    continue;
			}
			String pivot = list.get(i).get("attr1").toString();
			String[] tokens = pivot.split(",");
			if(tokens != null && tokens.length > 0) {
				for(int j = 0; j < tokens.length; j++) {
					String key = tokens[j].substring(0, tokens[j].indexOf(":"));
					String value = tokens[j].substring(tokens[j].indexOf(":") + 1);
					list.get(i).put(key, value);
				}
			}
		}
		
		return list;
	}
	
	public static String passwordEncription(String password) {
		try {
			MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
			
			byte[] hash = messageDigest.digest(password.getBytes(StandardCharsets.UTF_8.name()));
            StringBuffer encryptPassword = new StringBuffer();
 
            for (int i = 0; i < hash.length; i++) {
                String hex = Integer.toHexString(0xff & hash[i]);
                if(hex.length() == 1) encryptPassword.append('0');
                encryptPassword.append(hex);
            }
            
            return encryptPassword.toString();

		} catch(Exception e) {
		}
		
		return password;
	}	
	
}
