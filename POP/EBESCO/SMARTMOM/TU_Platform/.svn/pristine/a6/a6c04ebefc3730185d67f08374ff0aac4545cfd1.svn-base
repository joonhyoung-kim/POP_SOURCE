package com.thirautech.mom.serviceimpl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thirautech.mom.dao.PopDao;
import com.thirautech.mom.service.PopService;
import com.thirautech.mom.util.ZplScriptPrintUtil;

@Service
public class PopServiceImpl implements PopService {
	@Autowired
	private PopDao popDao;
	
	public List<Map<String,Object>> getMapList(String query, List<Map<String,Object>> param) {
		return popDao.getMapList(query, param);
	}
	
	public List<Map<String,Object>> upsertMapList(String query, List<Map<String,Object>> param) {
		return popDao.upsertMap(query, param);
	}
	
	public List<Map<String,Object>> getLabelObjectMapList(String query, Map<String,Object> param) {
        System.out.println("@@@111param(labelID) : " + param);
		return popDao.getLabelObjectMapList(query,param);
	}

	public String getZplScriptFromLabelObjectMapList(List<Map<String,Object>> listParam) throws Exception {
		String retZplScript = "";
		//----------------------------------------
		
        System.out.println("###listParam.get(0) : " + listParam.get(0));

        retZplScript = ZplScriptPrintUtil.getLabelObjectMapListToZplScript(listParam);
		
		
		return retZplScript;
	}

	
	
	
}