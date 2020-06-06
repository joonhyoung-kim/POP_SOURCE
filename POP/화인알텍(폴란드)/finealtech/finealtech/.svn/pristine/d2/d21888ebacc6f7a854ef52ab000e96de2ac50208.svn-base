package com.thirautech.mom.serviceimpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thirautech.mom.dao.MomDao;
import com.thirautech.mom.service.MomService;
import com.thirautech.mom.util.EzMesInter;
import com.thirautech.mom.util.FrameworkUtil;
import com.thirautech.mom.util.InterfaceUtil;
import com.thirautech.mom.util.PrintUtil;

@Service
public class MomServiceImpl implements MomService {
	@Autowired
	private MomDao momDao;
	
	public Map<String,Object> getMap(String query, Map<String,Object> param) {
		PrintUtil.print("MomService", "getMap", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		return(FrameworkUtil.toCamelCase(momDao.getMap(query, param)));
	}
	
	public List<Map<String,Object>> getMapList(String query, Map<String,Object> param) {
		PrintUtil.print("MomService", "getMapList", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		return(FrameworkUtil.toCamelCase(momDao.getMapList(query, param)));		
	}
	
	public Map<String,Object> createMap(String query, Map<String,Object> param) {
		PrintUtil.print("MomService", "#", "$", "createMap", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		Map<String,Object> result1 = momDao.createMap(query, param);
		
		if(query.equals("com.thirautech.mom.workOrder.workOrderCreate.create_confirmWorkOrderProc") 
				&& result1.get("result").toString().equals("success")
				&& (param.get("companyCd").toString().equals("SCT") || param.get("companyCd").toString().equals("ILHAE") || param.get("companyCd").toString().equals("DBELL"))
				) {
			
			@SuppressWarnings("unchecked")
			List<Map<String,Object>> tmpOrderList = (List<Map<String,Object>>)EzMesInter.workOrderList.get(param.get("companyCd").toString() + param.get("divisionCd").toString());
			if(tmpOrderList != null && tmpOrderList.size() > 0) {
				List<Map<String,Object>> workOrderList = new ArrayList<Map<String,Object>>();
				for(int i = 0; i < tmpOrderList.size(); i++) {
					Map<String, Object> workOrder = getMap("com.thirautech.mom.workOrder.workOrderCreate.get_ezMesConfirmWorkOrder", tmpOrderList.get(i));
					/************** 임시 코드 *******************/
					/*workOrder.put("woid", "WO_Thira_TEST01");
					workOrder.put("prodid", "PID_Thira_TEST01");
					workOrder.put("planqty", 100);
					workOrder.put("unit", "EA");
					workOrder.put("planstdttm", workOrder.get("planstdttm"));
					workOrder.put("planeddttm", workOrder.get("planeddttm"));
					workOrder.put("areaid", "AID_Thira_TEST01");
					workOrder.put("custprodid", "CPID_Thira_TEST01");*/
					/************** 임시 코드 *******************/
					workOrderList.add(workOrder);
				}
			
				EzMesInter.workOrderList.put(param.get("companyCd").toString() + param.get("divisionCd").toString(), null);
				EzMesInter.outWorkOrderList(param.get("companyCd").toString(), param.get("divisionCd").toString(), workOrderList);
			}
		}
		
		// WO 취소 시 IF 전송
		if(query.equals("com.thirautech.mom.workOrder.workOrderResult.workOrderCancel") 
				&& result1.get("result").toString().equals("success")
				&& (param.get("companyCd").toString().equals("SCT") || param.get("companyCd").toString().equals("ILHAE") || param.get("companyCd").toString().equals("DBELL"))
				) {
			
			@SuppressWarnings("unchecked")
			List<Map<String,Object>> tmpOrderList = (List<Map<String,Object>>)EzMesInter.workOrderList.get(param.get("companyCd").toString() + param.get("divisionCd").toString());
			if(tmpOrderList != null && tmpOrderList.size() > 0) {
				List<Map<String,Object>> workOrderList = new ArrayList<Map<String,Object>>();
				for(int i = 0; i < tmpOrderList.size(); i++) {
					Map<String, Object> workOrder = getMap("com.thirautech.mom.workOrder.workOrderCreate.get_ezMesConfirmWorkOrder", tmpOrderList.get(i));
					workOrder.put("planqty",param.get("cancelQty"));
					workOrder.put("delflag","Y");
					
					workOrderList.add(workOrder);
				}
			
				EzMesInter.workOrderList.put(param.get("companyCd").toString() + param.get("divisionCd").toString(), null);
				EzMesInter.outWorkOrderList(param.get("companyCd").toString(), param.get("divisionCd").toString(), workOrderList);
			}
		}
		
		if(query.equals("com.thirautech.mom.reference.itemInfo.item.create_item") || query.equals("com.thirautech.mom.reference.itemInfo.bor.create_bor")
				|| query.equals("com.thirautech.mom.reference.resource.facility.create_facility")) {
			List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
			list.add(param);
			boolean result = InterfaceUtil.writeOut(this, query, list);
			System.out.println("#### InterfaceUtil.writeOut = " + result);
		}
		
		return result1;
	}
	
	public Map<String,Object> createMapList(String query, List<Map<String,Object>> param) {
		PrintUtil.print("MomService", "createMapList", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
	
		Map<String,Object> result1 = momDao.createMapList(query, param);
		
		// WO 취소 시 IF 전송 추가 -- 190604 pgy
		if((query.equals("com.thirautech.mom.workOrder.workOrderCreate.create_confirmWorkOrderTemp")
				|| query.equals("com.thirautech.mom.workOrder.workOrderResult.workOrderCancel") ) 
				&& result1.get("result").toString().equals("success")
				&& param != null 
				&& param.size() > 0
				&& (param.get(0).get("companyCd").toString().equals("SCT") || param.get(0).get("companyCd").toString().equals("ILHAE") || param.get(0).get("companyCd").toString().equals("DBELL"))
				) {
			EzMesInter.workOrderList.put(param.get(0).get("companyCd").toString() + param.get(0).get("divisionCd").toString(), param);
		}
		
		if(query.equals("com.thirautech.mom.reference.itemInfo.item.create_item") || query.equals("com.thirautech.mom.reference.itemInfo.bor.create_bor")
				|| query.equals("com.thirautech.mom.reference.resource.facility.create_facility")) {
			boolean result = InterfaceUtil.writeOut(this, query, param);
			System.out.println("#### InterfaceUtil.writeOut = " + result);
		}
		
		return result1;
	}
	
	public Map<String,Object> upsertMap(String query, Map<String,Object> param) {
		PrintUtil.print("MomService", "upsertMap", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		return momDao.upsertMap(query, param);
	}
	
	public Map<String,Object> upsertMapList(String query, List<Map<String,Object>> param) {
		PrintUtil.print("MomService", "upsertMapList", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		return momDao.createMapList(query, param);
	}

	public Map<String,Object> modifyMap(String query, Map<String,Object> param) {
		PrintUtil.print("MomService", "modifyMap", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, true, false, false);
		
		return momDao.modifyMap(query, param);
	}

	public Map<String,Object> removeMap(String query, Map<String,Object> param) {
		PrintUtil.print("MomService", "removeMap", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		return momDao.removeMap(query, param);
	}
	
	public Map<String,Object> removeMapList(String query, List<Map<String,Object>> param) {
		PrintUtil.print("MomService", "removeMapList", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		return momDao.removeMapList(query, param);
	}
}
