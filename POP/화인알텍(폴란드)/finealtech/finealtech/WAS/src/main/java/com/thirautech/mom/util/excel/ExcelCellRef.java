package com.thirautech.mom.util.excel;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;

public class ExcelCellRef {
	/**
     * Cell에 해당하는 Column Name을 가젼온다(A,B,C..)
     * 만약 Cell이 Null이라면 int cellIndex의 값으로
     * Column Name을 가져온다.
     * @param cell
     * @param cellIndex
     * @return
     */
    public static String getName(ExcelReadOption excelReadOption, Cell cell, int cellIndex) {
        int cellNum = 0;
        if(cell != null) {
            cellNum = cell.getColumnIndex();
        }
        else {
            cellNum = cellIndex;
        }
        
        List<String> columns = excelReadOption.getOutputColumns();
        
        return columns.get(cellNum);
        //return CellReference.convertNumToColString(cellNum);
    }
    
    public static Object getValue(Cell cell) {
        if(cell == null) {
            return "";
        } else {
            if( cell.getCellType() == Cell.CELL_TYPE_FORMULA ) {
            	return cell.getCellFormula().trim();
            } else if( cell.getCellType() == Cell.CELL_TYPE_NUMERIC ) {
            	if( DateUtil.isCellDateFormatted(cell)) {
    				Date date = cell.getDateCellValue();
    				return new SimpleDateFormat("yyyy-MM-dd").format(date);
    			}else {
    				String value = String.valueOf(cell.getNumericCellValue()).trim();
    				if(value.length() > 2 && value.substring(value.length()-2).equals(".0")) {
    					return value.substring(0, value.length()-2);
    				}
    				return cell.getNumericCellValue();
    			}
            } else if( cell.getCellType() == Cell.CELL_TYPE_STRING ) {
            	return cell.getStringCellValue().trim();
            } else if( cell.getCellType() == Cell.CELL_TYPE_BOOLEAN ) {
            	return cell.getBooleanCellValue() + "";
            } else if( cell.getCellType() == Cell.CELL_TYPE_ERROR ) {
            	return cell.getErrorCellValue() + "";
            } else if( cell.getCellType() == Cell.CELL_TYPE_BLANK ) {
                return "";
            } else {
            	return cell.getStringCellValue().trim();
            }
        }
    }
}
