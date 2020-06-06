package com.thirautech.mom.controller;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Produces;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.thirautech.framework.security.manager.AuthManager;
import com.thirautech.mom.literal.MomLiteral;
import com.thirautech.mom.service.MomService;
import com.thirautech.mom.util.B2BIUtil;
import com.thirautech.mom.util.FrameworkUtil;
import com.thirautech.mom.util.PrintUtil;
import com.thirautech.mom.util.excel.ExcelRead;
import com.thirautech.mom.util.excel.ExcelReadOption;

@RestController
@RequestMapping("/file")
public class FileController {
	@Autowired
	private MomService momService;
	
	@PostMapping("/excel/{query}")
	@Produces  ("application/json; charset=UTF-8")
	public Map<String, Object> excel(
			@RequestParam(value="file", required=false) MultipartFile file, 
			@PathVariable String query,			
			@RequestParam Map<String, Object> page, 
			@RequestParam Map<String, Object> param1) {
		
		query = FrameworkUtil.removeDummy(query, "C");
		String codePage = page.get("page").toString();
		/*List<Map<String, Object>>code = FrameworkUtil.json2Map(param.get("param").toString());*/
				
		PrintUtil.print("FileController", "excel", "#", "$", "진입 성공", null, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "query", query, false, false, false, true);
		PrintUtil.print(null, null, null, "$", "codePage", codePage, false, false, false, true);
		Map<String, Object> headerInfo = FrameworkUtil.json2Map(param1.get("headerInfo").toString());
		PrintUtil.print(null, null, null, "$", "headerInfo", headerInfo, false, false, true, true);
		Map<String, Object> param = FrameworkUtil.json2Map(param1.get("param").toString());
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, true);
		
		// param1 은 argument
		// param1 -> headerInfo 은 엑셀 등록을 위한 header 정보, 순서 및 dataField
		// param1 -> param 은 엑셀 데이터 외, 엑셀 업로드시 넘기는 parameter
		
		if(file == null || file.isEmpty()) {
			if(file == null) {
				PrintUtil.print("FileController", "excel", "#", "$", "file", "null", true, true, true, true);
			} else {
				PrintUtil.print("FileController", "excel", "#", "$", "file", "empty", true, true, true, true);
			}
			return FrameworkUtil.createResponseMap(headerInfo, false);
        }
        
		String oldFileName = "";
		try{
			oldFileName = URLDecoder.decode(file.getOriginalFilename(), StandardCharsets.UTF_8.name());
		} catch(Exception e) {
			// 파일 이름을 변환할 수 없습니다.
			return FrameworkUtil.createResponseMap(headerInfo, false, "MESSAGES20026");

		}
		
		if(oldFileName == null || oldFileName.equals("") || oldFileName.indexOf(codePage) < 0) {
			//return FrameworkUtil.createResponseMap(headerInfo, false, "해당 화면의 엑셀양식과 다릅니다. 양식 확인 후 업로드 해주세요.");
			return FrameworkUtil.createResponseMap(headerInfo, false, "MESSAGES20010+MESSAGES20024");
		}
		
		if(oldFileName.indexOf("MOMBA002") >= 0 || oldFileName.indexOf("MOMBA003") >= 0 || oldFileName.indexOf("MOMBA005") >= 0) {
			if(param != null) {
				codePage = param.get("uploadType").toString();
			}
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
        	PrintUtil.print("FileController", "excel", "#", "$", "파일을 서버에 저장하다가 오류가 발행하였습니다.", oldFileName, true, true, true, true);
        	try {
	        	if(destFile.exists()){
	        		destFile.delete();
	        	}
        	} catch(Exception e1){
        	}
        	
        	return FrameworkUtil.createResponseMap(headerInfo, false, "MESSAGES20009@" + oldFileName);
        }
        
        ExcelReadOption excelReadOption = new ExcelReadOption();
        excelReadOption.setFilePath(destFile.getAbsolutePath());
        excelReadOption.setStartRow(MomLiteral.EXCEL_START_ROW);        
        
        List<Map<String, Object>>excelContent = ExcelRead.read(momService, excelReadOption, codePage, headerInfo);
        if(excelContent == null || excelContent.isEmpty()) {
        	PrintUtil.print("FileController", "excel", "#", "$", "Excel의 데이터가 없습니다.", null, true, true, true, true);
        	try {
	        	if(destFile.exists()){
	        		destFile.delete();
	        	}
        	} catch(Exception e){
        	}
        	
        	return FrameworkUtil.createResponseMap(headerInfo, false, "MESSAGES20001");
        }
        excelContent = FrameworkUtil.createParam(excelContent);
        /*if(excelContent == null || excelContent.isEmpty()) {
        	PrintUtil.print("FileController", "excel", "#", "$", "Excel의 데이터가 없습니다.", null, true, true, true, true);
        	try {
	        	if(destFile.exists()){
	        		destFile.delete();
	        	}
        	} catch(Exception e){
        	}
        	
        	return FrameworkUtil.createResponseMap(headerInfo, false, "MESSAGES20001");
        }*/
        
