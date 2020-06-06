package com.thirautech.mom.serviceimpl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thirautech.mom.dao.PopDao;
import com.thirautech.mom.service.PopService;
import com.thirautech.mom.util.PrintUtil;

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
}