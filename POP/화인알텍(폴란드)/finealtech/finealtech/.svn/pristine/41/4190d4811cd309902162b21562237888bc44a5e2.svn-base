package com.thirautech.mom.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Produces;

import org.springframework.beans.factory.annotation.Autowired;
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
		param = FrameworkUtil.createParam(param);
		
		PrintUtil.print("MomWidgetController", "getMapList", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> result = momService.getMapList(query, param);	
		/*System.out.println("result = " + result.size());*/
		
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
							/*System.out.println("[" + j + "] " + columnToken[j]);*/
							Map<String, Object> map = FrameworkUtil.json2Map(columnToken[j]);
							if(j == 0) {
								map.put("pageId"  , pageId);
								map.put("pageName", pageName);
								map.put("queryId" , queryId);
								map.put("noId"    , noId.equals("true")  ? true : false);
								map.put("editId"  , editId.equals("true")  ? true : false);
								map.put("checkId" , checkId);							
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
				
				//System.out.println("processTran = " + result.get(i).get("processTran"));
				if(result.get(i).get("processTran") != null && result.get(i).get("processTran").toString().length() > 5) {
					String[] columnToken = result.get(i).get("processTran").toString().split("\\},\\{");
					if(columnToken != null && columnToken.length > 0) {
						for(int j = 0; j < columnToken.length; j++) {							
							Map<String, Object> map = FrameworkUtil.json2Map(columnToken[j]);
							map.put("dropDown", map.get("dropDown").toString()/*.replaceAll("#44#", ",")*/);
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
		/*System.out.println("list = " + list.size());*/
		return list;
	}
	
	@PostMapping("/request/{query}/{list}")
	public Map<String, Object> createMapList(@PathVariable String query, @PathVariable String list, @RequestBody List<Map<String, Object>> param) {
		query = FrameworkUtil.removeDummy(query, "C");
		/*param = FrameworkUtil.createParam(param);*/
		
		PrintUtil.print("MomWidgetController", "createMapList", "#", "$", "query", query, true, false, false, false);
		
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		param = FrameworkUtil.createParam(param);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		/*PrintUtil.print(null, null, null, "$", "param", param, false, false, true, true);*/
		
		for(int i = 0; i < param.size(); i++) {
			Map<String, Object> map = param.get(i);
			String key = "columnProperty";
			String value = map.get(key).toString();
			/*System.out.println("#################");
			System.out.println("value1 = " + value);*/
			
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
			/*System.out.println("value2 = " + value);*/
			
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
			/*System.out.println("value3 = " + value);*/
			
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
			/*System.out.println("value4 = " + value);*/
			
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
				/*System.out.println("token1 = " + token1 + "\n token2 = " + token2 + "\n token3 = " + token3);*/
				
				value = token1 + token2 + token3;
				/*System.out.println("value = " + value + "\n");*/
			}
			
			//String value1 = value;
			String[] tokens = value.split(",");
			key1 = "\"dropDown\":\"";
			key2 = "\"dropDown\":";
			/*System.out.println("value5 = " + value);
			System.out.println("tokens.length = " + tokens.length);*/
			if(tokens != null && tokens.length > 0) {
				for(int j = 0; j < tokens.length; j++) {
					if(tokens[j].indexOf(key1) >= 0) {
						String tmp = tokens[j].substring(tokens[j].indexOf(key1) + key1.length());
						String token1 = tokens[j].substring(0, tokens[j].indexOf(key1));
						String token2 = tmp.substring(0, tmp.indexOf("\""));
						String token3 = tmp.substring(tmp.indexOf("\""));
						/*System.out.println("tokens[" + j + "] = " + tokens[j]);
						System.out.println("tmp = " + tmp);
						System.out.println("token1 = " + token1);
						System.out.println("token2 = " + token2);
						System.out.println("token3 = " + token3);
						
						System.out.println("###################3 " + token2);*/
						if(token2.indexOf("?") > 0) {
							token2 = "/mom/request/com.thirautech.mom." + token2.replace("?", ".dummy?");
						} else {
							token2 = "/mom/request/com.thirautech.mom." + token2 + ".dummy";
						}
						
						tokens[j] = token1 + key1 + token2 + token3;
						/*System.out.println("token2 = " + token2);
						System.out.println("value = " + tokens[j]);*/
					}
					
					if(j == 0) {
						value = tokens[j];
					} else {
						value += ("," + tokens[j]);
					}
				}
			}
			
			if(value.indexOf("ACTION") > 0 || value.indexOf("action") > 0) {
				value = value.replaceAll("/mom/request/com.thirautech.mom.", "");
			}
			
			map.put(key, value);
		}
		
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		return momService.createMapList(query, param);
	}
	
	/*@DeleteMapping("/request/{query}")
	public Map<String,Object> removeMap(@PathVariable String query, @RequestBody Map<String,Object> param) {
		query = FrameworkUtil.removeDummy(query, "D");
		param = FrameworkUtil.createParam(param);
		
		PrintUtil.print("MomWidgetController", "removeMap", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		
		return momService.removeMap(query, param);
	}*/
	
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
		
		/*if(1==1) return FrameworkUtil.createResponseMap(param, false);*/
				
		if(file == null || file.isEmpty()) {
			if(file == null) {
				PrintUtil.print("FileController", "excel", "#", "$", "file", "null", true, true, true, false);
			} else {
				PrintUtil.print("FileController", "excel", "#", "$", "file", "empty", true, true, true, false);
			}
			return FrameworkUtil.createResponseMap(param, false);
        }
		
		/*return FrameworkUtil.createResponseMap(param, true);*/
        
		String oldFileName = file.getOriginalFilename();
		
		if(oldFileName.indexOf(param1.get("pageId").toString()) < 0) {
			//System.out.println("fileName = " + oldFileName + ", pageId = " + param1.get("pageId").toString());
			return FrameworkUtil.createResponseMap(param, false, "엑셀 업로드는 양식 파일을 이용해 주십시오.");
		}
		
		File repository = new File(MomLiteral.REPOSITORY_EXCEL);
		if(!repository.exists()) {
			repository.mkdirs();
		}
		
		String newFileName = String.valueOf(AuthManager.getSessionAttribute("divisionCd")) + "_" + oldFileName.substring(0, oldFileName.indexOf(".")) + "_" + System.currentTimeMillis()+ "." + oldFileName.substring(oldFileName.indexOf(".")+1);
		String filePath    = MomLiteral.REPOSITORY_EXCEL + newFileName;
		
		File destFile = new File(filePath);
        try {
        	file.transferTo(destFile);
        } catch(Exception e) {
        	e.printStackTrace();
        	PrintUtil.print("FileController", "excel", "#", "$", "파일을 서버에 저장하다가 오류가 발행하였습니다.", String.valueOf(System.currentTimeMillis()) + "_" + file.getOriginalFilename(), true, true, true, true);
        	try {
	        	if(destFile.exists()){
	        		destFile.delete();
	        	}
        	} catch(Exception e1){
        	}
        	
        	return FrameworkUtil.createResponseMap(param, false);
        }
        
        ExcelReadOption excelReadOption = new ExcelReadOption();
        excelReadOption.setFilePath(destFile.getAbsolutePath());
        excelReadOption.setStartRow(MomLiteral.EXCEL_START_ROW);        
        
        List<Map<String, Object> >excelContent = ExcelRead.read(momService, excelReadOption, param1.get("pageId").toString(), param2);
        if(excelContent == null || excelContent.isEmpty()) {
        	PrintUtil.print("FileController", "excel", "#", "$", "Excel의 데이터가 없습니다.", null, true, true, true, false);
        	try {
	        	if(destFile.exists()){
	        		destFile.delete();
	        	}
        	} catch(Exception e){
        	}
        	
        	return FrameworkUtil.createResponseMap(param, false);
        }
        
        //if(query.indexOf("widgetprop") >= 0) {
        	List<Map<String, Object>> excelContent1 = FrameworkUtil.createParam(excelContent);
        	
        	/*if(excelContent1 == null || excelContent1.isEmpty()) {
            	PrintUtil.print("FileController", "excel", "#", "$", "Excel의 데이터가 없습니다.", null, true, true, true, true);
            	try {
    	        	if(destFile.exists()){
    	        		destFile.delete();
    	        	}
            	} catch(Exception e){
            	}
            	
            	return FrameworkUtil.createResponseMap(param, false);
            }*/
            
            excelContent.clear();
            
	        Map<String, Object> newMap = new HashMap<String, Object>();
	    	/*newMap.put("queryId", param1.get("queryId"));*/
	    	/*newMap.put("columnFixed", param1.get("columnFixed"));*/
	    	
	        String columnProperty = "[";
	        String processTran = "[";
	        int columnFixed = 0;
	        for(int i = 0; i < excelContent1.size(); i++) {
	        	Map<String, Object> oldMap = excelContent1.get(i);
	        	   
	        	String columnProperty1 = "";
	        	String processTran1 = "";
	        	if(i == 0) {
	        		columnProperty1 = "{";
	        	} else {
	        		columnProperty1 = ",{";
	        	}
	        	
	        	if(processTran.equals("[")) {
        			processTran1 = "{";
        		} else {
        			processTran1 = ",{";
        		}
	        	
	        	Iterator<String> iteratorKey = oldMap.keySet().iterator(); 
	        	
	        	int j = 0;
	        	//boolean formatStringExist = false;
	    		while(iteratorKey.hasNext()) {
	    			String key = iteratorKey.next();
	    			String value = oldMap.get(key).toString();
	    			
	    			if(key.indexOf("MESSAGES3") >= 0) {
	    				continue;
	    			}
	    			
	    			if(key.equals("p_err_code") || key.equals("p_err_msg") || key.equals("userId") || key.equals("createBy") || key.equals("updateBy") || key.equals("companyCd") || key.equals("divisionCd")) {
	    				if(i == 0) {
	    					newMap.put(key, value);
	    				}
	    				
	    				continue;
	    			} 
	    			
	    			if(value.equals("")/* || (!key.equals("columnIndex") && value.equals("0"))*/ || value.equals("null")) {
						continue;
					}
	    			
	    			/*if(key.equals("formatString")) {
	    				formatStringExist = true;
	    			}*/
	    			
	    			if(
						(key.equals("editable") && value.equals("0")) ||
						(key.equals("visible") && value.equals("0"))
	    			) {
	    				value = "false";
	    			}
	    			
	    			if(
						(
							key.equals("width") ||
							key.equals("sortIndex") ||
							key.equals("sort") ||
							key.equals("numeric") ||
							key.equals("color") ||
							key.equals("dropDown") ||
							key.equals("message") ||
							key.equals("formatString") ||
							key.equals("filter") ||
							key.equals("excelHide") ||
							key.equals("excelTemplateHide") ||
							key.equals("popUpReq") ||
							key.equals("popUpRead") ||
							key.equals("popUpInit") 
						) && 
							value.equals("0")
					) {
	    				continue;
	    			}
	    			
	    			if(key.equals("columnFixed")) {
	    				if(value.equals("true")) {
	    					columnFixed++;
	    				}
	    				
	    				continue;
	    			} else if(key.equals("sort")) {
	    				value = value.equals("DESC") ? "-1" : "1";
	    			} else  if(key.equals("style")) {
	    				value = value.equals("LEFT") ? "left-column" : (value.equals("RIGHT") ? "right-column" : "");
	    				if(value.equals("") || (!key.equals("columnIndex") && value.equals("0")) || value.equals("null")) {
	    					continue;
	    				}
	    			} else if(key.equals("excelTemplateHide")) {
	    				value = value.equals("사용안함") ? "0" : (value.equals("필수") ? "1" : "2");
	    			} else if(key.equals("popUp")) {
	    				value = value.equals("일반") ? "NORMAL" : 
	    					(value.equals("텍스트") ? "TEXT" :
		    					(value.equals("드롭다운") ? "DROPDOWN" : 
		    						(value.equals("캘린더") ? "CALENDAR" : 
		    							(value.equals("현재날짜") ? "DATE1" :
		    								(value.equals("현재시간") ? "DATE2" : ""
		    									/*(value.equals("읽기전용") ? "READONLY" : ""
		    		    		    	    	)*/
		    		    	    			)
		    	    					)
		    						)
		    					)
		    				);
	    				if(value.equals("")) {
	    					continue;
	    				}
	    			} else if(key.equals("dropDown")) {
	    				if(value.indexOf("?") > 0) {
	    					value = value.replace("?", ".dummy?");
	    				}
	    				
	    				value = "/mom/request/com.thirautech.mom." + value;
	    			}
	    			
	    			if(j == 0) {
	    				if(!value.equals("")) {
	    					if(
								key.equals("columnIndex") ||
								key.equals("width") ||
								key.equals("sortIndex") ||
								key.equals("sort") ||
								key.equals("editable") ||
								key.equals("filter") ||
								key.equals("visible") ||
								key.equals("excelHide") ||
								key.equals("excelTemplateHide") ||
								key.equals("popUpReq") ||
								key.equals("popUpRead") 
	    					) {
	    						columnProperty1 += ("\"" + key + "\":" + value);
	    						processTran1 += ("\"" + key + "\":" + value);
	    					} else {
	    						if(key.equals("formatString")) {
	    							columnProperty1 += ("\"" + key + "\":\"" + value + "\",\"dataType\":\"numeric\"");
	    							processTran1 += ("\"" + key + "\":\"" + value + "\",\"dataType\":\"numeric\"");
	    						} else {
	    							columnProperty1 += ("\"" + key + "\":\"" + value + "\"");
	    							processTran1 += ("\"" + key + "\":\"" + value + "\"");
	    						}
	    					}
	    				}
	    			} else {
	    				if(!value.equals("")) {
	    					if(
								key.equals("columnIndex") ||
								key.equals("width") ||
								key.equals("sortIndex") ||
								key.equals("sort") ||
								key.equals("editable") ||
								key.equals("filter") ||
								key.equals("visible") ||
								key.equals("excelHide") ||
								key.equals("excelTemplateHide") ||
								key.equals("popUpReq") ||
								key.equals("popUpRead") 
	    					) {
	    						columnProperty1 += (",\"" + key + "\":" + value);
	    						processTran1 += (",\"" + key + "\":" + value);
	    					} else {
	    						if(key.equals("formatString")) {
	    							columnProperty1 += (",\"" + key + "\":\"" + value + "\",\"dataType\":\"numeric\"");
	    							processTran1 += (",\"" + key + "\":\"" + value + "\",\"dataType\":\"numeric\"");
	    						} else {
	    							columnProperty1 += (",\"" + key + "\":\"" + value + "\"");
	    							processTran1 += (",\"" + key + "\":\"" + value + "\"");
	    						}
	    					}
	    				}
	    			}
	    			
	    			j++;
	    		}
	    		
	    		/*System.out.println("!!!! columnProperty1 = " + columnProperty1);*/
	    		if(columnProperty1.indexOf("formatString") < 0) {
	    			if(columnProperty1.indexOf(",\"dataType\":\"numeric\"") >= 0) {
	    				/*System.out.println("#### before = " + columnProperty1);*/
	    				columnProperty1 = columnProperty1.replace(",\"dataType\":\"numeric\"", "");
	    				/*System.out.println("#### after = " + columnProperty1);*/
	    			} else if(columnProperty1.indexOf("{\"dataType\":\"numeric\"") >= 0) {
	    				/*System.out.println("@@@@ before = " + columnProperty1);*/
	    				columnProperty1 = columnProperty1.replace("{\"dataType\":\"numeric\"", "{");
	    				/*System.out.println("@@@@ after = " + columnProperty1);*/
	    			}
	    		}
	    		
	    		columnProperty1 += "}";
	    		processTran1 += "}";
	    		/*System.out.println("columnProperty = " + columnProperty1);*/
	    		
	    		if(columnProperty1.indexOf("ACTION") > 0 || columnProperty1.indexOf("ACTION") > 0) {
	    			columnProperty1 = "";
	    			processTran += processTran1;
	    		} else {
	    			processTran1 = "";
	    			columnProperty += columnProperty1;
	    		}
	        }
	        columnProperty += "]";
	        if(processTran.length() == 1) {
	        	processTran = "";
	        } else {
	        	processTran += "]";
	        	newMap.put("processTran", processTran);
	        }
	        
	        newMap.put("pageId", param1.get("pageId").toString());
	        newMap.put("pageName", param1.get("pageName").toString());
	        newMap.put("columnProperty", columnProperty);
	        newMap.put("gridProperty", "{" + param1.get("gridProperty").toString().replaceAll("#22#", "\"").replaceAll("#44#", ",") + ",\"columnFixed\":" + columnFixed + "}");
	        
	        
	        excelContent.add(newMap);   
        /*} else {
        	List<Map<String, Object>> excelContent1 = FrameworkUtil.createParam(excelContent);
        	
        	excelContent.clear();
            
	        Map<String, Object> newMap = new HashMap<String, Object>();
	    	String columnProperty = "[";
	        for(int i = 0; i < excelContent1.size(); i++) {
	        	Map<String, Object> oldMap = excelContent1.get(i);
	        	   
	        	String columnProperty1 = "";
	        	if(i == 0) {
	        		columnProperty1 = "{";
	        	} else {
	        		columnProperty1 = ",{";
	        	}
	        	
	        	Iterator<String> iteratorKey = oldMap.keySet().iterator(); 
	        	
	        	int j = 0;
	        	//boolean formatStringExist = false;
	    		while(iteratorKey.hasNext()) {
	    			String key = iteratorKey.next();
	    			String value = oldMap.get(key).toString();
	    			
	    			if(key.equals("p_err_code") || key.equals("p_err_msg") || key.equals("userId") || key.equals("createBy") || key.equals("updateBy") || key.equals("companyCd") || key.equals("divisionCd")) {
	    				if(i == 0) {
	    					newMap.put(key, value);
	    				}
	    				
	    				continue;
	    			} 
	    			
	    			if(value.equals("") || value.equals("null")) {
						continue;
					}
	    			
	    			if(key.equals("inputType")) {
	    				value = value.equals("입력상자") ? "NORMAL" : 
	    					(value.equals("드롭다운") ? "DROPDOWN" : ""
		    				);
	    				if(value.equals("")) {
	    					continue;
	    				}
	    			} 
	    			
	    			if(j == 0) {
	    				if(!value.equals("")) {
	    					if(
								key.equals("columnIndex") 
	    					) {
	    						columnProperty1 += ("\"" + key + "\":" + value);
	    					} else {
	    						columnProperty1 += ("\"" + key + "\":\"" + value + "\"");
	    					}
	    				}
	    			} else {
	    				if(!value.equals("")) {
	    					if(
								key.equals("columnIndex") 
	    					) {
	    						columnProperty1 += (",\"" + key + "\":" + value);
	    					} else {
	    						columnProperty1 += (",\"" + key + "\":\"" + value + "\"");
	    					}
	    				}
	    			}
	    			
	    			j++;
	    		}
	    		
	    		columnProperty1 += "}";
	    		
	    		columnProperty += columnProperty1;
	        }
	        columnProperty += "]";
	        
	        newMap.put("pageId", param1.get("pageId").toString());
	        newMap.put("pageName", param1.get("pageName").toString());
	        newMap.put("columnProperty", columnProperty);
	        
	        excelContent.add(newMap);
        }*/
        
        PrintUtil.print(null, null, null, "$", "excelContent", excelContent, false, false, true, false);
        Map<String, Object> result = momService.createMapList(query, excelContent);        
        
        try {
        	if(destFile.exists()){
        		destFile.delete();
        	}
    	} catch(Exception e){
    	}
        
        return result;
	}
}