        /*System.out.println("#### Excel Contents = " + excelContent);
        if(oldFileName.indexOf("MOM_LANG") >= 0) {
        	for(int i = 0; i < excelContent.size(); i++) {
        		Iterator<String> iteratorKey = excelContent.get(i).keySet().iterator(); 
        		while (iteratorKey.hasNext()) {
        			String key = iteratorKey.next();
        			System.out.println("\n#### key = " + key + ", value = " +  excelContent.get(i).get(key));
        			if(key.indexOf("MESSAGES3") >= 0) {
        				excelContent.get(i).remove(key);
        			}
        			System.out.println("@@@@ key = " + key + ", value = " +  excelContent.get(i).get(key));
        		}
        	}
        }*/
        
        if(oldFileName.indexOf("USER_MOM") >= 0) {
        	for(int i = 0; i < excelContent.size(); i++) {
        		excelContent.get(i).put("password", FrameworkUtil.passwordEncription(excelContent.get(i).get("password").toString()));
        	}
        }
        
        if(query.indexOf("materialPrice") > 0 || query.indexOf("costPrice") > 0 ) {
    		String preFix = query.substring(0, query.lastIndexOf("."));
    		String postFix = query.indexOf("materialPrice") > 0 ? "materialPrice" : "costPrice";
    		String inoutFlag = "";
    		
    		if(param != null) {
    			inoutFlag = param.get("inoutFlag").toString();
    		}
    		
        	for(int i = 0; i < excelContent.size(); i++) {
        		excelContent.get(i).put("inoutFlag", inoutFlag);
        	}
        	excelContent.get(0).put("cudFlag", "D");
        	
        	Map<String, Object> tmpResult = momService.removeMap(preFix + ".remove_" + postFix + "Temp", excelContent.get(0));
        	if(tmpResult.get("result").toString().equals("fail")) {
        		try {
    	        	if(destFile.exists()){
    	        		destFile.delete();
    	        	}
            	} catch(Exception e){
            	}
        		if(tmpResult.get("p_err_msg") == null || "".equals(tmpResult.get("p_err_msg"))) {
            		tmpResult.put("p_err_code", "E");
            		tmpResult.put("p_err_msg", "MESSAGES20008@MESSAGES20023+MESSAGES20026");        			
        		} 
        		return tmpResult;
        	}
        	
        	for(int i = 0; i < excelContent.size(); i++) {
        		excelContent.get(i).put("cudFlag", "C");
        	}
        	
        	tmpResult = momService.upsertMapList(preFix + ".create_" + postFix + "Temp", excelContent);
        	if(tmpResult.get("result").toString().equals("fail")) {
        		try {
    	        	if(destFile.exists()){
    	        		destFile.delete();
    	        	}
            	} catch(Exception e){
            	}
        		if(tmpResult.get("p_err_msg") == null || "".equals(tmpResult.get("p_err_msg"))) {
            		/*tmpResult.put("p_err_code", "E");
            		tmpResult.put("p_err_msg", "등록 중 오류 발생하였습니다.관리자에게 문의하세요.");*/
        			
        			return FrameworkUtil.createResponseMap(tmpResult, false, "MESSAGES20004+MESSAGES20026");
        		} 
        		
        		return tmpResult;
        	}
        	
        	/*result = momService.createMapList(query, excelContent);*/
	    } else if(query.indexOf("standardPrice") > 0) { 
	    	String preFix = query.substring(0, query.lastIndexOf("."));
    		String postFix = "standardPrice";
    		String priceType = "";
    		
    		if(param != null) {
    			priceType = param.get("priceType").toString();
    		}
    		
        	for(int i = 0; i < excelContent.size(); i++) {
        		excelContent.get(i).put("priceType", priceType);
        	}
        	excelContent.get(0).put("cudFlag", "D");
        	
        	Map<String, Object> tmpResult = momService.removeMap(preFix + ".remove_" + postFix + "Temp", excelContent.get(0));
        	if(tmpResult.get("result").toString().equals("fail")) {
        		try {
    	        	if(destFile.exists()){
    	        		destFile.delete();
    	        	}
            	} catch(Exception e){
            	}
        		if(tmpResult.get("p_err_msg") == null || "".equals(tmpResult.get("p_err_msg"))) {
            		tmpResult.put("p_err_code", "E");
            		tmpResult.put("p_err_msg", "MESSAGES20008@MESSAGES20023+MESSAGES20026");        			
        		} 
        		return tmpResult;
        	}
        	
        	for(int i = 0; i < excelContent.size(); i++) {
        		excelContent.get(i).put("cudFlag", "C");
        	}
        	
        	tmpResult = momService.upsertMapList(preFix + ".create_" + postFix + "Temp", excelContent);
        	if(tmpResult.get("result").toString().equals("fail")) {
        		try {
    	        	if(destFile.exists()){
    	        		destFile.delete();
    	        	}
            	} catch(Exception e){
            	}
        		if(tmpResult.get("p_err_msg") == null || "".equals(tmpResult.get("p_err_msg"))) {
            		/*tmpResult.put("p_err_code", "E");
            		tmpResult.put("p_err_msg", "임시테이블 등록 중 오류 발생하였습니다.관리자에게 문의하세요.");*/
        			
        			tmpResult = FrameworkUtil.createResponseMap(tmpResult, false, "MESSAGES20008@MESSAGES20022+MESSAGES20026");
        		}
        		
        		return tmpResult;
        	}
	    } else if(query.indexOf("materialOrderUpload") > 0) {
	    	for(int i = 0; i < excelContent.size(); i++) {
        		excelContent.get(i).put("orderType", "MANUAL");
        		excelContent.get(i).put("seq", String.valueOf(i+1));
        	}
	    } else if(query.indexOf("planningUpload") > 0) {
	    	String planDate = "";
	    	
	    	if(param != null) {
    			planDate = param.get("planDate").toString();
    		}
    		
        	for(int i = 0; i < excelContent.size(); i++) {
        		excelContent.get(i).put("planDate", planDate);
        		// 2018.12..31 hyjeong begin
        		Iterator<String> iteratorKey =  excelContent.get(i).keySet().iterator(); 
        		
        		String attr1 = "";
    			while (iteratorKey.hasNext()) {
    				String key = iteratorKey.next();
    				if(key.indexOf("/") > 0 && excelContent.get(i).get(key).toString().length() > 0) {
    					if(attr1.length() == 0) {
    						attr1 = key + ":" + excelContent.get(i).get(key).toString();
    					} else {
    						attr1 += ("," + key + ":" + excelContent.get(i).get(key).toString());
    					}
    				}
    			}
    			
    			if(attr1.length() > 0) {
    				excelContent.get(i).put("attr1", attr1);
    			}
        		// 2018.12..31 hyjeong end
        	}
	    } /* else if(query.indexOf("materialOrderUpload") > 0) {
	    	for(int i = 0; i < excelContent.size(); i++) {
        		excelContent.get(i).put("seq", String.valueOf(i+1));
        	}
	    } */ /*else{
	    }
	    	result = momService.createMapList(query, excelContent);
	      }*/
        
