package com.thirautech.mom.serviceimpl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
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
import com.thirautech.mom.util.SMTPUtil;

@Service
public class MomServiceImpl implements MomService {
	@Autowired
	private MomDao momDao;
	
	public Map<String,Object> getMap(String query, Map<String,Object> param) {
		PrintUtil.print("MomService", "getMap", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		Map<String,Object> result = momDao.getMap(query, param);
		/*if(!result.get("result").toString().equals("fail")) {
			SMTPUtil.sendMail(momDao, query, param);
		}*/
		
		return result;
	}
	
	public List<Map<String,Object>> getMapList(String query, Map<String,Object> param) {
		PrintUtil.print("MomService", "getMapList", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		List<Map<String,Object>> result = momDao.getMapList(query, param);
		/*if(result.size() > 0) {
			SMTPUtil.sendMail(momDao, query, param);
		}*/
		
		return FrameworkUtil.getMapList(result, query);
	}
	
	public Map<String,Object> createMap(String query, Map<String,Object> param) {
		PrintUtil.print("MomService", "#", "$", "createMap", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		Map<String,Object> result = momDao.createMap(query, param);
		
		if(
				   query.equals("com.thirautech.mom.workOrder.workOrderCreate.create_confirmWorkOrderProc") 
				&& result.get("result").toString().equals("success")
//				&& (param.get("companyCd").toString().equals("SCT") || param.get("companyCd").toString().equals("ILHAE") || param.get("companyCd").toString().equals("DBELL"))
		) {
			/* start 20191122 / 작업지시 확정 시 ezMes I/F 전송 방법 변경
			@SuppressWarnings("unchecked")
			List<Map<String,Object>> tmpOrderList = (List<Map<String,Object>>)EzMesInter.workOrderList.get(param.get("companyCd").toString() + param.get("divisionCd").toString());
			if(tmpOrderList != null && tmpOrderList.size() > 0) {
				List<Map<String,Object>> workOrderList = new ArrayList<Map<String,Object>>();
				for(int i = 0; i < tmpOrderList.size(); i++) {
					Map<String, Object> workOrder = getMap("com.thirautech.mom.workOrder.workOrderCreate.get_ezMesConfirmWorkOrder", tmpOrderList.get(i));
					workOrder.put("divisionCd", param.get("divisionCd").toString());
					workOrderList.add(workOrder);
				}
			
				EzMesInter.workOrderList.put(param.get("companyCd").toString() + param.get("divisionCd").toString(), null);
				EzMesInter.outWorkOrderList(param.get("companyCd").toString(), param.get("divisionCd").toString(), workOrderList);
			}
			end 20191122 / 작업지시 확정 시 ezMes I/F 전송 방법 변경 */
			
			// 작업지시 확정 시 ezMes I/F 전송
			String tableId = "If_Erp_R_WorkOrder";
			param.put("queryId", query.substring(19));
			param.put("tableId", tableId);
			
			List<Map<String, Object>> ifDBInfo = momDao.getMapList("com.thirautech.mom.common.get_ifDbInfo_list", param);
			if(ifDBInfo.size() > 0) {
				List<Map<String, Object>> workOrderList = momDao.getMapList("com.thirautech.mom.workOrder.workOrderCreate.get_ezMesConfirmWorkOrderList_list", param);
				if(workOrderList.size() > 0) {
					boolean result1 = InterfaceUtil.writeOut(this, query, workOrderList, tableId );
				}
			}
		}
		
		// 작업지시 취소 시 인터페이스 전송
		if(query.equals("com.thirautech.mom.workOrder.workOrderResult.create_workOrderCancel") && result.get("result").toString().equals("success")) {
			param.put("queryId", query.substring(19));
//			param.put("tableId", "If_Erp_R_MaterialShippedSlip");
			List<Map<String, Object>> ifDBInfo = momDao.getMapList("com.thirautech.mom.common.get_ifDbInfo_list", param);
			
			if(ifDBInfo.size() > 0) {
				for(int z=0; z<ifDBInfo.size(); z++) {
					if(ifDBInfo.get(z).get("tableId").toString().equals("If_Erp_R_MaterialShippedSlip") ) {
						// 자재불출요청 변경 정보 전송
						List<Map<String, Object>> workOrderRequest = momDao.getMapList("com.thirautech.mom.common.get_ifWoRequest_list", param);
						List<Map<String,Object>> paramList = new ArrayList<Map<String,Object>>();
						
						for(int i=0; i<workOrderRequest.size(); i++) {
							Map<String, Object> paramMap = new HashMap<String, Object>();
							
							paramMap.put("divisionCd", workOrderRequest.get(i).get("divisionCd"));
							paramMap.put("companyCd", param.get("companyCd"));
							paramMap.put("materialRequestId", workOrderRequest.get(i).get("materialRequestId"));
							paramMap.put("barcodeId", workOrderRequest.get(i).get("workOrderId"));
							paramMap.put("requestDate", workOrderRequest.get(i).get("requestDate"));
							paramMap.put("workOrderId", workOrderRequest.get(i).get("workOrderId"));
							paramMap.put("itemId", workOrderRequest.get(i).get("itemId"));
							paramMap.put("specification", workOrderRequest.get(i).get("specification"));
							paramMap.put("qty", workOrderRequest.get(i).get("qty"));
							paramMap.put("fromLocationCd", workOrderRequest.get(i).get("fromLocationCd"));
							paramMap.put("toLocationCd", workOrderRequest.get(i).get("toLocationCd"));
							paramMap.put("woQty", workOrderRequest.get(i).get("woQty"));
							paramMap.put("parentItemId", workOrderRequest.get(i).get("parentItemId"));
							paramMap.put("transferDate", workOrderRequest.get(i).get("transferDate"));
							paramMap.put("jobCode", "D");
							paramMap.put("attribute1", null);
							paramMap.put("attribute2", null);
							paramMap.put("attribute3", null);
							paramMap.put("attribute4", null);
							paramMap.put("attribute5", null);
							paramMap.put("attribute6", null);
							paramMap.put("attribute7", null);
							paramMap.put("attribute8", null);
							paramMap.put("attribute9", null);
							paramMap.put("attribute10", null);
							paramMap.put("queryId", query.substring(19));
							
							paramList.add(i, paramMap);
						}
						
						boolean result3 = InterfaceUtil.writeOut(this, query, paramList, "");
//						System.out.println("#### InterfaceUtil.writeOut(result3) = " + result3);
						if(result3) {
							momDao.removeMap("com.thirautech.mom.common.remove_ifWoRequest", param);
						}
						
					} 
					
					if(ifDBInfo.get(z).get("tableId").toString().equals("If_Erp_R_WorkOrder")) {
						// 작업지시 취소 정보 전송
						List<Map<String,Object>> workOrderList = new ArrayList<Map<String,Object>>();
						Map<String, Object> workOrder = getMap("com.thirautech.mom.workOrder.workOrderCreate.get_ezMesConfirmWorkOrder", param);
						workOrder.put("planqty", param.get("cancelQty"));
						workOrder.put("delflag", "Y");
						workOrderList.add(workOrder);
						
						EzMesInter.workOrderList.put(param.get("companyCd").toString() + param.get("divisionCd").toString(), null);
						EzMesInter.outWorkOrderList(param.get("companyCd").toString(), param.get("divisionCd").toString(), workOrderList);
					}
				}
			}
		}
		
		//단일 insert
		if(
				   query.equals("com.thirautech.mom.reference.itemInfo.item.create_item") 
				|| query.equals("com.thirautech.mom.reference.itemInfo.bor.create_bor")
				|| query.equals("com.thirautech.mom.reference.resource.facility.create_facility")
		) { // 단순 insert 
			List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
			param.put("crudFlag", "C");
			list.add(param);
			boolean result1 = InterfaceUtil.writeOut(this, query, list, "");
//			System.out.println("#### InterfaceUtil.writeOut = " + result1);
		} else if(
				   query.equals("com.thirautech.mom.reference.workinghours.resourceByShiftPlanSchedule.create_resourceByShiftPlanSchedule") 
				|| query.equals("com.thirautech.mom.reference.workinghours.resourceByShiftPlanSchedule.create_resourceByShiftPlanScheduleModify") 
				|| query.equals("com.thirautech.mom.reference.workinghours.resourceByShiftPlanSchedule.create_copyResourceByShiftPlanSchedule") 
				|| query.equals("com.thirautech.mom.reference.workinghours.resourceByShiftPlanSchedule.create_copyResourceGroupByShiftPlanSchedule") 
				|| query.equals("com.thirautech.mom.reference.workinghours.resourceByShiftPlanSchedule.create_copyFromResourceByShiftPlanSchedule")
		) { //설비별 shift 스케쥴 관리 insert 
			List<Map<String, Object>> offHours = momDao.getMapList("com.thirautech.mom.reference.workinghours.shiftCode.get_shiftCodeDetailTime_list", param);
			for(int i = 0; i < offHours.size(); i++) {
				List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
				param.put("crudFlag", "C");
				list.add(param);
				boolean result1 = InterfaceUtil.writeOut(this, query, list, "");
//				System.out.println("#### InterfaceUtil.writeOut = " + result1);
			}
		}
		
		// 작업지시확정 시 인터페이스 정보 전송(삼원동관)
		if(query.equals("com.thirautech.mom.workOrder.workOrderCreate.create_confirmWorkOrderProc") && result.get("result").toString().equals("success")) {
			String tableId = "If_Erp_R_MaterialShippedSlip";
			param.put("queryId", query.substring(19));
			param.put("tableId", tableId);
			List<Map<String, Object>> ifDBInfo = momDao.getMapList("com.thirautech.mom.common.get_ifDbInfo_list", param);
			
			if(ifDBInfo.size() > 0) {
				List<Map<String, Object>> paramList = new ArrayList<Map<String, Object>>();
				List<Map<String, Object>> materialRequest = momDao.getMapList("com.thirautech.mom.common.get_ifPoRequest_list", param);
					
				for(int i = 0; i < materialRequest.size(); i++) {
					Map<String, Object> paramMap = new HashMap<String, Object>();
					
					paramMap.put("divisionCd", materialRequest.get(i).get("divisionCd"));
					paramMap.put("companyCd", materialRequest.get(i).get("companyCd"));
					paramMap.put("materialRequestId", materialRequest.get(i).get("materialRequestId"));
					paramMap.put("barcodeId", materialRequest.get(i).get("workOrderId"));
					paramMap.put("requestDate", materialRequest.get(i).get("requestDate"));
					paramMap.put("workOrderId", materialRequest.get(i).get("workOrderId"));
					paramMap.put("itemId", materialRequest.get(i).get("itemId"));
					paramMap.put("specification", materialRequest.get(i).get("specification"));
					paramMap.put("qty", materialRequest.get(i).get("qty"));
					paramMap.put("fromLocationCd", materialRequest.get(i).get("fromLocationCd"));
					paramMap.put("toLocationCd", materialRequest.get(i).get("toLocationCd"));
					paramMap.put("woQty", materialRequest.get(i).get("woQty"));
					paramMap.put("parentItemId", materialRequest.get(i).get("parentItemId"));
					paramMap.put("transferDate", materialRequest.get(i).get("transferDate"));
					paramMap.put("jobCode", "C");
					paramMap.put("attribute1", null);
					paramMap.put("attribute2", null);
					paramMap.put("attribute3", null);
					paramMap.put("attribute4", null);
					paramMap.put("attribute5", null);
					paramMap.put("attribute6", null);
					paramMap.put("attribute7", null);
					paramMap.put("attribute8", null);
					paramMap.put("attribute9", null);
					paramMap.put("attribute10", null);
					paramMap.put("queryId", query.substring(19));
					
					paramList.add(i, paramMap);
				}
				
				boolean result1 = InterfaceUtil.writeOut(this, query, paramList, tableId);
//				System.out.println("#### InterfaceUtil.writeOut(result1) = " + result1);
			}
		}
		
		if(!result.get("result").toString().equals("fail")) {
			SMTPUtil.sendMail(this, query, param);
		}
				
		return result;
	}
	
	//다중 insert
	public Map<String,Object> createMapList(String query, List<Map<String,Object>> param) {
		PrintUtil.print("MomService", "createMapList", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		/*if(query.equals("com.thirautech.mom.encryption.create_encryption") || query.equals("com.thirautech.mom.encryption.create_decryption")) {
			String paths = param.get(0).get("paths").toString();
			
			List<Map<String, Object>> list = null;
			if(query.equals("com.thirautech.mom.encryption.create_encryption")) {
				list = EncryptionUtil.enDecodingDir(paths, true, true);
			} else {
				list = EncryptionUtil.enDecodingDir(paths, false, true);
				query = "com.thirautech.mom.encryption.create_encryption";
			}

			return momDao.createMapList(query, list);
		}*/
	
		Map<String,Object> result = momDao.createMapList(query, param);
		
		// WO 취소 시 IF 전송 추가 -- 190604 pgy
		if(
				(
					   query.equals("com.thirautech.mom.workOrder.workOrderCreate.create_confirmWorkOrderTemp") 
					|| query.equals("com.thirautech.mom.workOrder.workOrderResult.workOrderCancel")
				) 
				&& result.get("result").toString().equals("success")
				&& param != null 
				&& param.size() > 0
				&& 
				(
					   param.get(0).get("companyCd").toString().equals("SCT") 
					|| param.get(0).get("companyCd").toString().equals("ILHAE") 
					|| param.get(0).get("companyCd").toString().equals("DBELL")
				)
		) {
			EzMesInter.workOrderList.put(param.get(0).get("companyCd").toString() + param.get(0).get("divisionCd").toString(), param);
		}
		
		if(
				   query.equals("com.thirautech.mom.reference.itemInfo.item.create_item") 
				|| query.equals("com.thirautech.mom.reference.itemInfo.bor.create_bor")
				|| query.equals("com.thirautech.mom.reference.resource.facility.create_facility")
				
		) { // 단순 insert 
			for(int i = 0; i < param.size(); i++) {
				param.get(i).put("crudFlag", "C");
			}
			
			boolean result1 = InterfaceUtil.writeOut(this, query, param, "");
//			System.out.println("#### InterfaceUtil.writeOut = " + result1);
		} else if(
				   query.equals("com.thirautech.mom.reference.workinghours.resourceByShiftPlanSchedule.create_resourceByShiftPlanSchedule") 
				|| query.equals("com.thirautech.mom.reference.workinghours.resourceByShiftPlanSchedule.create_resourceByShiftPlanScheduleModify")
				|| query.equals("com.thirautech.mom.reference.workinghours.resourceByShiftPlanSchedule.create_copyResourceByShiftPlanSchedule") 
				|| query.equals("com.thirautech.mom.reference.workinghours.resourceByShiftPlanSchedule.create_copyResourceGroupByShiftPlanSchedule") 
				|| query.equals("com.thirautech.mom.reference.workinghours.resourceByShiftPlanSchedule.create_copyFromResourceByShiftPlanSchedule")
		) { //설비별 shift 스케쥴 관리 insert
			for(int i = 0; i < param.size(); i++) { // 화면에서 넘겨준 파라미터 리스트 
				List<Map<String, Object>> newParam = new ArrayList<Map<String, Object>>();
				
				param.get(i).put("crudFlag", "C");
				param.get(i).put("divisionCd", param.get(0).get("divisionCd"));
				param.get(i).put("companyCd", param.get(0).get("companyCd"));
				if(param.get(i).get("eventType") != null) { // 설비복사, 설비군 복사, 휴일 설비/설비군 적용 과 같은 다중 적용 이벤트인 경우('multi')
					param.get(i).put("resourceCd", param.get(i).get("toResource"));
				}
				
				if(param.get(i).get("applyDate") == null) { // 그리드에서 선택한 경우가 아닐 경우. ex) 팝업 등록, 팝업 복사 등 startDate/endDate 가 있는 경우
					param.get(i).put("fromDate", param.get(i).get("startDate"));
					param.get(i).put("toDate", param.get(i).get("endDate"));
					param.get(i).put("workPersonCnt", param.get(i).get("workPerson"));
				} else {
					param.get(i).put("fromDate", param.get(i).get("applyDate"));
					param.get(i).put("toDate", param.get(i).get("applyDate"));
				}
				
				List<Map<String, Object>> code = momDao.getMapList("com.thirautech.mom.reference.workinghours.resourceByShiftPlanSchedule.get_resourceByShiftPlanSchedule_list", param.get(i));
				for(int j = 0; j < code.size(); j++) { // 화면에서 넘겨준 파라미터로 select한(=처리한) 데이터리스트
					newParam = new ArrayList<Map<String, Object>>();
					code.get(j).put("divisionCd", param.get(0).get("divisionCd"));
					code.get(j).put("companyCd", param.get(0).get("companyCd"));
					
					List<Map<String, Object>> offHours = momDao.getMapList("com.thirautech.mom.reference.workinghours.shiftCode.get_shiftCodeDetailTime_list", code.get(j)); //shiftCd에 해당하는 detail 작업시간 리스트
					param.get(i).put("shiftType", code.get(j).get("shiftType"));
					param.get(i).put("workTime", code.get(j).get("workTime"));
					param.get(i).put("offTime", code.get(j).get("offTime"));
					param.get(i).put("actTime", code.get(j).get("realWorkTime"));
					param.get(i).put("workPersonCnt", code.get(j).get("workPersonCnt"));
					if(param.get(0).get("eventType") != null) {
						param.get(i).put("shiftCd", code.get(j).get("shiftCd"));
						param.get(i).put("startTime", code.get(j).get("startTime"));
						param.get(i).put("endTime", code.get(j).get("endTime"));
						param.get(i).put("applyDate", code.get(j).get("applyDate"));
					}
					
					if(offHours.size() == 0) { // detail 작업시간이 없을 경우 기존startTime, endTime 
						param.get(i).put("actStartTime", code.get(j).get("startTime"));
						param.get(i).put("actEndTime", code.get(j).get("endTime"));
						newParam.add(param.get(i));
						boolean result1 = InterfaceUtil.writeOut(this, query, newParam, "");
//						System.out.println("#### InterfaceUtil.writeOut = " + result1);
					} else { 
						for(int k = 0; k < offHours.size(); k++) { // detail 작업시간 있는 경우 detail 테이블의 startTime, endTime 
							newParam = new ArrayList<Map<String, Object>>();
							param.get(i).put("actStartTime", offHours.get(k).get("startTime"));
							param.get(i).put("actEndTime", offHours.get(k).get("endTime"));
							newParam.add(param.get(i));
							boolean result1 = InterfaceUtil.writeOut(this, query, newParam, "");
//							System.out.println("#### InterfaceUtil.writeOut = " + result1);
						}
					}				
				}
			}
		} 
		
		// 불출요청서 수정 시 인터페이스 정보 전송
		if(query.equals("com.thirautech.mom.purchase.material.materialRequest.create_materialRequestSave") && result.get("result").toString().equals("success")) {
			param.get(0).put("queryId", query.substring(19));
			List<Map<String, Object>> ifDBInfo = momDao.getMapList("com.thirautech.mom.common.get_ifDbInfo_list", param.get(0));
			List<Map<String, Object>> paramList = new ArrayList<Map<String, Object>>();
			Calendar cal = Calendar.getInstance();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String sysDateTime = sdf.format(cal.getTime());

			if(ifDBInfo.size() > 0) {
				for(int i = 0; i < param.size(); i++) {
					param.get(i).put("barcodeId", param.get(i).get("workOrderId"));
					param.get(i).put("qty", param.get(i).get("requestQty"));
					param.get(i).put("fromLocationCd", param.get(i).get("inLocationCd"));
					param.get(i).put("toLocationCd", param.get(i).get("outLocationCd"));
					param.get(i).put("jobCode", "U");
					param.get(i).put("attribute1", null);
					param.get(i).put("attribute2", null);
					param.get(i).put("attribute3", null);
					param.get(i).put("attribute4", null);
					param.get(i).put("attribute5", null);
					param.get(i).put("attribute6", null);
					param.get(i).put("attribute7", null);
					param.get(i).put("attribute8", null);
					param.get(i).put("attribute9", null);
					param.get(i).put("attribute10", null);
					param.get(i).put("transferDate", sysDateTime);
				}
				
				paramList.addAll(0, param);
				
				boolean result2 = InterfaceUtil.writeOut(this, query, paramList, "");
//				System.out.println("#### InterfaceUtil.writeOut(result2) = " + result2);
			}
		}
		
		// 작업지시 일괄 취소 시 인터페이스 전송
		if(query.equals("com.thirautech.mom.workOrder.workOrderResult.create_workOrderCancel") && result.get("result").toString().equals("success")) {
			String tableId = "If_Erp_R_MaterialShippedSlip";
			param.get(0).put("queryId", query.substring(19));
			param.get(0).put("tableId", tableId);
			List<Map<String, Object>> ifDBInfo = momDao.getMapList("com.thirautech.mom.common.get_ifDbInfo_list", param.get(0));
			
			if(ifDBInfo.size() > 0) {
				for(int z=0; z<ifDBInfo.size(); z++) {
					if(ifDBInfo.get(z).get("tableId").toString().equals("If_Erp_R_MaterialShippedSlip") ) {
						List<Map<String, Object>> paramList = new ArrayList<Map<String, Object>>();
						List<Map<String, Object>> workOrderRequest = momDao.getMapList("com.thirautech.mom.common.get_ifWoRequest_list", param.get(0));
						Map<String, Object> delMap = new HashMap<String, Object>();
						
						for(int i = 0; i < workOrderRequest.size(); i++) {
							Map<String, Object> paramMap = new HashMap<String, Object>();
							
							paramMap.put("divisionCd", workOrderRequest.get(i).get("divisionCd"));
							paramMap.put("companyCd", param.get(0).get("companyCd"));
							paramMap.put("materialRequestId", workOrderRequest.get(i).get("materialRequestId"));
							paramMap.put("barcodeId", workOrderRequest.get(i).get("workOrderId"));
							paramMap.put("requestDate", workOrderRequest.get(i).get("requestDate"));
							paramMap.put("workOrderId", workOrderRequest.get(i).get("workOrderId"));
							paramMap.put("itemId", workOrderRequest.get(i).get("itemId"));
							paramMap.put("specification", workOrderRequest.get(i).get("specification"));
							paramMap.put("qty", workOrderRequest.get(i).get("qty"));
							paramMap.put("fromLocationCd", workOrderRequest.get(i).get("fromLocationCd"));
							paramMap.put("toLocationCd", workOrderRequest.get(i).get("toLocationCd"));
							paramMap.put("woQty", workOrderRequest.get(i).get("woQty"));
							paramMap.put("parentItemId", workOrderRequest.get(i).get("parentItemId"));
							paramMap.put("transferDate", workOrderRequest.get(i).get("transferDate"));
							paramMap.put("jobCode", "D");
							paramMap.put("attribute1", null);
							paramMap.put("attribute2", null);
							paramMap.put("attribute3", null);
							paramMap.put("attribute4", null);
							paramMap.put("attribute5", null);
							paramMap.put("attribute6", null);
							paramMap.put("attribute7", null);
							paramMap.put("attribute8", null);
							paramMap.put("attribute9", null);
							paramMap.put("attribute10", null);
							delMap.put("divisionCd", workOrderRequest.get(i).get("divisionCd"));
							
							paramList.add(i, paramMap);
						}
						
						boolean result3 = InterfaceUtil.writeOut(this, query, paramList, tableId);
	//					System.out.println("#### InterfaceUtil.writeOut(result3) = " + result3);
						if(result3) {
							momDao.removeMap("com.thirautech.mom.common.remove_ifWoRequest", delMap);
						}
						
					} 
					
					if(ifDBInfo.get(z).get("tableId").toString().equals("If_Erp_R_WorkOrder")) {
						// 작업지시 취소 정보 전송
						List<Map<String,Object>> workOrderList = new ArrayList<Map<String,Object>>();
						for(int i = 0; i < param.size(); i++) {
							Map<String, Object> workOrder = getMap("com.thirautech.mom.workOrder.workOrderCreate.get_ezMesConfirmWorkOrder", param.get(i));
							workOrder.put("planqty", param.get(i).get("cancelQty"));
							workOrder.put("delflag", "Y");
							
							workOrderList.add(workOrder);
						}
					
						EzMesInter.workOrderList.put(param.get(0).get("companyCd").toString() + param.get(0).get("divisionCd").toString(), null);
						EzMesInter.outWorkOrderList(param.get(0).get("companyCd").toString(), param.get(0).get("divisionCd").toString(), workOrderList);
					}
				}
			}
		}
		
		if(!result.get("result").toString().equals("fail") && param.size() > 0) {
			SMTPUtil.sendMail(this, query, param);
		}

		return result;
	}
	
	public Map<String,Object> upsertMap(String query, Map<String,Object> param) {
		PrintUtil.print("MomService", "upsertMap", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		Map<String,Object> result = momDao.upsertMap(query, param);
		
		/*if(!result.get("result").toString().equals("fail")) {
			SMTPUtil.sendMail(this, query, param);
		}*/
		
		return result;
	}
	
	public Map<String,Object> upsertMapList(String query, List<Map<String,Object>> param) {
		PrintUtil.print("MomService", "upsertMapList", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		return momDao.createMapList(query, param);
	}

	public Map<String,Object> modifyMap(String query, Map<String,Object> param) {
		PrintUtil.print("MomService", "modifyMap", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, true, false, false);
		
		Map<String,Object> result = momDao.modifyMap(query, param);
		
		if(
				(query.equals("com.thirautech.mom.reference.itemInfo.item.modify_item")) 
				|| query.equals("com.thirautech.mom.reference.itemInfo.bor.modify_bor")
				|| query.equals("com.thirautech.mom.reference.resource.facility.modify_facility") 
		) {
			List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
			param.put("crudFlag", "C");
			list.add(param);
			boolean result1 = InterfaceUtil.writeOut(this, query, list, "");
//			System.out.println("#### InterfaceUtil.writeOut = " + result1);
		} 
				
		return result;	
	}
	
	public Map<String,Object> modifyMapList(String query, List<Map<String,Object>> param) {
		PrintUtil.print("MomService", "modifyMap", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, true, false, false);
		
		Map<String,Object> result = momDao.modifyMapList(query, param);
		
		/*if(
				(param.get("companyCd").toString().equals("MSE") && query.equals("com.thirautech.mom.reference.itemInfo.item.modify_item")) 
				|| query.equals("com.thirautech.mom.reference.itemInfo.bor.modify_bor")
				|| query.equals("com.thirautech.mom.reference.resource.facility.modify_facility") 
		) {
			List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
			param.put("crudFlag", "C");
			list.add(param);
			boolean result1 = InterfaceUtil.writeOut(this, query, list);
			System.out.println("#### InterfaceUtil.writeOut = " + result1);
		}*/ 
				
		return result;	
	}

	public Map<String,Object> removeMap(String query, Map<String,Object> param) {
		PrintUtil.print("MomService", "removeMap", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		/* modify_hists
		 * 20191025_005 / 20191104 / yjp / 휴일적용(설비/설비군) 처리시 야간/주간 구분해서 처리되도록 수정 및 삭제 처리, 인터페이스 파라미터 분기(param -> param1)
		 */
		/* start 20191025_005 */
		Map<String, Object> param1;
		//삭제되기 전 인터페이스 실행 (key값으로 삭제하기때문에 삭제 후 세부 정보 가져오기 불가)  
		if(query.equals("com.thirautech.mom.reference.workinghours.resourceByShiftPlanSchedule.remove_applyingHoliday")) {
			param.put("fromDate", param.get("startDate"));
			param.put("toDate", param.get("endDate"));
			List<Map<String, Object>> code = momDao.getMapList("com.thirautech.mom.reference.workinghours.resourceByShiftPlanSchedule.get_resourceByShiftPlanSchedule_list", param); // 삭제할 리스트 가져오기
			List<Map<String, Object>> list = new ArrayList<Map<String, Object>>(); 
			for(int i = 0; i < code.size(); i++) {  // 삭제할 리스트 삭제개수만큼 넣어주기
				param1 = new HashMap<String, Object>();
				param1.put("divisionCd", param.get("divisionCd"));
				param1.put("companyCd", param.get("companyCd"));
				param1.put("crudFlag", "D");
				param1.put("shiftType", code.get(i).get("shiftType"));
				param1.put("workTime", code.get(i).get("workTime"));
				param1.put("offTime", code.get(i).get("offTime"));
				param1.put("actTime", code.get(i).get("realWorkTime"));
				param1.put("shiftCd", code.get(i).get("shiftCd"));
				param1.put("startTime", code.get(i).get("startTime"));
				param1.put("endTime", code.get(i).get("endTime"));
				param1.put("applyDate", code.get(i).get("applyDate"));
				param1.put("resourceCd", code.get(i).get("resourceCd"));
				
				List<Map<String, Object>> offHours = momDao.getMapList("com.thirautech.mom.reference.workinghours.shiftCode.get_shiftCodeDetailTime_list", param1);
				if(offHours.size() == 0) { // detail 데이터 없는 경우 
					list = new ArrayList<Map<String, Object>>(); // list 초기화 
					param1.put("actStartTime", code.get(i).get("startTime"));
					param1.put("actEndTime", code.get(i).get("endTime"));
					list.add(param1);
					boolean result1 = InterfaceUtil.writeOut(this, query, list, "");
//					System.out.println("#### InterfaceUtil.writeOut = " + result);
				} else { // detail 데이터 있는(휴식시간 있을) 경우
					for(int j = 0; j < offHours.size(); j++) {
						list = new ArrayList<Map<String, Object>>(); // list 초기화 
						param1.put("actStartTime", offHours.get(j).get("startTime"));
						param1.put("actEndTime", offHours.get(j).get("endTime"));
						list.add(param1);
						boolean result1 = InterfaceUtil.writeOut(this, query, list, "");
					/* end 20191025_005 */
//						System.out.println("#### InterfaceUtil.writeOut = " + result);
					}
				}
			}
			
			
		}
		
		Map<String,Object> result = momDao.removeMap(query, param);
		
		//화면에서 넘겨주는 값이 있는 경우 삭제 후 인터페이스 
		if(
				query.equals("com.thirautech.mom.reference.itemInfo.item.remove_item") 
				|| query.equals("com.thirautech.mom.reference.itemInfo.bor.remove_bor")
				|| query.equals("com.thirautech.mom.reference.resource.facility.remove_facility")
		) {
			List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
			param.put("crudFlag", "D");
			list.add(param);
			boolean result1 = InterfaceUtil.writeOut(this, query, list, "");
//			System.out.println("#### InterfaceUtil.writeOut = " + result1);
		} 
		
		/*if(!result.get("result").toString().equals("fail")) {
			SMTPUtil.sendMail(this, query, param);
		}*/
		

		return result;
	}
	
	public Map<String,Object> removeMapList(String query, List<Map<String,Object>> param) {
		PrintUtil.print("MomService", "removeMapList", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		Map<String,Object> result = momDao.removeMapList(query, param);
		if(
				   query.equals("com.thirautech.mom.reference.itemInfo.item.remove_item") 
				|| query.equals("com.thirautech.mom.reference.itemInfo.bor.remove_bor")
				|| query.equals("com.thirautech.mom.reference.resource.facility.remove_facility")
		) {
			for(int i = 0; i < param.size(); i++) {
				param.get(i).put("crudFlag", "D");
			}
			boolean result1 = InterfaceUtil.writeOut(this, query, param, "");
//			System.out.println("#### InterfaceUtil.writeOut = " + result1);
		} 
		/* modify_hists
		 * 20191025_005 / 20191105 / yjp / 선택휴일적용시 list로 넘겨서 처리되도록 removeMap() -> removeMapList() 변경
		 */
		/* start 20191025_005 */
		else if(query.equals("com.thirautech.mom.reference.workinghours.resourceByShiftPlanSchedule.remove_resourceByShiftPlanSchedule")
		) { // 선택 휴일 적용
			for(int i = 0; i < param.size(); i++) {
				List<Map<String, Object>> offHours = momDao.getMapList("com.thirautech.mom.reference.workinghours.shiftCode.get_shiftCodeDetailTime_list", param.get(i));
				List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
				param.get(i).put("crudFlag", "D");
				param.get(i).put("shiftType", param.get(i).get("shiftType"));
				param.get(i).put("workTime", param.get(i).get("workTime"));
				param.get(i).put("offTime", param.get(i).get("offTime"));
				param.get(i).put("actTime", param.get(i).get("realWorkTime"));
				
				if(offHours.size() == 0) { // detail 데이터 없는 경우
					list = new ArrayList<Map<String, Object>>(); // list 초기화
					param.get(i).put("actStartTime", param.get(i).get("startTime"));
					param.get(i).put("actEndTime", param.get(i).get("endTime"));
					list.add(param.get(i));
					boolean result1 = InterfaceUtil.writeOut(this, query, list, "");
//					System.out.println("#### InterfaceUtil.writeOut = " + result1);
				} else { // detail 데이터 있는(휴식시간 있을) 경우
					for(int j = 0; j < offHours.size(); j++) {
						list = new ArrayList<Map<String, Object>>(); // list 초기화 
						param.get(i).put("actStartTime", offHours.get(j).get("startTime"));
						param.get(i).put("actEndTime", offHours.get(j).get("endTime"));
						list.add(param.get(i));
						boolean result1 = InterfaceUtil.writeOut(this, query, list, "");
//						System.out.println("#### InterfaceUtil.writeOut = " + result1);
					}
				}
			}
			/* end 20191025_005 */
		} 

		/*if(!result.get("result").toString().equals("fail") && param.size() > 0) {
			SMTPUtil.sendMail(this, query, param.get(0));
		}*/

		return result;
	}
}
