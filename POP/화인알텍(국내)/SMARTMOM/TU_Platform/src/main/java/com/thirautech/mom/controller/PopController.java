package com.thirautech.mom.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.thirautech.mom.service.PopService;
import com.thirautech.mom.util.FrameworkUtil;

@RestController
@RequestMapping("/pop")
public class PopController {
	@Autowired
	private PopService popService;
	
	@GetMapping("/request/{query}") 
	public List<Map<String,Object>> getMapList(@PathVariable String query, String param) {
		List<Map<String,Object>> listParam = FrameworkUtil.json2List(param);
		
		if(query == null || param == null || query.length() < 1 || param.length() < 1) {
			if(query == null || query.length() < 1) {
				System.out.println("#### query is null");
			}
			
			if(param == null || param.length() < 1) {
				System.out.println("#### param is null");
			}
			
			return new ArrayList<Map<String, Object>>();
		} 
		
		System.out.println("query = " + query.toString());
		System.out.println("param = " + param.toString());
		
		List<Map<String, Object>> result = popService.getMapList(query, listParam);
		System.out.println("result =" + result.toString());
		
		return result;
	}
	
	@GetMapping("/request/upsert/{query}")
	public List<Map<String,Object>> upsertMapList(@PathVariable String query, String param) {
		List<Map<String,Object>> listParam = FrameworkUtil.json2List(param);
		
		if(query == null || param == null) {
			if(query == null) {
				System.out.println("#### query is null");
			}
			
			if(param == null) {
				System.out.println("#### param is null");
			}
			
			return new ArrayList<Map<String, Object>>();
		} 
		
		System.out.println("query = " + query.toString());
		System.out.println("param = " + param.toString());
		
		return popService.upsertMapList(query, listParam);
	}
	
	@GetMapping("/request/postupsert/{query}")
	public List<Map<String,Object>> postUpsertMapList(@PathVariable String query, String param) {
		List<Map<String,Object>> listParam = FrameworkUtil.json2List(param);
		
		if(query == null || param == null) {
			if(query == null) {
				System.out.println("#### query is null");
			}
			
			if(param == null) {
				System.out.println("#### param is null");
			}
			
			return new ArrayList<Map<String, Object>>();
		} 
		
		System.out.println("query = " + query.toString());
		System.out.println("param = " + param.toString());
		
		return popService.upsertMapList(query, listParam);
	}
}