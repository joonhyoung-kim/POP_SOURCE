package com.thirautech.mom.util.excel;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.PictureData;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

import com.thirautech.framework.security.manager.AuthManager;
import com.thirautech.mom.service.MomService;
import com.thirautech.mom.util.PrintUtil;

public class ExcelRead {
	public static List<Map<String, Object>> read(MomService momService, ExcelReadOption excelReadOption, String codePage, Map<String, Object> code, Map<String, Object> neccesityInfo) {
        Workbook workbook = ExcelFileType.getWorkbook(excelReadOption.getFilePath());
        Sheet sheet = workbook.getSheetAt(0);
        
        PrintUtil.print("ExcelRead", "read", "#", "$", "Sheet 이름", workbook.getSheetName(0), true, true, false, false);
        PrintUtil.print(null, null, null, "$", "데이터가 있는 Sheet의 수", workbook.getNumberOfSheets(), false, false, false, false);
        PrintUtil.print(null, null, null, "$", "code List is Deprecated!!!", code, false, false, false, false);
        
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
        	numOfCells = row.getLastCellNum();
        	header = new ArrayList<String>();
        	int cellIndex = 0;
        	for(; cellIndex < numOfCells; cellIndex++) {
        		cell = row.getCell(cellIndex);
        		String value = null;
        		if(codePage == null || codePage.equals("")) {
        			value = ExcelCellRef.getValue(cell).toString();
        		} else if(codePage.indexOf("MOM") < 0) {	// D00_QTY ~ DXX_QTY를 위한
        			value = ExcelCellRef.getValue(cell).toString();
        			if(value.indexOf("D01_QTY") >= 0) {
        				dQtyStart = cellIndex;
        			} else if(dQtyStart != -1 && dQtyEnd == -1 && value.indexOf("_QTY") < 0) {
        				dQtyEnd = cellIndex;
        			}
        		} else {
            		String key1 = String.valueOf(cellIndex);
        			String code1 = code.get(key1) == null ? null : code.get(key1).toString(); 
        			if(code1 == null) {
        				if(codePage.equals("MOMBA004") || codePage.equals("MOMBD009")) {
                    		value = ExcelCellRef.getValue(cell).toString();
                    	}
                    } else {
        				value = code1;
        			}
            	}
        		
        		if(value == null || value.trim().equals("")) {
        			break;
        		} else {
        			header.add(value.trim());
        		}
        	}
        	
        	if(dQtyStart != -1 && dQtyEnd == -1) {
        		dQtyEnd = cellIndex;
        	} else if(codePage.indexOf("MOM") < 0 && dQtyStart == -1 && dQtyEnd == -1) {
        		dQtyStart = 0;
        		dQtyEnd = 0;
        	}
           
        	excelReadOption.setOutputColumns(header);
        } 
        
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>(); 
        
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
            		
            		String key = "";
            		for(int cellIndex = 0; cellIndex < numOfCells; cellIndex++) {
            			key += ("," + "ATTR"+(cellIndex+1));
            		}
            		
            		map.put("key", key);
            		
            		String value = "";
            		for(int cellIndex = 0; cellIndex < numOfCells; cellIndex++) {
            			cell = row.getCell(cellIndex);
            			value += (",\'" + ExcelCellRef.getValue(cell).toString() + "\'");
            		}
            		
            		map.put("value", value);
            		result.add(map);
            		
            		continue;
            	}
            	
            	boolean isNullLine = true;
                for(int cellIndex = 0; cellIndex < numOfCells; cellIndex++) {
                    cell = row.getCell(cellIndex);
                    cellName = ExcelCellRef.getName(excelReadOption, cell, cellIndex);
                    
                    //System.out.println("#### cellIndex = " + cellIndex + ", cellName = " + cellName + ", value = " + ExcelCellRef.getValue(cell));
                    /**
                     * 추출 대상 컬럼인지 확인한다. 추출 대상 컬럼이 아니라면, 무시.., 확인 필요
                     */
                    if(/*cellName.indexOf("null") >= 0 || */!excelReadOption.getOutputColumns().contains(cellName)) {
                    	if(codePage.equals("MOMBA004") || codePage.equals("MOMBD009")) {
                    	} else {
                    		continue;
                    	}
                    }
 
                    Object value = ExcelCellRef.getValue(cell);
                    if(neccesityInfo != null && neccesityInfo.get(String.valueOf(cellIndex)) != null && (value == null || value.toString().trim().equals(""))) {
                    	if(Integer.parseInt(neccesityInfo.get(String.valueOf(cellIndex)).toString()) == 1) {
                    		map.put("p_err_code", "E");
                        	map.put("p_err_msg", "MESSAGES20021");
                        	if(result.isEmpty()) {
                        		result.add(map);
                        	} else {
                        		result.set(0, map);
                        	}
                        	
                        	return result;
                    	}
                    	
                    }
                    
                    if(isNullLine && (value != null && (!value.toString().equals("") || !value.toString().equals("null")))) {
                    	isNullLine = false;
                    }
                    
                   	map.put(cellName, value);
                }

                if(isNullLine) {
                	break;
                }
                
                result.add(map);                
            }            
        }
        
        return result;        
    }
	
	public static boolean image(ExcelReadOption excelReadOption, List<Map<String, Object>>excelContent) {
		Workbook workbook = ExcelFileType.getWorkbook(excelReadOption.getFilePath());
		List<? extends PictureData> list = workbook.getAllPictures();
		
		int i = 0;
		for (Iterator<? extends PictureData> iterator = list.iterator(); iterator.hasNext();i++) {
			/*PictureData pictureData = (PictureData)iterator.next();
		    String ext = pictureData.suggestFileExtension();
		    byte[] bytes = pictureData.getData();
		    if (ext.equals("jpeg") || ext.equals("jpe")) {
		    	try {
		    		FileOutputStream fileOutputStream = new FileOutputStream("d:\\test.jpg");
		    		fileOutputStream.write(bytes);
		    		fileOutputStream.close();
		    	} catch(Exception e) {
		    		e.printStackTrace();
		    		return false;
		    	}
		    }*/
			
			PictureData pictureData = (PictureData)iterator.next();
			for(int j = 0; j < excelContent.size(); j++) {
				if(i == 0) {
					excelContent.get(j).put("attach1", pictureData.getData());
				} else if(i == 1) {
					excelContent.get(j).put("attach2", pictureData.getData());
				} 
			}
		}
		
		return true;
	}
}
