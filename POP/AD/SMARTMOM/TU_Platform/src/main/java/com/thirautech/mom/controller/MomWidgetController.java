package com.thirautech.mom.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.thirautech.framework.security.manager.AuthManager;
import com.thirautech.mom.literal.MomLiteral;
import com.thirautech.mom.service.MomService;
import com.thirautech.mom.util.FrameworkUtil;
import com.thirautech.mom.util.PrintUtil;
import com.thirautech.mom.util.excel.ExcelRead;
import com.thirautech.mom.util.excel.ExcelReadOption;

@RestController
@RequestMapping("/widget")
public class MomWidgetController {
	@Autowired
	private MomService momService;
	
	@GetMapping("/request/{query}") 
	public List<Map<String, Object>> getMapList(@PathVariable String query, @RequestParam Map<String, Object> param) {
		query = FrameworkUtil.removeDummy(query, "R");
		param = FrameworkUtil.createParam(param, "R", null, null, null, null, null);
		
		PrintUtil.print("MomWidgetController", "getMapList", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> result = momService.getMapList(query, param);	
		
		/*if(query.indexOf("widgetprop") >= 0) {*/
			for(int i = 0; i < result.size(); i++) {
				if(result.get(i).get("columnProperty") != null) {
					String[] columnToken = result.get(i).get("columnProperty").toString().split("\\},\\{");
					if(columnToken != null && columnToken.length > 0) {
						String pageId = "";
						String pageName = "";
						String columnFixed = "0";
						String queryId = "";
						String noId = "";
						String editId = "";
						String checkId = "";
						String cellMergeId = "";
						String showFooterId = "";
						/*String usePaging = "";*/
						String pageRowCount = "";
						/*String pagingMode = "";*/
						String popUpTitle = "";
						String popUpColSize = "";
						if(result.get(i).get("pageId") != null) {
							pageId = result.get(i).get("pageId").toString();
						}
						if(result.get(i).get("pageName") != null) {
							pageName = result.get(i).get("pageName").toString();
						}
						if(result.get(i).get("gridProperty") != null) {
							String value = result.get(i).get("gridProperty").toString();
							
							queryId = value;
							if(queryId.indexOf("queryId") < 0) {
								queryId = "";
							} else {
								queryId = queryId.substring(queryId.indexOf("queryId") + "queryId".length() + 2);
								if(queryId.charAt(0) == '\"') {
									queryId = queryId.substring(1);
								}
								
								int min = 9999;
								if(queryId.indexOf("\"") > 0 && queryId.indexOf("\"") < min) {
									min = queryId.indexOf("\"");
								}
								if(queryId.indexOf(",") > 0 && queryId.indexOf(",") < min) {
									min = queryId.indexOf(",");
								}
								if(queryId.indexOf("}") > 0 && queryId.indexOf("}") < min) {
									min = queryId.indexOf("}");
								}
								
								if(min == 9999) {
									queryId = "";
								} else {
									queryId = queryId.substring(0, min);
								}
							}
							
							checkId = value;
							if(checkId.indexOf("checkId") < 0) {
								checkId = "NONE";
							} else {
								checkId = checkId.substring(checkId.indexOf("checkId") + "checkId".length() + 2);
								if(checkId.charAt(0) == '\"') {
									checkId = checkId.substring(1);
								}
								
								int min = 9999;
								if(checkId.indexOf("\"") > 0 && checkId.indexOf("\"") < min) {
									min = checkId.indexOf("\"");
								}
								if(checkId.indexOf(",") > 0 && checkId.indexOf(",") < min) {
									min = checkId.indexOf(",");
								}
								if(checkId.indexOf("}") > 0 && checkId.indexOf("}") < min) {
									min = checkId.indexOf("}");
								}
								
								if(min == 9999) {
									checkId = "NONE";
								} else {
									checkId = checkId.substring(0, min);
								}
							}
							
							noId = value;
							if(noId.indexOf("showRowNumColumn") < 0) {
								noId = "false";
							} else {
								noId = noId.substring(noId.indexOf("showRowNumColumn") + "showRowNumColumn".length() + 2, noId.indexOf("showRowNumColumn") + "showRowNumColumn".length() + 2 + 4);
								if(noId.equals("true")) {
									noId = "true";
								} else {
									noId = "false";
								}
							}
							
							editId = value;
							if(editId.indexOf("editId") < 0) {
								editId = "false";
							} else {
								editId = editId.substring(editId.indexOf("editId") + "editId".length() + 2, editId.indexOf("editId") + "editId".length() + 2 + 4);
								if(editId.equals("true")) {
									editId = "true";
								} else {
									editId = "false";
								}
							}
							
							cellMergeId = value;
							if(cellMergeId.indexOf("enableCellMerge") < 0) {
								cellMergeId = "false";
							} else {
								cellMergeId = "true";
							}
							
							showFooterId = value;
							if(showFooterId.indexOf("showFooter") < 0) {
								showFooterId = "false";
							} else {
								showFooterId = "true";
							}
							
							columnFixed = value;
							if(columnFixed.indexOf("columnFixed") < 0) {
								columnFixed = "0";
							} else {
								columnFixed = columnFixed.substring(columnFixed.indexOf("columnFixed") + "columnFixed".length() + 2);
								if(columnFixed.charAt(0) == '\"') {
									columnFixed = columnFixed.substring(1);
								}
								
								int min = 9999;
								if(columnFixed.indexOf("\"") > 0 && columnFixed.indexOf("\"") < min) {
									min = columnFixed.indexOf("\"");
								}
								if(columnFixed.indexOf(",") > 0 && columnFixed.indexOf(",") < min) {
									min = columnFixed.indexOf(",");
								}
								if(columnFixed.indexOf("}") > 0 && columnFixed.indexOf("}") < min) {
									min = columnFixed.indexOf("}");
								}
								
								if(min == 9999) {
									columnFixed = "0";
								} else {
									columnFixed = columnFixed.substring(0, min);
								}
							}
							
							/*usePaging = value;
							if(usePaging.indexOf("usePaging") < 0) {
								usePaging = "false";
							} else {
								usePaging = usePaging.substring(usePaging.indexOf("usePaging") + "usePaging".length() + 2, usePaging.indexOf("usePaging") + "usePaging".length() + 2 + 4);
								if(usePaging.equals("true")) {
									usePaging = "true";
								} else {
									usePaging = "false";
								}
							}*/
							
							pageRowCount = value;
							if(pageRowCount.indexOf("pageRowCount") < 0) {
								pageRowCount = "0";
							} else {
								pageRowCount = pageRowCount.substring(pageRowCount.indexOf("pageRowCount") + "pageRowCount".length() + 2);
								if(pageRowCount.charAt(0) == '\"') {
									pageRowCount = pageRowCount.substring(1);
								}
								
								int min = 9999;
								if(pageRowCount.indexOf("\"") > 0 && pageRowCount.indexOf("\"") < min) {
									min = pageRowCount.indexOf("\"");
								}
								if(pageRowCount.indexOf(",") > 0 && pageRowCount.indexOf(",") < min) {
									min = pageRowCount.indexOf(",");
								}
								if(pageRowCount.indexOf("}") > 0 && pageRowCount.indexOf("}") < min) {
									min = pageRowCount.indexOf("}");
								}
								
								if(min == 9999) {
									pageRowCount = "0";
								} else {
									pageRowCount = pageRowCount.substring(0, min);
								}
							}
							
							/*pagingMode = value;
							if(pagingMode.indexOf("pagingMode") < 0) {
								pagingMode = "false";
							} else {
								pagingMode = pagingMode.substring(pagingMode.indexOf("pagingMode") + "pagingMode".length() + 2, pagingMode.indexOf("pagingMode") + "pagingMode".length() + 2 + 4);
								if(pagingMode.equals("true")) {
									pagingMode = "true";
								} else {
									pagingMode = "false";
								}
							}*/
							
							popUpTitle = value;
							if(popUpTitle.indexOf("popUpTitle") < 0) {
								popUpTitle = "";
							} else {
								popUpTitle = popUpTitle.substring(popUpTitle.indexOf("popUpTitle") + "popUpTitle".length() + 2);
								if(popUpTitle.charAt(0) == '\"') {
									popUpTitle = popUpTitle.substring(1);
								}
								
								int min = 9999;
								if(popUpTitle.indexOf("\"") > 0 && popUpTitle.indexOf("\"") < min) {
									min = popUpTitle.indexOf("\"");
								}
								if(popUpTitle.indexOf(",") > 0 && popUpTitle.indexOf(",") < min) {
									min = popUpTitle.indexOf(",");
								}
								if(popUpTitle.indexOf("}") > 0 && popUpTitle.indexOf("}") < min) {
									min = popUpTitle.indexOf("}");
								}
								
								if(min == 9999) {
									popUpTitle = "";
								} else {
									popUpTitle = popUpTitle.substring(0, min);
								}
							}
							
							popUpColSize = value;
							if(popUpColSize.indexOf("popUpColSize") < 0) {
								popUpColSize = "0";
							} else {
								popUpColSize = popUpColSize.substring(popUpColSize.indexOf("popUpColSize") + "popUpColSize".length() + 2);
								if(popUpColSize.charAt(0) == '\"') {
									popUpColSize = popUpColSize.substring(1);
								}
								
								int min = 9999;
								if(popUpColSize.indexOf("\"") > 0 && popUpColSize.indexOf("\"") < min) {
									min = popUpColSize.indexOf("\"");
								}
								if(popUpColSize.indexOf(",") > 0 && popUpColSize.indexOf(",") < min) {
									min = popUpColSize.indexOf(",");
								}
								if(popUpColSize.indexOf("}") > 0 && popUpColSize.indexOf("}") < min) {
									min = popUpColSize.indexOf("}");
								}
								
								if(min == 9999) {
									popUpColSize = "0";
								} else {
									popUpColSize = popUpColSize.substring(0, min);
								}
							}
						}
						
						for(int j = 0; j < columnToken.length; j++) {
							Map<String, Object> map = FrameworkUtil.json2Map(columnToken[j]);
							if(j == 0) {
								map.put("pageId"  , pageId);
								map.put("pageName", pageName);
								map.put("queryId" , queryId);
								map.put("noId"    , noId.equals("true")  ? true : false);
								map.put("editId"  , editId.equals("true")  ? true : false);
								map.put("checkId" , checkId);	
								map.put("cellMergeId" , cellMergeId.equals("true")  ? true : false);
								map.put("showFooterId" , showFooterId.equals("true")  ? true : false);
								/*map.put("usePaging" , usePaging.equals("true") ? true : false);*/
								map.put("pageRowCount" , Integer.parseInt(pageRowCount));
								/*map.put("pagingMode" , pagingMode.equals("true") ? true : false);*/
								map.put("popUpTitle" , popUpTitle);
								map.put("popUpColSize" , Integer.parseInt(popUpColSize));
							}
							if(j < Integer.parseInt(columnFixed)) {
								map.put("columnFixed", true);
							} else {
								map.put("columnFixed", false);
							}
							
							map.put("columnIndex", j);						
							list.add(map);
						}
					}
				}
				
				if(result.get(i).get("searchFilter") != null && result.get(i).get("searchFilter").toString().length() > 1) {
					String[] columnToken = result.get(i).get("searchFilter").toString().split("\\},\\{");
					if(columnToken != null && columnToken.length > 0) {
						for(int j = 0; j < columnToken.length; j++) {							
							Map<String, Object> map = FrameworkUtil.json2Map(columnToken[j]);
							//map.put("dropDown", map.get("dropDown").toString()/*.replaceAll("#44#", ",")*/);
							map.put("columnIndex", j);	
							list.add(map);
						}
					}
				}
				
				if(result.get(i).get("processTran") != null && result.get(i).get("processTran").toString().length() > 1) {
					String[] columnToken = result.get(i).get("processTran").toString().split("\\},\\{");
					if(columnToken != null && columnToken.length > 0) {
						for(int j = 0; j < columnToken.length; j++) {		
							Map<String, Object> map = FrameworkUtil.json2Map(columnToken[j]);
							//map.put("dropDown", map.get("dropDown").toString()/*.replaceAll("#44#", ",")*/);
							map.put("columnIndex", j);	
							list.add(map);
						}
					}
				}
				
				if(result.get(i).get("columnIndex") != null && result.get(i).get("columnIndex").toString().length() > 1) {
					String[] columnToken = result.get(i).get("columnIndex").toString().split("\\},\\{");
					if(columnToken != null && columnToken.length > 0) {
						for(int j = 0; j < columnToken.length; j++) {							
							Map<String, Object> map = FrameworkUtil.json2Map(columnToken[j]);
							map.put("columnIndex", j);	
							list.add(map);
						}
					}
				}
			}
		/*} else {
			for(int i = 0; i < result.size(); i++) {
				if(result.get(i).get("columnProperty") != null) {
					String[] columnToken = result.get(i).get("columnProperty").toString().split("\\},\\{");
					if(columnToken != null && columnToken.length > 0) {
						for(int j = 0; j < columnToken.length; j++) {
							Map<String, Object> map = FrameworkUtil.json2Map(columnToken[j]);
							if(j == 0) {
								map.put("pageId"  , result.get(0).get("pageId").toString());
								map.put("pageName", result.get(0).get("pageName").toString());
							}
							
							map.put("columnIndex", j);						
							
							list.add(map);
						}
					}
				}
			}
		}*/
		
		return list;
	}
	
	@PostMapping("/request/{query}/{list}")
	public Map<String, Object> createMapList(@PathVariable String query, @PathVariable String list, @RequestBody List<Map<String, Object>> param) {
		query = FrameworkUtil.removeDummy(query, "C");
		param = FrameworkUtil.createParam(param, "L");
		
		PrintUtil.print("MomWidgetController", "createMapList", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		// Deprecated...
		/*if(!AuthManager.getSessionAttribute("locale").toString().equals("KR")) {
			for(int i = 0; i < param.size(); i++) {
				if(param.get(i).get("columnProperty") == null || param.get(i).get("columnProperty").toString().length() < 12) {
					continue;
				}
				
				String pageId = param.get(i).get("pageId").toString();
				List<Map<String, Object>> columnProperty = FrameworkUtil.json2List(param.get(i).get("columnProperty").toString());
				List<Map<String, Object>> headers = new ArrayList<Map<String, Object>>();
				for(int j = 0; j < columnProperty.size(); j++) {
					Map<String, Object> tuple = columnProperty.get(j);
					Map<String, Object> map = new HashMap<String, Object>();
					map.put("companyCd"  , AuthManager.getSessionAttribute("companyCd") .toString());
					map.put("divisionCd" , AuthManager.getSessionAttribute("divisionCd").toString());
					map.put("locale"     , AuthManager.getSessionAttribute("locale")    .toString());
					map.put("pageId"     , "GRID");
					map.put("codeType"   , tuple.get("dataField").toString());
					map.put("keyword"    , tuple.get("headerTextLang").toString());
					map.put("useYn"		 , "Y");
					map.put("description", pageId);
					map.put("userId"     , AuthManager.getSessionAttribute("userId")    .toString());
					
					headers.add(map);
				}
				
				String queryId = "com.thirautech.mom.widget.create_widgetheaders";
				momService.createMapList(queryId, headers);
			}
		}*/
		
		for(int i = 0; i < param.size(); i++) {
			Map<String, Object> map = param.get(i);
			String key = "columnProperty";
			String value = map.get(key).toString();
			
			String key1 = "\"sortIndex\":\"";
			String key2 = "\"sortIndex\":";
			String key3 = "\"";
			while(value.indexOf(key1) > 0) {
				String token1 = value.substring(0, value.indexOf(key1));
				String tmp = value.substring(value.indexOf(key1));
				
				String token2 = "";
				String token3 = "";
				if(tmp.indexOf(",") > 0) {
					token2 = tmp.substring(0, tmp.indexOf(","));
					token3 = tmp.substring(tmp.indexOf(","));
				} else {
					token2 = tmp.substring(0, tmp.indexOf("}"));
					token3 = tmp.substring(tmp.indexOf("}"));
				}
				
				token2 = key2 + token2.replace(key2, "").replace(key3, "");
				
				value = token1 + token2 + token3;
			}
			
			key1 = "\"sort\":\"";
			key2 = "\"sort\":";
			while(value.indexOf(key1) > 0) {
				String token1 = value.substring(0, value.indexOf(key1));
				String tmp = value.substring(value.indexOf(key1));
				
				String token2 = "";
				String token3 = "";
				if(tmp.indexOf(",") > 0) {
					token2 = tmp.substring(0, tmp.indexOf(","));
					token3 = tmp.substring(tmp.indexOf(","));
				} else {
					token2 = tmp.substring(0, tmp.indexOf("}"));
					token3 = tmp.substring(tmp.indexOf("}"));
				}
				
				token2 = key2 + token2.replace(key2, "").replace(key3, "");
				
				value = token1 + token2 + token3;
			}
			
			key1 = "\"width\":\"";
			key2 = "\"width\":";
			while(value.indexOf(key1) > 0) {
				String token1 = value.substring(0, value.indexOf(key1));
				String tmp = value.substring(value.indexOf(key1));
				
				String token2 = "";
				String token3 = "";
				if(tmp.indexOf(",") > 0) {
					token2 = tmp.substring(0, tmp.indexOf(","));
					token3 = tmp.substring(tmp.indexOf(","));
				} else {
					token2 = tmp.substring(0, tmp.indexOf("}"));
					token3 = tmp.substring(tmp.indexOf("}"));
				}
				
				token2 = key2 + token2.replace(key2, "").replace(key3, "");
				
				value = token1 + token2 + token3;
			}
			
			key1 = "\"excelTemplateHide\":\"";
			key2 = "\"excelTemplateHide\":";
			while(value.indexOf(key1) > 0) {
				String token1 = value.substring(0, value.indexOf(key1));
				String tmp = value.substring(value.indexOf(key1));
				
				String token2 = "";
				String token3 = "";
				if(tmp.indexOf(",") > 0) {
					token2 = tmp.substring(0, tmp.indexOf(","));
					token3 = tmp.substring(tmp.indexOf(","));
				} else {
					token2 = tmp.substring(0, tmp.indexOf("}"));
					token3 = tmp.substring(tmp.indexOf("}"));
				}
				
				token2 = key2 + token2.replace(key2, "").replace(key3, "");
				
				value = token1 + token2 + token3;
			}
			
			key1 = "\"popUpRead\":\"";
			key2 = "\"popUpRead\":";
			while(value.indexOf(key1) > 0) {
				String token1 = value.substring(0, value.indexOf(key1));
				String tmp = value.substring(value.indexOf(key1));
				
				String token2 = "";
				String token3 = "";
				if(tmp.indexOf(",") > 0) {
					token2 = tmp.substring(0, tmp.indexOf(","));
					token3 = tmp.substring(tmp.indexOf(","));
				} else {
					token2 = tmp.substring(0, tmp.indexOf("}"));
					token3 = tmp.substring(tmp.indexOf("}"));
				}
				
				token2 = key2 + token2.replace(key2, "").replace(key3, "");
				
				value = token1 + token2 + token3;
			}
			
			//String value1 = value;
			String[] tokens = value.split(",");
			key1 = "\"dropDown\":\"";
			key2 = "\"dropDown\":";
			if(tokens != null && tokens.length > 0) {
				for(int j = 0; j < tokens.length; j++) {
					if(tokens[j].indexOf(key1) >= 0) {
						String tmp = tokens[j].substring(tokens[j].indexOf(key1) + key1.length());
						String token1 = tokens[j].substring(0, tokens[j].indexOf(key1));
						String token2 = tmp.substring(0, tmp.indexOf("\""));
						String token3 = tmp.substring(tmp.indexOf("\""));
						/*if(token2.indexOf("?") > 0) {
							token2 = "/mom/request/com.thirautech.mom." + token2.replace("?", ".dummy?");
						} else {
							token2 = "/mom/request/com.thirautech.mom." + token2 + ".dummy";
						}*/
						
						tokens[j] = token1 + key1 + token2 + token3;
					}
					
					if(j == 0) {
						value = tokens[j];
					} else {
						value += ("," + tokens[j]);
					}
				}
			}
			
			map.put(key, value);
		}
		
		return momService.createMapList(query, param);
	}
	
	@DeleteMapping("/request/{query}")
	public Map<String,Object> removeMap(@PathVariable String query, @RequestBody Map<String,Object> param) {
		query = FrameworkUtil.removeDummy(query, "D");
		param = FrameworkUtil.createParam(param, "D", null, null, null, null, null);
		
		PrintUtil.print("MomWidgetController", "removeMap", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		return momService.removeMap(query, param);
	}
	
	// Deprecated...
	@PostMapping("/excel/{query}")
	@Produces   ("application/json; charset=UTF-8")
	public Map<String, Object> excel(
			@RequestParam(value="file", required=false) MultipartFile file, 
			@PathVariable String query,	
			@RequestParam Map<String, Object> param) {
		
		query = FrameworkUtil.removeDummy(query, "C");
		Map<String, Object> param1 = FrameworkUtil.json2Map(param.get("param1").toString());
		Map<String, Object> param2 = FrameworkUtil.json2Map(param.get("param2").toString());
				
		PrintUtil.print("MomWidgetController", "excel", "#", "$", "진입 성공", null, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "query", query, false, false, false, false);		
		PrintUtil.print(null, null, null, "$", "param1", param1, false, false, true, false);
		PrintUtil.print(null, null, null, "$", "param2", param2, false, false, true, false);
		
		return null;
	}
}