        Map<String, Object> result = new HashMap<String, Object>();
        
        if(query.indexOf("standardPrice") > 0 || query.indexOf("materialPrice") > 0 || query.indexOf("costPrice") > 0) {
        	result = momService.createMap(query, excelContent.get(0));
        } else {
        	result = momService.createMapList(query, excelContent);
        }
        
        if(oldFileName.indexOf("MOM_LANG") >= 0) {
        	for(int i = 0; i < excelContent.size(); i++) {
        		excelContent.get(i).put("locale", param.get("locale"));
        		excelContent.get(i).put("localeValue", param.get("localeValue"));
        		excelContent.get(i).put("toLang", excelContent.get(i).get("fromLang"));
        	}
        	
        	result = momService.createMapList(query, excelContent);
        }
        
        if(result.get("p_err_msg") == null || "".equals(result.get("p_err_msg").toString())) {
        	result.put("p_err_code", "E");
        	result.put("p_err_msg", "MESSAGES20004+MESSAGES20026");
        } 
        
        try {
        	if(destFile.exists()){
        		destFile.delete();
        	}
    	} catch(Exception e){
    	}
        
        return result;
	}
	
	@PostMapping("/attach/{query}")
	@Produces  ("application/json; charset=UTF-8")
	public Map<String, Object> attach(
			@RequestParam(value="file", required=false) MultipartFile attach, 
			@PathVariable String query,	
			@RequestParam String entityName,
			@RequestParam String entityId,			
			@RequestParam Map<String, Object> param) {
		
		query = FrameworkUtil.removeDummy(query, "C");
		param = FrameworkUtil.createParam(param);
		
		PrintUtil.print("FileController", "attach", "#", "$", "진입 성공", null, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "query", query, false, false, false, true);
		PrintUtil.print(null, null, null, "$", "entityId", entityId, false, false, true, true);
				
		if(attach == null || attach.isEmpty()) {
			if(attach == null) {
				PrintUtil.print("FileController", "attach", "#", "$", "file", "null1", true, true, true, true);
			} else {
				PrintUtil.print("FileController", "attach", "#", "$", "file", "empty1", true, true, true, true);
			}
			return FrameworkUtil.createResponseMap(param, false);
        }
        
		File repository = new File(MomLiteral.REPOSITORY_ATTACH);
		if(!repository.exists()) {
			repository.mkdirs();
		}
		
		String oldFileName = "";		
		try{
			oldFileName = URLDecoder.decode(attach.getOriginalFilename(), StandardCharsets.UTF_8.name());
		} catch(Exception e) {
			return FrameworkUtil.createResponseMap(param, false, "MESSAGES20026");
		}
		
		if(oldFileName == null || oldFileName.equals("")) {
			// 파일 이름을 변환할 수 없습니다.
			return FrameworkUtil.createResponseMap(param, false, "MESSAGES20026");
		}
		
		String newFileName = String.valueOf(AuthManager.getSessionAttribute("divisionCd")) + "_" + oldFileName.substring(0, oldFileName.indexOf(".")) + "_" + System.currentTimeMillis()+ "." + oldFileName.substring(oldFileName.indexOf(".")+1);
		String filePath    = MomLiteral.REPOSITORY_ATTACH;
		
		File destFile = new File(filePath + newFileName);
        try {
        	attach.transferTo(destFile);
        } catch(Exception e) {
        	e.printStackTrace();
        	PrintUtil.print("FileController", "attach", "#", "$", "파일을 서버에 저장하다가 오류가 발행하였습니다.", oldFileName, true, true, true, true);
        	
        	return FrameworkUtil.createResponseMap(param, false, "MESSAGES20009@" + oldFileName);
        }
        
        long   fileSize    = attach.getSize();
        
        if(param == null) {
        	param = new HashMap<String, Object>();
        }
        
        List<Map<String, Object>> sequence = momService.getMapList("com.thirautech.mom.common.get_comSequence_list", param);
        if(sequence.isEmpty()) {
        	PrintUtil.print("FileController", "attach", "#", "$", "시퀀스를 채번할 수 없습니다.", null, true, true, true, true);
        	
        	return FrameworkUtil.createResponseMap(param, false, "MESSAGES20006");
        }
        
        param.put("fileId"     , sequence.get(0).get("sequence").toString());
        param.put("entityId"   , entityId);
        param.put("entityName" , entityName);
        param.put("oldFileName", oldFileName);
		param.put("newFileName", newFileName);
		param.put("filePath"   , filePath);
		param.put("fileSize"   , fileSize   );
		
        return momService.upsertMap(query, param);
	}
	
	@GetMapping("/download/{query}")
	@Produces  ("application/json; charset=UTF-8")
	/*@ExceptionHandler(Exception.class)*/ 
	public ResponseEntity<Resource> download(
			HttpServletRequest request,
			@PathVariable String query,
			@RequestParam String entityId,
			@RequestParam String entityName,
			@RequestParam String fileName) {
		
		query = FrameworkUtil.removeDummy(query, "R");
		
		Map<String, Object>param = FrameworkUtil.createResponseMap(null, true);
		param = FrameworkUtil.createParam(param);
		
		param.put("entityId", entityId);
		param.put("entityName", entityName);
		if(fileName != null && fileName.length() > 0) {
			param.put("download", "Y");
			param.put("fileName", fileName);
		}
		
		PrintUtil.print("FileController", "download", "#", "$", "진입 성공", null, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "query", query, false, true, true, true);
		PrintUtil.print(null, null, null, "$", "param", param, false, true, true, true);
		
		List<Map<String, Object>> result = momService.getMapList(query, param);
		if(result.isEmpty()) {
			PrintUtil.print(null, null, null, "$", "다운로드 할 파일이 없습니다.", null, false, true, true, true);
			return null;
		}
		
		Resource resource = null;
		String oldFileName = result.get(0).get("oldFileName").toString();
		String newFileName = result.get(0).get("newFileName").toString();
		String filePath = result.get(0).get("filePath").toString(); 
		String contentType = null;
		try {
			/*Path filePath = Paths.get(MomLiteral.REPOSITORY_ATTACH).toAbsolutePath().normalize().resolve(newFileName).normalize();*/
			Path filePathP = Paths.get(filePath + newFileName);
			resource = new UrlResource(filePathP.toUri());
            contentType = request.getServletContext().getMimeType(((UrlResource) resource).getFile().getAbsolutePath()) == null ? "application/octet-stream" : request.getServletContext().getMimeType(((UrlResource) resource).getFile().getAbsolutePath());
        } catch (Exception e) {
            e.printStackTrace();
            PrintUtil.print(null, null, null, "$", "다운로드 할 파일을 부를 수 없습니다.", oldFileName, false, true, true, true);
        	
            return null;
        }
		
        PrintUtil.print(null, null, null, "$", contentType, HttpHeaders.CONTENT_DISPOSITION + "=attachment; filename=\"" + ((UrlResource) resource).getFilename() + "\"", false, true, false, true);
        
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + oldFileName + "\";")
                .body(resource);
	}
	
	/**
	 * B2BI xml 파일 데이터 업로드
	 * @param query
	 * @param param
	 * @return
	 */
	@PostMapping("/B2BIXml/{query}")
	@Produces  ("application/json; charset=UTF-8")
	public Map<String, Object> B2BIXml(
			@PathVariable String query,	
			@RequestParam Map<String, Object> param) {
		query = FrameworkUtil.removeDummy(query, "C");
		Map<String, Object> resultMap = new HashMap <String, Object> ();
		int cnt = 0;
		
		String strDate;
		String workDate;
		
        Calendar oCalendar = Calendar.getInstance(); // 현재 날짜/시간 등의 각종 정보 얻기
        String str1 = "" + oCalendar.get(Calendar.YEAR);
        String str2 = "" + (oCalendar.get(Calendar.MONTH) + 1);
        String str3 = "" + oCalendar.get(Calendar.DAY_OF_MONTH);
        String str4 = Integer.parseInt(str2) > 9 ? str2 : "0" + str2;
        String str5 = Integer.parseInt(str3) > 9 ? str3 : "0" + str3;
        
        strDate = str1 + str4 + str5;
        workDate = str1 +"-"+ str4 +"-"+ str5;
		
		param.put("workDate", workDate);
		
		String vendorSiteCd = "";
		if(param.get("vendorSiteCd") != null) {
			vendorSiteCd = (String) param.get("vendorSiteCd");
		}
		
		String b2biType = (String)param.get("b2biType");
		
		PrintUtil.print("FileController", "B2BIXml", "#", "$", "진입 성공", null, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "query", query, false, false, false, true);
		
		List list = null;
		
		String path = MomLiteral.REPOSITORY_B2BI;
		String movePath = MomLiteral.REPOSITORY_B2BI_BACK;
		
        File dirFile = new File(path);
        if(!dirFile.exists()) {
        	dirFile.mkdirs();
		}
        
        File moveFile = new File(movePath);
        if(!moveFile.exists()) {
        	moveFile.mkdirs();
		}
        
        File b2biFile;
        
        File[] fileList = dirFile.listFiles();
        String[] fileNames;
        String fileName1 = "";
        String fileName2 = "";
        
        if (fileList != null) {
        	for (int i = 0; i < fileList.length; i++) {
        		String tempFileName = fileList[i].getName();
        		b2biFile = new File(path + tempFileName);
        		
        		fileNames = tempFileName.split("_");
        		fileName1 = fileNames[0];
        		fileName2 = fileNames[1];
        		
    			if (tempFileName.indexOf(strDate) > 0) {
					try {
						// B2BI 화면별 해당되는 xml 파일만 실행 
						if(b2biType.equals(fileName2)) {
							// PO, 출발, 입고 정보는 업체코드(vendor site cd)별로 xml 입력
							if (fileName1.equals(vendorSiteCd)) {
    							// PO, 출발, 입고 별 선택한 파일만 입력
								list = B2BIUtil.listXmlDmz(path + tempFileName, param);
	    						for (int j = 0; j < list.size(); j++) {
	                                Map<String, Object> map = (Map<String, Object>) list.get(j);
	                                resultMap = momService.createMap(query, map);
	                            }
	    						cnt ++;
	    						// 사용한 파일은 BackUp 폴더로 이동
	    						FileUtils.moveFileToDirectory(b2biFile, moveFile, false);
							} else {
								// 생산계획은 당일 파일 이동처리 안함.
								if (fileName1.length() == 3) {
									// 생산계획 정보 xml 입력
									param.put("orgCode", fileName1);
		    						list = B2BIUtil.listXmlDmz(path + tempFileName, param);
		    						for (int j = 0; j < list.size(); j++) {
		                                Map<String, Object> map = (Map<String, Object>) list.get(j);
		                                resultMap = momService.createMap(query, map);
		                            }
		    						cnt ++;
								} else {
									// 스케줄러는 vendorSiteCd 없으므로 전체 실행
									if(param.get("schedulerFlag") != null) {
										// PO, 출발, 입고 별 선택한 파일만 입력
										list = B2BIUtil.listXmlDmz(path + tempFileName, param);
			    						for (int j = 0; j < list.size(); j++) {
			                                Map<String, Object> map = (Map<String, Object>) list.get(j);
			                                resultMap = momService.createMap(query, map);
			                            }
			    						cnt ++;
			    						// 사용한 파일은 BackUp 폴더로 이동
			    						FileUtils.moveFileToDirectory(b2biFile, moveFile, false);
									}
								}
							}
						}
					} catch(Exception e) {
						e.printStackTrace();
			            PrintUtil.print(null, null, null, "$", "XML 파일을 읽을 수 없습니다.", tempFileName, false, true, true, true);
			            /*resultMap.put("err_code", "E");
			            resultMap.put("err_msg", "XML 파일을 읽을 수 없습니다.");*/
			            
			            return FrameworkUtil.createResponseMap(resultMap, false, "MESSAGES20003");
					}
    				
    			} else {
    				// 과거 파일은 BackUp 폴더로 이동
    				try {
    					FileUtils.moveFileToDirectory(b2biFile, moveFile, false);
    				}catch(Exception e) {
						e.printStackTrace();
			            PrintUtil.print(null, null, null, "$", "XML 파일을 이동 할 수 없습니다.", tempFileName, false, true, true, true);
			            /*resultMap.put("err_code", "E");
			            resultMap.put("err_msg", "XML 파일을 이동 할 수 없습니다.");*/
			            
			            return FrameworkUtil.createResponseMap(resultMap, false, "MESSAGES20002");
					}
    				
    			}
        	}
        }
        
        if (cnt > 0) {
			/*resultMap.put("err_code", "S");
			resultMap.put("err_msg", "성공하였습니다.");*/
        	
        	return FrameworkUtil.createResponseMap(resultMap, true, "MESSAGES20005");
		} /*else {
			resultMap.put("err_code", "E");
			resultMap.put("err_msg", "현행화 할 XML 파일이 없습니다.");
		}*/
        
        return FrameworkUtil.createResponseMap(resultMap, false, "MESSAGES20011");
	}
	
	/**
	 * 레포트관리 excel 양식 base64로 코드 변환해서 DB 입력
	 * @param file
	 * @param query
	 * @param param
	 * @return
	 */
	@PostMapping("/report/{query}")
	@Produces  ("application/json; charset=UTF-8")
	public Map<String, Object> report(
			@RequestParam(value="file", required=false) MultipartFile file,
			@PathVariable String query,			
			@RequestParam Map<String, Object> param) {
		Map<String, Object> result = new HashMap<String, Object>();
		String crud = "";
		
		param = FrameworkUtil.jsonDataMap(param.get("param").toString());
		param = FrameworkUtil.createParam(param);
		
		if(param.get("crudType") != null ) {
			crud = param.get("crudType").toString();
		} else {
			PrintUtil.print("FileController", "excel", "#", "$", "crudType", "crudType is null", true, true, true, true);
			return result;
		}
		
		// 최초 등록일 때만 파일여부 체크. 수정, 삭제일 때는 파일 없어도 됨.
		if(crud.equals("C") && (file == null || file.isEmpty())) {
			if(file == null) {
				PrintUtil.print("FileController", "excel", "#", "$", "file", "null", true, true, true, true);
			} else {
				PrintUtil.print("FileController", "excel", "#", "$", "file", "empty", true, true, true, true);
			}
			return FrameworkUtil.createResponseMap(param, false);
        }
		
		// 엑셀양식을 base64 코드로 변환하여 clob 형태로 DB에 입력
		Base64 base64Encoder = new Base64();
		
		try {
			String strBase64 = "";
			
			// file 값 있을 때만 코드 변환.
			if(file != null && !file.isEmpty()) {
				strBase64 = base64Encoder.encodeToString(file.getBytes());
			}
			param.put("excelFile", strBase64);
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		query = FrameworkUtil.removeDummy(query, crud);
		
		PrintUtil.print("FileController", "excel", "#", "$", "진입 성공", null, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "query", query, false, false, false, true);
		
		if(crud.equals("C")) {
			result = momService.createMap(query, param);
		} else if (crud.equals("U")) {
			result = momService.modifyMap(query, param);
		} else if (crud.equals("D")) {
			result = momService.removeMap(query, param);
		} 
		
        return result;
	}
	
	/**
	 * 환율 API 조회하여 환율 DB 입력
	 * @param query
	 * @param param
	 * @return
	 */
	@PostMapping("/exchange/{query}")
	@Produces  ("application/json; charset=UTF-8")
	public Map<String, Object> exchange(
			@PathVariable String query,	
			@RequestParam Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String, Object> exApiMap = new HashMap<String, Object>();
		Map<String, Object> exCurrencyMap = new HashMap<String, Object>();
		List<Map<String, Object>> resultDivisionList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> exApiList = new ArrayList<Map<String, Object>>();
		String strExchange = "";

		Calendar oCalendar = Calendar.getInstance(); // 현재 날짜/시간 등의 각종 정보 얻기
		String str1 = "" + oCalendar.get(Calendar.YEAR);
		String str2 = "" + (oCalendar.get(Calendar.MONTH) + 1);
		String str3 = "" + oCalendar.get(Calendar.DAY_OF_MONTH);
		String str4 = Integer.parseInt(str2) > 9 ? str2 : "0" + str2;
		String str5 = Integer.parseInt(str3) > 9 ? str3 : "0" + str3;

		String startDate = str1 + "-" + str4 + "-" + str5;
		String exchangeStr = "";
		
		// 스케줄러 실행 아니면 세션 값 사용
		if(param.get("schedulerFlag") == null) {
			param = FrameworkUtil.createParam(param);
		} 
		
		// 접속 된 DB에서 사용중인 Division Cd 및 기본 환종(화폐) 조회
		String queryTmp0 = FrameworkUtil.removeDummy("com.thirautech.mom.common.siteList.dummy", "R");
		resultDivisionList = momService.getMapList(queryTmp0, param);
		
		PrintUtil.print("FileController", "exchange", "#", "$", "진입 성공", null, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "query", query, false, false, false, true);
		
		for(int k=0; k<resultDivisionList.size(); k++) {
			Map<String, Object> divisionMap = resultDivisionList.get(k);
			param.put("divisionCd", divisionMap.get("divisionCd"));
			param.put("companyCd", divisionMap.get("companyCd"));
			param.put("startDate", startDate);
			param.put("updateBy", "SYSTEM");
			
			// 사용중인 환율API 조회
			String queryApi = FrameworkUtil.removeDummy("com.thirautech.mom.common.specifyCode.dummy", "R");
			param.put("codeClassId", "EXCHANGE_API");
			List<Map<String, Object>> resultExApiList = momService.getMapList(queryApi, param);
			
			if(resultExApiList.size() < 1) {
				PrintUtil.print(null, null, null, "$", "환율API가 설정되어 있지 않습니다.", null, false, true, true, true);
				return FrameworkUtil.createResponseMap(resultMap, false, "MESSAGES20029");
			}
			
			// EXCHANGE_API로 등록 된 첫번째 조회되는 API의 URL 사용
			String urlStr = "";
			String apiCode = resultExApiList.get(0).get("code").toString();
			
			// 사용중인 외화 조회
			String queryTmp1 = FrameworkUtil.removeDummy("com.thirautech.mom.common.comCurrencyCode.dummy", "R");
			List<Map<String, Object>> resultCurrencyList = momService.getMapList(queryTmp1, param);

			try { // API 호출방식 변경 - 181206 
				// Code 값에 따라 하나외환은행API 또는 한국수출입은행API 사용하는 것으로 변경 - 190524
				// KEBHANA : 하나외환은행, KOREAEXIM : 한국수출입은행
				if(apiCode.equals("KEBHANA")) {
					urlStr = "https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=";
					String strCurrency = "FRX.KRW";
					String strExCurrency = "";
					
					for (int i = 0; i < resultCurrencyList.size(); i++) {
						exCurrencyMap = resultCurrencyList.get(i);
						strExCurrency = exCurrencyMap.get("code").toString();
		
						// 기본+외화 환종 = KRWUSD, KRWJPY 등으로 API 값 중 원하는 외화 환율 조회
						if(i == 0) {
							exchangeStr = strCurrency + strExCurrency;
						} else {
							exchangeStr = exchangeStr + "," + strCurrency + strExCurrency;
						}
					}
				} else {
					// authkey : 한국수출입은행에서 제공하는 인증키, AP01 : 환율정보
					urlStr = "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=";
					exchangeStr = "sWMcmOBnfBLrTwtxz66t4audQ52ftQ2S&data=AP01";
				}
				
				URL url = new URL(urlStr + exchangeStr);

				HttpURLConnection conn = (HttpURLConnection) url.openConnection();

				// 요청 방식 설정 ( GET or POST or .. 별도로 설정하지않으면 GET 방식 )
				conn.setRequestMethod("GET");

				// 응답 내용(BODY) 구하기
				try (InputStream in = conn.getInputStream(); 
						ByteArrayOutputStream out = new ByteArrayOutputStream()) {

					byte[] buf = new byte[1024 * 8];
					int length = 0;
					while ((length = in.read(buf)) != -1) {
						out.write(buf, 0, length);
					}
					// API 응답 값 = "USDKRW":[1135.31,1.1600342,0.10228225,1134.15,1134.6,1133.4,1136.5]
					// USD 를 KRW 로 환전 시 [Now, Changes, Changes percent, Previous Close, Open, Day’s Range Min, Day’s Range Max]
					strExchange = new String(out.toByteArray(), "UTF-8");

					// 환율 API 응답값이 json이므로 List 형식으로 변환
					exApiList = FrameworkUtil.json2List(strExchange);
					
					String currencyCd = "";
					Double unitPrice = 0.0;
					
					if(apiCode.equals("KEBHANA")) {
						// 하나외환은행은 url 호출 할 때 환종을 넘겨서 그 환종에 대한 환율 정보만 조회 함.
						for(int i=0; i<exApiList.size(); i++) {
							exApiMap = exApiList.get(i);
							
							unitPrice = Double.parseDouble(exApiMap.get("basePrice").toString());
							currencyCd = exApiMap.get("currencyCode").toString();
							
							param.put("currencyCd", currencyCd);
							param.put("unitPrice", unitPrice);
							
							String queryTmp3 = FrameworkUtil.removeDummy("com.thirautech.mom.reference.price.globalPrice.globalPriceCheck.dummy", "R");
							// 해당 외화, 날짜로 등록된 환율 있는지 체크.
							Map<String, Object> checkMap = momService.getMap(queryTmp3, param);
		
							// 이미 등록 된 데이터 있으면 환율만 수정. 신규면 이전 데이터 변경하고 신규 등록.
							if (checkMap.get("cnt").toString().equals("0")) {
								param.put("cudFlag", "C");
		
								String queryC = FrameworkUtil.removeDummy(query, "C");
								resultMap = momService.createMap(queryC, param);
							} else {
								PrintUtil.print(null, null, null, "$", "이미 생성 된 환율이 있습니다.", exApiMap.get("currencyCode").toString(), false, true, true, true);
								resultMap = FrameworkUtil.createResponseMap(resultMap, false, "MESSAGES20007");
								return resultMap;
//								throw new Exception();
							}
						}
					} else {
						// 한국수출입은행은 url 호출 할 때 22개의 환종을 전부 조회 함.
						String strExCurrency = "";
						
						for (int j = 0; j < resultCurrencyList.size(); j++) {
							exCurrencyMap = resultCurrencyList.get(j);
							strExCurrency = exCurrencyMap.get("code").toString();
							
							for(int i=0; i<exApiList.size(); i++) {
								exApiMap = exApiList.get(i);
								currencyCd = exApiMap.get("cur_unit").toString();
								
								// 코드관리에 등록 된 환종일 때만 환율정보 등록
								if(currencyCd.indexOf(strExCurrency) >= 0) {
//									System.out.println(i + " :: currencyCd...." + currencyCd);
									unitPrice = Double.parseDouble(exApiMap.get("deal_bas_r").toString().replace(",", ""));
									param.put("currencyCd", strExCurrency);
									param.put("unitPrice", unitPrice);
									
									String queryTmp3 = FrameworkUtil.removeDummy("com.thirautech.mom.reference.price.globalPrice.globalPriceCheck.dummy", "R");
									// 해당 외화, 날짜로 등록된 환율 있는지 체크.
									Map<String, Object> checkMap = momService.getMap(queryTmp3, param);
				
									// 이미 등록 된 데이터 있으면 환율만 수정. 신규면 이전 데이터 변경하고 신규 등록.
									if (checkMap.get("cnt").toString().equals("0")) {
										param.put("cudFlag", "C");
				
										String queryC = FrameworkUtil.removeDummy(query, "C");
										resultMap = momService.createMap(queryC, param);
									} else {
										PrintUtil.print(null, null, null, "$", "이미 생성 된 환율이 있습니다.", exApiMap.get("cur_unit").toString(), false, true, true, true);
										resultMap = FrameworkUtil.createResponseMap(resultMap, false, "MESSAGES20007");
										return resultMap;
//										throw new Exception();
									}
								}
							}
						}
					}
				}

				// 접속 해제
				conn.disconnect();

			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return resultMap;
	}

}
