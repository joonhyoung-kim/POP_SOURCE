package com.thirautech.mom.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	public static Double _dpiPixcel = 0.d;
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
	
//	@GetMapping("/request/print")
//	public String getPrint(@RequestParam Map<String,Object> param) {
//		String result = "^XA^FO100,100^BY3^BCN,100,Y,N,N^FD123456^FS^XZ";//
//		String result = "^XA\\r\\n^SEE:UHANGUL.DAT\\r\\n^CW1,E: SLIMGULIM.FNT\\r\\n^CI28^FO24,24^GB1128,0,5^FS^FO24,144^GB1128,0,5^FS^FO24,264^GB1128,0,5^FS^FO24,384^GB1128,0,5^FS^FO24,504^GB1128,0,5^FS^FO24,24^GB0,480,5^FS^FO1152,24^GB0,480,5^FS^FT48,230^A1N,72,50.4^FD스누피)데일리콤마100ml-블랙체리^FS^FT49,230^A1N,72,50.4^FD스누피)데일리콤마100ml-블랙체리^FS^FT48,231^A1N,72,50.4^FD스누피)데일리콤마100ml-블랙체리^FS^FT480,350^A1N,72,50.4^FD입수량:20EA^FS^FT481,350^A1N,72,50.4^FD입수량:20EA^FS^FT480,351^A1N,72,50.4^FD입수량:20EA^FS^FT360,470^A1N,72,50.4^FD생산일자:20.05.16^FS^FT361,470^A1N,72,50.4^FD생산일자:20.05.16^FS^FT360,471^A1N,72,50.4^FD생산일자:20.05.16^FS^BY4.5,2,96^FT60,624^BCN,96,Y^FD20^FS^XZ";
//		
//		return result;
//	}

//	@GetMapping("/request/print/{query}")
//	public String getPrint(@RequestParam Map<String,Object> param,@PathVariable String query) {
	
	@GetMapping("/request/print")
	public String getLabelPrint(@RequestParam Map<String,Object> param) throws Exception
    {
//		String result = "^XA\\r\\n^SEE:UHANGUL.DAT\\r\\n^CW1,E: SLIMGULIM.FNT\\r\\n^CI28^FO24,24^GB1128,0,5^FS^FO24,144^GB1128,0,5^FS^FO24,264^GB1128,0,5^FS^FO24,384^GB1128,0,5^FS^FO24,504^GB1128,0,5^FS^FO24,24^GB0,480,5^FS^FO1152,24^GB0,480,5^FS^FT48,230^A1N,72,50.4^FD스누피)데일리콤마100ml-블랙체리^FS^FT49,230^A1N,72,50.4^FD스누피)데일리콤마100ml-블랙체리^FS^FT48,231^A1N,72,50.4^FD스누피)데일리콤마100ml-블랙체리^FS^FT480,350^A1N,72,50.4^FD입수량:20EA^FS^FT481,350^A1N,72,50.4^FD입수량:20EA^FS^FT480,351^A1N,72,50.4^FD입수량:20EA^FS^FT360,470^A1N,72,50.4^FD생산일자:20.05.16^FS^FT361,470^A1N,72,50.4^FD생산일자:20.05.16^FS^FT360,471^A1N,72,50.4^FD생산일자:20.05.16^FS^BY4.5,2,96^FT60,624^BCN,96,Y^FD20^FS^XZ";
		String result = "";

        //-------------------------------------------------------------------------------
        // 라벨오브젝트 테이블(MOM_POP_LABELOBJECT) 리스트 조회
        //-------------------------------------------------------------------------------
//        Map<String,Object> paramMap = new HashMap();
//        paramMap.put("LABEL_ID", "P-LABEL02");
        
		// 라벨 오브젝트 테비을 SELECT
        String query = "com.thirautech.mom.pop.popProcess.get_labelObject_list";
        
        System.out.println("param(labelID) : " + param);
        List<Map<String, Object>> listLabelObject = new ArrayList<Map<String, Object>>();
        
        listLabelObject = (List<Map<String, Object>>)popService.getLabelObjectMapList(query, param);
        System.out.println("listLabelObject.size() : " + listLabelObject.size());

        System.out.println("listLabelObject.get(0) : " + listLabelObject.get(0));
        
		result = popService.getZplScriptFromLabelObjectMapList(listLabelObject);
		System.out.println("result =" + result);
       
		return result;
    }
        
    
}