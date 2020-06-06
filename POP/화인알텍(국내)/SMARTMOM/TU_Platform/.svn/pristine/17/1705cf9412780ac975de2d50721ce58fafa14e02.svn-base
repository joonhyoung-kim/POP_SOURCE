package com.thirautech.mom.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.thirautech.mom.service.MomService;
import com.thirautech.mom.util.FrameworkUtil;
import com.thirautech.mom.util.PrintUtil;

@RestController
@RequestMapping("/mom")
public class MomController {
	@Autowired
	private MomService momService;
	
	@GetMapping("/request/{query}/{item}")
	public Map<String,Object> getMap(@PathVariable String query, @PathVariable String item, @RequestParam Map<String, Object> param) { 
		query = FrameworkUtil.removeDummy(query, "I");
		param = FrameworkUtil.createParam(param);
		
		PrintUtil.print("MomController", "getMap", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		return momService.getMap(query, param);
	}
	
	@GetMapping("/request/{query}") 
	public List<Map<String,Object>> getMapList(@PathVariable String query, @RequestParam Map<String, Object> param) {
		query = FrameworkUtil.removeDummy(query, "R");
		param = FrameworkUtil.createParam(param);
		
		PrintUtil.print("MomController", "getMapList", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		return momService.getMapList(query, param);
	}
	
	@PostMapping("/request/{query}")
	public Map<String,Object> createMap(@PathVariable String query, @RequestBody Map<String,Object> param) {
		query = FrameworkUtil.removeDummy(query, "C");
		param = FrameworkUtil.createParam(param);
		
		PrintUtil.print("MomController", "createMap", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		return momService.createMap(query, param);
	}
	
	@PostMapping("/request/{query}/{list}")
	public Map<String,Object> createMapList(@PathVariable String query, @PathVariable String list, @RequestBody List<Map<String,Object>> param) {
		query = FrameworkUtil.removeDummy(query, "C");
		param = FrameworkUtil.createParam(param);
		
		PrintUtil.print("MomController", "createMapList", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		return momService.createMapList(query, param);
	}
	
	@PostMapping("/request/upsert/{query}")
	public Map<String,Object> upsertMap(@PathVariable String query, @PathVariable String upsert, @RequestBody Map<String,Object> param) {
		query = FrameworkUtil.removeDummy(query, "C");
		param = FrameworkUtil.createParam(param);
		
		PrintUtil.print("MomController", "upsertMap", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		return momService.upsertMap(query, param);
	}
	
	@PostMapping("/request/upsert/{query}/{list}")
	public Map<String,Object> upsertMapList(@PathVariable String query, @PathVariable String list, @RequestBody List<Map<String,Object>> param) {
		query = FrameworkUtil.removeDummy(query, "C");
		param = FrameworkUtil.createParam(param);
		
		PrintUtil.print("MomController", "createMapList", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		return momService.upsertMapList(query, param);
	}
	
	@PutMapping("/request/{query}")
	public Map<String,Object> modifyMap(@PathVariable String query, @RequestBody Map<String,Object> param) { 
		query = FrameworkUtil.removeDummy(query, "U");
		param = FrameworkUtil.createParam(param);
		
		PrintUtil.print("MomController", "modifyMap", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		return momService.modifyMap(query, param);
	}
	
	@PutMapping("/request/{query}/{list}")
	public Map<String,Object> modifyMapList(@PathVariable String query, @PathVariable String list, @RequestBody List<Map<String,Object>> param) { 
		query = FrameworkUtil.removeDummy(query, "U");
		param = FrameworkUtil.createParam(param);
		
		PrintUtil.print("MomController", "modifyMapList", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		return momService.modifyMapList(query, param);
	}
	
	@DeleteMapping("/request/{query}")
	public Map<String,Object> removeMap(@PathVariable String query, @RequestBody Map<String,Object> param) {
		query = FrameworkUtil.removeDummy(query, "D");
		param = FrameworkUtil.createParam(param);
		
		PrintUtil.print("MomController", "removeMap", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		return momService.removeMap(query, param);
	}
	
	@DeleteMapping("/request/{query}/{list}")
	public Map<String,Object> removeMapList(@PathVariable String query, @PathVariable String list, @RequestBody List<Map<String,Object>> param) {
		query = FrameworkUtil.removeDummy(query, "D");
		param = FrameworkUtil.createParam(param);
		
		PrintUtil.print("MomController", "removeMapList", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		return momService.removeMapList(query, param);
	}
}
