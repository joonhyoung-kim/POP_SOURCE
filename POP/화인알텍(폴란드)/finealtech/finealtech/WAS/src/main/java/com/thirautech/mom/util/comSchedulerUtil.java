package com.thirautech.mom.util;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.thirautech.mom.controller.FileController;

public class comSchedulerUtil {

	@Autowired
	private FileController fileCon;

//	// PO 정보
//	public void xmlDomesticPo() {
//
//		Map<String, Object> param = new HashMap<String, Object>();
//		try {
//			param.put("schedulerFlag", "Y");
//			param.put("b2biType", "DomesticPoGERP");
//			fileCon.B2BIXml("com.thirautech.mom.plan.order.B2BIifpo.b2biIfPo", param);
//
//		} catch (Exception e) {
//			e.printStackTrace();
//			PrintUtil.print(null, null, null, "$", "SCHEDULE 실행 실패했습니다.", "comSchedulerUtil.xmlDomesticPo()", false,
//					true, true, true);
//		}
//	}
//
//	// Departure 정보
//	public void xmlDepartureStatus() {
//
//		Map<String, Object> param = new HashMap<String, Object>();
//		try {
//			param.put("schedulerFlag", "Y");
//			param.put("b2biType", "DepartureStatusGERP");
//			fileCon.B2BIXml("com.thirautech.mom.plan.order.B2BIifdep.b2biIfDep", param);
//
//		} catch (Exception e) {
//			e.printStackTrace();
//			PrintUtil.print(null, null, null, "$", "SCHEDULE 실행 실패했습니다.", "comSchedulerUtil.xmlDepartureStatus()", false,
//					true, true, true);
//		}
//	}
//
//	// Receiving 정보
//	public void xmlPuscsReceiving() {
//		Map<String, Object> param = new HashMap<String, Object>();
//		try {
//			param.put("schedulerFlag", "Y");
//			param.put("b2biType", "PuscsReceivingGERP");
//			fileCon.B2BIXml("com.thirautech.mom.plan.order.B2BIifrcv.b2biIfRcv", param);
//
//		} catch (Exception e) {
//			e.printStackTrace();
//			PrintUtil.print(null, null, null, "$", "SCHEDULE 실행 실패했습니다.", "comSchedulerUtil.xmlPuscsReceiving()", false,
//					true, true, true);
//		}
//	}
//
//	// PP(생산계획) 정보
//	public void xmlFpDispatch() {
//		Map<String, Object> param = new HashMap<String, Object>();
//		try {
//			param.put("schedulerFlag", "Y");
//			param.put("b2biType", "FpDispatchGERP");
//			fileCon.B2BIXml("com.thirautech.mom.plan.order.B2BIifpp.b2biIfPp", param);
//		} catch (Exception e) {
//			e.printStackTrace();
//			PrintUtil.print(null, null, null, "$", "SCHEDULE 실행 실패했습니다.", "comSchedulerUtil.xmlFpDispatch()", false,
//					true, true, true);
//		}
//	}
	
	
	public void exchangeApiCall() {
		Map<String, Object> param = new HashMap<String, Object>();
		try {
			param.put("schedulerFlag", "Y");
			fileCon.exchange("com.thirautech.mom.reference.price.globalPrice.globalPriceProc.dummy", param);
		} catch (Exception e) {
			e.printStackTrace();
			PrintUtil.print(null, null, null, "$", "SCHEDULE 실행 실패했습니다.", "comSchedulerUtil.exchangeApiCall()", false, true, true, true);
		}
	}

}
