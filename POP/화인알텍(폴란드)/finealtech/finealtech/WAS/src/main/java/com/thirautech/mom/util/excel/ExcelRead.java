package com.thirautech.mom.util.excel;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

import com.thirautech.framework.security.manager.AuthManager;
import com.thirautech.mom.service.MomService;
import com.thirautech.mom.util.PrintUtil;

public class ExcelRead {
	public static List<Map<String, Object>> read(MomService momService, ExcelReadOption excelReadOption, String codePage, Map<String, Object> code) {
        Workbook wb = ExcelFileType.getWorkbook(excelReadOption.getFilePath());
        Sheet sheet = wb.getSheetAt(0);
        
        PrintUtil.print("ExcelRead", "read", "#", "$", "Sheet 이름", wb.getSheetName(0), true, true, false, false);
        PrintUtil.print(null, null, null, "$", "데이터가 있는 Sheet의 수", wb.getNumberOfSheets(), false, false, false, false);
        PrintUtil.print(null, null, null, "$", "code List is Deprecated!!!", code, false, false, false, true);
        
        /**
         * sheet에서 유효한(데이터가 있는) 행의 개수를 가져온다.
         */
        int numOfRows = sheet.getPhysicalNumberOfRows();
        int numOfCells = 0;
        
        Row row = null;
        Cell cell = null;
        String cellName = "";
        
        // 헤더명을 가져온다.
        row = sheet.getRow(0);
        
        List<String> header = null;
        int dQtyStart = -1, dQtyEnd = -1;
        if(row != null) {
        	/*Map<String, Object> param = new HashMap<String, Object>();*/
        	numOfCells = row.getLastCellNum();
        	header = new ArrayList<String>();
        	int cellIndex = 0;
        	for(; cellIndex < numOfCells; cellIndex++) {
        		cell = row.getCell(cellIndex);
        		// 2018.07.13 hyjeong begin
        		if(codePage == null || codePage.equals("")) {
        			header.add(ExcelCellRef.getValue(cell).toString());
        		} else if(codePage.indexOf("MOM") < 0) {	// D00_QTY ~ DXX_QTY를 위한
        			header.add(ExcelCellRef.getValue(cell).toString());
        			if(ExcelCellRef.getValue(cell).toString().equals("D01_QTY")){
        				dQtyStart = cellIndex;
        			}
        			if(dQtyStart != -1 && dQtyEnd == -1 && ExcelCellRef.getValue(cell).toString().indexOf("_QTY") < 0){
        				dQtyEnd = cellIndex;
        			}
        		} else {
            		// 2018.10.05 hyjeong begin
        			/*param.put("codePage", codePage);
            		param.put("codeId", ExcelCellRef.getValue(cell));
            		
            		Map<String, Object> result = momService.getMap("com.thirautech.mom.common.get_code_tmp", param);
            		if(result == null || result.get("CODEVALUE") == null) {
            			header.add("null_" + cellIndex);
            		} else {
                	  header.add(result.get("CODEVALUE").toString());
            		}*/
        			String key1 = String.valueOf(cellIndex);//ExcelCellRef.getValue(cell).toString();
        			String code1 = code.get(key1) == null ? null : code.get(key1).toString(); 
        			if(code1 == null) {
        				// 2018.12.31 hyjeong begin
                    	if(codePage.equals("MOMBA004")) {
                    		header.add(ExcelCellRef.getValue(cell).toString());
                    	} else {
                    		header.add("null_" + cellIndex);
                    	}
                    	// 2018.10.05 hyjeong end
        			} else {
        				header.add(code1);
        			}
            	}
        	}
        	if(dQtyStart != -1 && dQtyEnd == -1) {
        		dQtyEnd = cellIndex;
        	}
        	if(codePage.indexOf("MOM") < 0 && dQtyStart == -1 && dQtyEnd == -1) {
        		dQtyStart = 0;
        		dQtyEnd = 0;
        	}
           
        	excelReadOption.setOutputColumns(header);
        } 
        
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>(); 
        
        // 각 Row만큼 반복을 한다.
        for(int rowIndex = excelReadOption.getStartRow() - 1; rowIndex < numOfRows; rowIndex++) {
        	/*
             * 워크북에서 가져온 시트에서 rowIndex에 해당하는 Row를 가져온다.., 하나의 Row는 여러개의 Cell을 가진다.
             */
            row = sheet.getRow(rowIndex);            
            if(row != null) {
            	Map<String, Object> codeParam = new HashMap<String, Object>();
            	codeParam.put("divisionCd",AuthManager.getSessionAttribute("divisionCd").toString());
            	codeParam.put("companyCd",AuthManager.getSessionAttribute("companyCd").toString());
               
                // 가져온 Row의 Cell의 개수를 구한다.
            	numOfCells = row.getLastCellNum();
                // 데이터를 담을 맵 객체 초기화
            	Map<String, Object> map = new HashMap<String, Object>();
            	if(dQtyStart != -1 && dQtyEnd != -1) {
            		map.put("uploadType", codePage);
            		
            		//List<String> key = new ArrayList<String>();
            		//String[] key = new String[numOfCells];
            		String key = "";
            		for(int cellIndex = 0; cellIndex < numOfCells; cellIndex++) {
            			//key.add("ATTR"+(cellIndex+1));
            			//key[cellIndex] = "ATTR"+(cellIndex+1);
            			key += ("," + "ATTR"+(cellIndex+1));
            		}
            		//key.addAll(header);
            		//map.put("D_QTY_KEY", key);
            		map.put("key", key);
            		
            		//List<String> list = new ArrayList<String>();
            		//String[] list = new String[numOfCells];
            		//Map<Integer, Object> list = new HashMap<Integer, Object>();
            		//String list = "";
            		String value = "";
            		for(int cellIndex = 0; cellIndex < numOfCells; cellIndex++) {
            			cell = row.getCell(cellIndex);
            			//list.add(ExcelCellRef.getValue(cell).toString());
            			//list[cellIndex] = ExcelCellRef.getValue(cell).toString();
            			//list.put(cellIndex, ExcelCellRef.getValue(cell).toString());
            			//list += ("," + ExcelCellRef.getValue(cell).toString());
            			value += (",\'" + ExcelCellRef.getValue(cell).toString() + "\'");
            		}
            		
            		map.put("value", value);
            		//map.put("array", list.toArray(new String[list.size()]));
            		result.add(map);
            		
            		continue;
            	}
            	
                // cell의 수 만큼 반복한다.
                for(int cellIndex = 0; cellIndex < numOfCells; cellIndex++) {
                    // Row에서 CellIndex에 해당하는 Cell을 가져온다.
                	cell = row.getCell(cellIndex);
                    
                    /**
                     * 현재 Cell의 이름을 가져온다.., 이름의 예 : divisionCd, companyCd, ...
                     */
                    cellName = ExcelCellRef.getName(excelReadOption, cell, cellIndex);
                    
                    /**
                     * 추출 대상 컬럼인지 확인한다. 추출 대상 컬럼이 아니라면, 무시
                     */
                    if(cellName.indexOf("null") >= 0 || !excelReadOption.getOutputColumns().contains(cellName)) {
                    	// 2018.12.31 hyjeong begin
                    	if(codePage.equals("MOMBA004")) {
                    	} else {
                    		continue;
                    	}
                    	// 2018.12.31 hyjeong end
                    }
 
                    // 2018.12.31 hyjeong begin
                	/*if(codePage.equals("MOMBA004")) {
                	} else {
                		continue;
                	}*/
                	// 2018.12.31 hyjeong end
                	
                    //map객체의 Cell의 이름을 키(Key)로 데이터를 담는다.., code is empty
                    if(cellIndex >= code.size()) {													// code 값을 사용하지 않는 경우.
                    	map.put(cellName, ExcelCellRef.getValue(cell));
                    } /*else if(code.get(cellIndex) == null || code.get(cellIndex).size() == 0) {   	// code 값을 사용하지 않는 경우.
                    	// Deprecated
                    	map.put(cellName, ExcelCellRef.getValue(cell));
                    }*/ else {	
                    	map.put(cellName, ExcelCellRef.getValue(cell));// code 값을 사용하는 경우.
                    	// Deprecated
                    	/*Map<String, Object> codeGuide = code;//.get(cellIndex);
                    	if(codeGuide.get("key") != null) {
                    		codeParam.put(codeGuide.get("key").toString(), codeGuide.get("value"));
                    	}
                    	codeParam.put("key", ExcelCellRef.getValue(cell));
                       
                    	Map<String, Object>codeResult = momService.getMap(codeGuide.get("query").toString(), codeParam);                       
                    	map.put(cellName, codeResult.get("code"));*/
                    }
                }

                result.add(map);                
            }            
        }
        
        return result;        
    }
}
