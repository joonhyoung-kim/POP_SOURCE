/**
 * @클래스명 : ZplScriptPrintUtil
 * @작성일 : 2020.06.01
 * @author : COM
 * @변경이력 :
 * @클래스 설명 : 제브라 바코드 프린터용 ZPL 스크립트 관련 유틸리티 클래스
 */
package com.thirautech.mom.util;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Map;

public class ZplScriptPrintUtil  extends Exception {
	
	/**
	 * @메소드명 : ZplScriptPrintUtil
	 * @작성일 : 2020.06.01
	 * @author : COM
	 * @변경이력 :
	 * @메소드 설명 : 본 클래스의 기본 생성자
	 */
    public ZplScriptPrintUtil()
    {
        
    }

    /**
	 * @메소드명 : returnMmToPix
	 * @작성일 : 2020.06.01
	 * @author : COM
	 * @변경이력 :
	 * @메소드 설명 : mm을 pixel 로 단위 변경 - MM를 해상도에 맞게 PIX로 리턴(디자인작업은 200dpi 기준임)
     * @param strMm
     * @param strPix
     * @return String : 단위 변경된 값
     * @throws Exception
     */
    private static String returnMmToPix(String strMm, String strPix) throws Exception
    {
    	String retBuf = "";

    	if( "".equals(strMm.trim()) )
        {
            strMm = "0";
        }

    	if( "".equals(strPix.trim()) )
        {
            strPix = "0";
        }

        double calcPix = 0;
        int dpiPixcel = FrameworkUtil.dpiPixcel;

        try
        {
            calcPix = Double.parseDouble(strMm) * (double)dpiPixcel;
        }
        catch (Exception e)
        {
        	calcPix = Double.parseDouble(strPix);
        	//에러시 수행
            e.printStackTrace();
            throw e;
        }
        finally
        {
        	retBuf = zeroFormatting(calcPix);
            return retBuf;
        }
    }
    
    /**
	 * @메소드명 : zeroFormatting
	 * @작성일 : 2020.06.01
	 * @author : COM
	 * @변경이력 :
	 * @메소드 설명 : double형 숫자를 문자로 변환시 소수점 아래가 0 일 경우 정수형으로
     * @param d : 변환대상 double형 숫자
     * @return double형 숫자가 변환된 스트링값
     */
    private static String zeroFormatting(double d)
    {
        if(d == (long) d)
            return String.format("%d",(long)d);
        else
            return String.format("%s",d);
    }
    // End of returnMmToPix
    //----------------------------------------------------------
    
    /**
	 * @메소드명 : returnWidthTo
	 * @작성일 : 2020.06.01
	 * @author : COM
	 * @변경이력 :
	 * @메소드 설명 : 바코드 넓이를 해상도에 맞게 리턴(디자인작업은 200dpi 기준임)
     * @param strWidth
     * @return String : 바코드 넓이
     * @throws Exception
     */
    private static String returnWidthTo(String strWidth) throws Exception
    {
    	String retBuf = "";

    	if( "".equals(strWidth.trim()) )
        {
            strWidth = "0";
        }

        double calcWidth = 0;
        int dpiPixcel = FrameworkUtil.dpiPixcel;

        try
        {
            //100dpi
            if (dpiPixcel == 4)
            {
                calcWidth = Double.parseDouble(strWidth) / 2;
            }
            //200dpi
            if (dpiPixcel == 8)
            {
                calcWidth = Double.parseDouble(strWidth);
            }
            //300dpi
            else if (dpiPixcel == 12)
            {
                calcWidth = Double.parseDouble(strWidth) * 1.5;
            }
            //400dpi
            else if (dpiPixcel == 16)
            {
                calcWidth = Double.parseDouble(strWidth) * 1.5;
            }
            //500dpi
            else if (dpiPixcel == 20)
            {
                calcWidth = Double.parseDouble(strWidth) * 2;
            }
            //600dpi
            else if (dpiPixcel == 24)
            {
                calcWidth = Double.parseDouble(strWidth) * 2.5;
            }

        }
        catch (Exception e)
        {
            calcWidth = Double.parseDouble(strWidth);
        	//에러시 수행
            e.printStackTrace();
            throw e;
        }
        finally
        {
            retBuf = Double.toString(calcWidth);
            return retBuf;
        }
    }
    // End of returnWidthTo
    //----------------------------------------------------------
    
    /**
	 * @메소드명 : returnLabelValueDecoder
	 * @작성일 : 2020.06.01
	 * @author : COM
	 * @변경이력 :
	 * @메소드 설명 : 라벨값내에 약속된 문자들 디코딩
     * @param value : 라벨값
     * @return 디코딩된 라벨값
     */
    public static String returnLabelValueDecoder(String value)
    {
        if(value == null)
        {
            return "";
        }

        String retBuf = value;
        retBuf = retBuf.replace("@Plus@", "+");
        retBuf = retBuf.replace("@Shap@", "#");
        retBuf = retBuf.replace("@Comma@", ",");

        return retBuf;
    }
    // End of returnLabelValueDecoder
    //----------------------------------------------------------

    
    /**
	 * @메소드명 : lineScript
	 * @작성일 : 2020.06.01
	 * @author : COM
	 * @변경이력 :
	 * @메소드 설명 : 라벨 라인 오브젝트에 대한 ZPL 스크립트값 리턴.
     * @param xPosition : X축 시작점(Pixel)
     * @param yPosition : Y축 시작점(Pixel)
     * @param boxWidth  : X축 Width(Pixel)
     * @param boxHeight : Y축 Height(Pixel)
     * @param lineThikness : 선굵기(Pixel)
     * @param labelValue : FILL - 해당 박스가 검정색으로 채워진다.(선굵기가 box_width와 동일하게 됨.)
     * @return String : 라벨 라인 오브젝트에 대한 ZPL 스크립트값
     */
    public String lineScript(String xPosition, String yPosition, String boxWidth, String boxHeight, String lineThikness, String labelValue)
    {
    	if( "FILL".equals(labelValue) )
        {
            lineThikness = boxWidth;
        }
        String retBuf = "^FO" + xPosition.trim() + "," + yPosition.trim() + "^GB" + boxWidth.trim() + "," + boxHeight.trim() + "," + lineThikness.trim() + "^FS";

        return retBuf;
    }
    // End of lineScript
    //----------------------------------------------------------
    
    /**
	 * @메소드명 : englishScript
	 * @작성일 : 2020.06.01
	 * @author : COM
	 * @변경이력 :
	 * @메소드 설명 : 라벨 영문자 오브젝트에 대한 ZPL 스크립트값 리턴.
     * @param xPosition : X축 시작점(Pixel)
     * @param yPosition : Y축 시작점(Pixel)
     * @param boxWidth  : X축 Width(Pixel)
     * @param boxHeight : Y축 Height(Pixel)
     * @param lineThikness : 선굵기(Pixel)
     * @param labelValue : FILL - 해당 박스가 검정색으로 채워진다.(선굵기가 box_width와 동일하게 됨.)
     * @param lanscape : N - Normal로 회전값이 0도
     * @return String : 라벨 영문자 오브젝트에 대한 ZPL 스크립트값
     */
    public String englishScript(String xPosition, String yPosition, String boxWidth, String boxHeight, String lineThikness, String labelValue, String lanscape)
    {
        String retBuf = "";
        int fontWidthPixSize = 0;
        int fontLength = 0;
        double fontLengthFloat = 0;

        String[] labalValueArray = labelValue.split("");

        for(int i=0;i< labalValueArray.length;i++)
        {
        	fontLengthFloat += isChar(labalValueArray[i]);
        }

        fontLength = (int)fontLengthFloat;
        if (fontLength > 0)
        {
        	if( "N".equals(lanscape) )
            {
            	fontWidthPixSize = Integer.parseInt(boxWidth.trim()) / fontLength;
            }
            else
            {
            	fontWidthPixSize = Integer.parseInt(boxHeight.trim()) / fontLength;
            }
            //fontWidthPixSize = (int)(fontWidthPixSize * 1.5);
            // 퍼센트 증가 공식 : 숫자 X (1 + 퍼센트 ÷ 100)
            // 30% 증가
            fontWidthPixSize = (int)(fontWidthPixSize + fontWidthPixSize * (1.0 + 20.0 / 100.0));
        }
        String yPositionBoxHeightAdd = "";
        String boxHeightCalcPosition = "";

        yPositionBoxHeightAdd = Double.toString(  Double.parseDouble(yPosition.trim()) + Double.parseDouble(boxHeight.trim())  );

    	if( "N".equals(lanscape) )
        {
            boxHeightCalcPosition = Integer.toString( (int)( Double.parseDouble(boxHeight.trim()) * 1.2 ) );
        }
        else
        {
            boxHeightCalcPosition = Integer.toString( (int)( Double.parseDouble(boxWidth.trim()) * 1.2 ) );
        }
    	
    	if( !"0".equals(lineThikness) )
        {
            retBuf = lineScript(xPosition, yPosition, boxWidth, boxHeight, lineThikness, "");
        }

        int compBuf = (int)( Double.parseDouble(boxHeightCalcPosition) * 0.8 );

        if (fontWidthPixSize > compBuf)
        {
            fontWidthPixSize = (int)( Double.parseDouble(boxHeightCalcPosition) * 0.8 );
        }
        
    	if( "N".equals(lanscape) )
        {
            retBuf += "^FT" + xPosition.trim() + "," + yPositionBoxHeightAdd + "^A0" + lanscape + "," + boxHeightCalcPosition + "," + Integer.toString( fontWidthPixSize ) + "^FH\\^FD" + labelValue + "^FS";
        }
        else
        {
            retBuf += "^FT" + xPosition.trim() + "," + yPosition.trim() + "^A0" + lanscape + "," + boxHeightCalcPosition + "," + Integer.toString( fontWidthPixSize ) + "^FH\\^FD" + labelValue + "^FS";
        }
        return retBuf;
    }

    /**
	 * @메소드명 : isChar
	 * @작성일 : 2020.06.01
	 * @author : COM
	 * @변경이력 :
	 * @메소드 설명 : 한자리 대문자, 소문자, 숫자에 따라 영문자 인쇄시 너비 리턴.
     * @param str : 한자리 스트링
     * @return double : 한자리 스트링에 대해 영문 대소문자, 숫자 특성에 맞춘 폰트 너비 값
     */
    private double isChar(String str)
    {
    	boolean bCheck = false;
		char c = str.charAt(0);

		bCheck = ('A' <= c && 'Z' >= c) ? true : false;
        
        // 영 대문자 일경우
        if (bCheck == true)
        {
            return 1;
        }
        // 숫자 일경우
        if (bCheck == false)
        {
        	bCheck = Character.isDigit(c);
        	// 숫자 일경우
            if (bCheck == true)
            {
                return 0.925;
            }
        }

        // 영 소문자/한글 일 경우
        return 0.8;
    }
    // End of englishScript
    //----------------------------------------------------------
	
    /**
	 * @메소드명 : koreaScript
	 * @작성일 : 2020.06.01
	 * @author : COM
	 * @변경이력 :
	 * @메소드 설명 : 라벨 한글 오브젝트에 대한 ZPL 스크립트값 리턴.
     * @param xPosition : X축 시작점(Pixel)
     * @param yPosition : Y축 시작점(Pixel)
     * @param boxWidth  : X축 Width(Pixel)
     * @param boxHeight : Y축 Height(Pixel)
     * @param lineThikness : 선굵기(Pixel)
     * @param labelValue : FILL - 해당 박스가 검정색으로 채워진다.(선굵기가 box_width와 동일하게 됨.)
     * @param lanscape : N - Normal로 회전값이 0도
     * @return String : 라벨 영문자 오브젝트에 대한 ZPL 스크립트값
     */
    public String koreaScript(String xPosition, String yPosition, String boxWidth, String boxHeight, String lineThikness, String labelValue, String lanscape)
    {
        String retBuf = "";
        double fontWidthPixSize = 0;
        double fontLengthFloat = 0;

        String[] labelValueArray = labelValue.split("");
        System.out.println("$$$>>>labelValueArray :" + labelValueArray);

        if(labelValueArray.length == 0)
        {
            return "";
        }

        for (int i = 0; i < labelValueArray.length; i++)
        {
            fontLengthFloat += isCharKor(labelValueArray[i]);
        }
        System.out.println("$$$>>>fontLengthFloat :" + fontLengthFloat);

        if (fontLengthFloat > 0)
        {
        	if( "N".equals(lanscape) )
            {
                fontWidthPixSize = (double)(Double.parseDouble(boxWidth.trim()) / fontLengthFloat);
            }
            else
            {
                fontWidthPixSize = (double)(Double.parseDouble(boxHeight.trim()) / fontLengthFloat);
            }
        }
        System.out.println("$$$>>>fontWidthPixSize :" + fontWidthPixSize);
        
        String yPositionBoxHeightAdd = "";
        String boxHeightCalcPosition = "";

        //12를 빼는 이유 : 한글 폰트의 경우 약 10픽셀정도 아래로 밀리는 현상이 있어 y시작점을 강제로 조정(글자는 좌측아래가 기준임)
        yPositionBoxHeightAdd = Double.toString(  Double.parseDouble(yPosition.trim()) + Double.parseDouble(boxHeight.trim()) - 10  );
        System.out.println("$$$>>>yPositionBoxHeightAdd :" + yPositionBoxHeightAdd);


    	if( "N".equals(lanscape) )
        {
            boxHeightCalcPosition = Integer.toString(  (int)( Double.parseDouble(boxHeight.trim()) * 1.0 )  );
        }
        else
        {
            boxHeightCalcPosition = Integer.toString(  (int)( Double.parseDouble(boxWidth.trim()) * 1.0 )  );
        }
        System.out.println("$$$>>>boxHeightCalcPosition :" + boxHeightCalcPosition);
    	
    	if( !"0".equals(lineThikness) )
        {
            retBuf = lineScript(xPosition, yPosition, boxWidth, boxHeight, lineThikness, "");
        }
        System.out.println("$$$>>>retBuf :" + retBuf);

        double compBuf = (  Double.parseDouble(boxHeightCalcPosition) * 0.65  );
        System.out.println("$$$>>>compBuf :" + compBuf);

        if (fontWidthPixSize > compBuf)
        {
            System.out.println("$$$>>>fontWidthPixSize > compBuf");
            fontWidthPixSize = (double)(  Double.parseDouble(boxHeightCalcPosition) * 0.7  );
        }
        System.out.println("$$$>>>fontWidthPixSize :" + fontWidthPixSize);
        
    	if( "N".equals(lanscape) )
        {
            System.out.println("$$$>>>N == lanscape");
            retBuf += "^FT" + xPosition.trim() + "," + yPositionBoxHeightAdd + "^A1" + lanscape + "," + boxHeightCalcPosition + "," + new DecimalFormat("0.##").format(fontWidthPixSize) + "^FD" + labelValue + "^FS";
            retBuf += "^FT" + Double.toString(  Double.parseDouble(xPosition.trim()) + 1.0  ) + "," + yPositionBoxHeightAdd + "^A1" + lanscape + "," + boxHeightCalcPosition + "," + new DecimalFormat("0.##").format(fontWidthPixSize) + "^FD" + labelValue + "^FS";
            retBuf += "^FT" + xPosition.trim() + "," + Double.toString(  Double.parseDouble(yPositionBoxHeightAdd) + 1  ) + "^A1" + lanscape + "," + boxHeightCalcPosition + "," + new DecimalFormat("0.##").format(fontWidthPixSize) + "^FD" + labelValue + "^FS";
        }
        else
        {
            System.out.println("$$$>>>N != lanscape");
            retBuf += "^FT" + xPosition.trim() + "," + yPosition.trim() + "^A1" + lanscape + "," + boxHeightCalcPosition + "," + new DecimalFormat("0.##").format(fontWidthPixSize) + "^FD" + labelValue + "^FS";
            retBuf += "^FT" + Double.toString(  Double.parseDouble(xPosition.trim()) + 1.0  ) + "," + yPosition.trim() + "^A1" + lanscape + "," + boxHeightCalcPosition + "," + new DecimalFormat("0.##").format(fontWidthPixSize) + "^FD" + labelValue + "^FS";
            retBuf += "^FT" + xPosition.trim() + "," + Double.toString(  Double.parseDouble(yPosition.trim()) + 1.0  ) + "^A1" + lanscape + "," + boxHeightCalcPosition + "," + new DecimalFormat("0.##").format(fontWidthPixSize) + "^FD" + labelValue + "^FS";
        }
        System.out.println("$$$>>>retBuf :" + retBuf);
        return retBuf;
    }

    /**
	 * @메소드명 : isCharKor
	 * @작성일 : 2020.06.01
	 * @author : COM
	 * @변경이력 :
	 * @메소드 설명 : 한자리 대문자, 소문자, 숫자에 따라 한글 인쇄시 너비 리턴.
     * @param str : 한자리 스트링
     * @return double : 한자리 스트링에 대해 영문 대소문자, 한글, 숫자 특성에 맞춘 폰트 너비 값
     */
    private double isCharKor(String str)
    {
    	boolean bCheck = false;
		char c = str.charAt(0);

		bCheck = ('A' <= c && 'Z' >= c) ? true : false;
		
		// 영 대문자 일경우
		if (bCheck == true)
        {
            return 1;
        }

        bCheck = ('a' <= c && 'z' >= c) ? true : false;
        // 영 소문자 일경우
        if (bCheck == true)
        {
            return 0.8;
        }
        // 숫자 일경우
        if (bCheck == false)
        {
        	bCheck = Character.isDigit(c);
            if (bCheck == true)
            {
                // 숫자 일경우
                return 0.9;
            }
        }

        if(str==" ")
        {
            return 0.1;
        }

        // 영 소문자/한글 일 경우
        return 0.9;
    }
    // End of koreaScript
    //----------------------------------------------------------
    
    /**
	 * @메소드명 : code128Script
	 * @작성일 : 2020.06.01
	 * @author : COM
	 * @변경이력 :
	 * @메소드 설명 : code128 규격 바코드에 대한 ZPL 스크립트값 리턴.
     * @param xPosition : X축 시작점(Pixel)
     * @param yPosition : Y축 시작점(Pixel)
     * @param barcodeModuleWidth : 바코드 모듈 너비
     * @param barcodeHeight : 바코드 모듈 높이
     * @param landscape : N - Normal로 회전값이 0도
     * @param barcodeTextUnderYn : 바코드 아래 텍스트 표기 여부
     * @param labelValue : FILL - 해당 박스가 검정색으로 채워진다.(선굵기가 box_width와 동일하게 됨.)  ??
     * @return String : 라벨 바코드 오브젝트에 대한 ZPL 스크립트값
     */
    public String code128Script(String xPosition, String yPosition, String barcodeModuleWidth, String barcodeHeight, String landscape, String barcodeTextUnderYn, String labelValue)
    {
    	String barcodeRatio = "2";
    	String retBuf = "";

        if ( "".equals(labelValue.trim()) )
        {
            retBuf = "";
        }
        else
        {
            //retBuf = "^FT" + xPosition.Trim() + "," + yPosition.Trim() + "^BC" + landscape.Trim() + "," + barcodeHeight.Trim() + "," + barcodeTextUnderYn + "^FD" + labelValue + "^FS";
            retBuf = "^BY" + barcodeModuleWidth.trim() + "," + barcodeRatio.trim() + "," + barcodeHeight.trim() + "^FT" + xPosition.trim() + "," + yPosition.trim() + "^BC" + landscape.trim() + "," + barcodeHeight.trim() + "," + barcodeTextUnderYn + "^FD" + labelValue + "^FS";
            //ean128 test
            //retBuf = "^BY" + barcodeModuleWidth.Trim() + "," + barcodeRatio.Trim() + "," + barcodeHeight.Trim() + "^FT" + xPosition.Trim() + "," + yPosition.Trim() + "^BC" + landscape.Trim() + "," + barcodeHeight.Trim() + "," + barcodeTextUnderYn + ",N,N,U^FD" + labelValue + "^FS";
        }

        return retBuf;
    }
    // End of code128Script
    //----------------------------------------------------------

    /**
	 * @메소드명 : code39Script
	 * @작성일 : 2020.06.01
	 * @author : COM
	 * @변경이력 :
	 * @메소드 설명 : code39 규격 바코드에 대한 ZPL 스크립트값 리턴.
     * @param xPosition : X축 시작점(Pixel)
     * @param yPosition : Y축 시작점(Pixel)
     * @param barcodeModuleWidth : 바코드 모듈 너비
     * @param barcodeRatio : 바코드 비율
     * @param barcodeHeight : 바코드 모듈 높이
     * @param landscape : N - Normal로 회전값이 0도
     * @param barcodeTextUnderYn : 바코드 아래 텍스트 표기 여부
     * @param labelValue : FILL - 해당 박스가 검정색으로 채워진다.(선굵기가 box_width와 동일하게 됨.)  ??
     * @return String : 라벨 바코드 오브젝트에 대한 ZPL 스크립트값
     */
    public String code39Script(String xPosition, String yPosition, String barcodeModuleWidth, String barcodeRatio, String barcodeHeight, String landscape, String barcodeTextUnderYn, String labelValue)
    {
    	String retBuf = "";

        if ( "".equals(labelValue.trim()) )
        {
            retBuf = "";
        }
        else
        {
            retBuf = "^BY" + barcodeModuleWidth.trim() + "," + barcodeRatio.trim() + "," + barcodeHeight.trim() + "^FT" + xPosition.trim() + "," + yPosition.trim() + "^B3" + landscape.trim() + ",N," + barcodeHeight.trim() + "," + barcodeTextUnderYn + ",N^FD" + labelValue + "^FS";
        }

        return retBuf;
    }
    // End of code39Script
    //----------------------------------------------------------

    /**
	 * @메소드명 : code93Script
	 * @작성일 : 2020.06.01
	 * @author : COM
	 * @변경이력 :
	 * @메소드 설명 : code93 규격 바코드에 대한 ZPL 스크립트값 리턴.
     * @param xPosition : X축 시작점(Pixel)
     * @param yPosition : Y축 시작점(Pixel)
     * @param barcodeModuleWidth : 바코드 모듈 너비
     * @param barcodeRatio : 바코드 비율
     * @param barcodeHeight : 바코드 모듈 높이
     * @param landscape : N - Normal로 회전값이 0도
     * @param barcodeTextUnderYn : 바코드 아래 텍스트 표기 여부
     * @param labelValue : FILL - 해당 박스가 검정색으로 채워진다.(선굵기가 box_width와 동일하게 됨.)  ??
     * @return String : 라벨 바코드 오브젝트에 대한 ZPL 스크립트값
     */
    public String code93Script(String xPosition, String yPosition, String barcodeModuleWidth, String barcodeRatio, String barcodeHeight, String landscape, String barcodeTextUnderYn, String labelValue)
    {
    	String retBuf = "";

        if( "".equals(labelValue.trim()) )
        {
            retBuf = "";
        }
        else
        {
            retBuf = "^BY" + barcodeModuleWidth.trim() + "," + barcodeRatio.trim() + "," + barcodeHeight.trim() + "^FT" + xPosition.trim() + "," + yPosition.trim() + "^BA" + landscape.trim() + barcodeHeight.trim() + "," + barcodeTextUnderYn + ",N,N^FD" + labelValue + "^FS";
        }

        return retBuf;
    }
    // End of code93Script
    //----------------------------------------------------------

    /**
	 * @메소드명 : codeEAN13Script
	 * @작성일 : 2020.06.01
	 * @author : COM
	 * @변경이력 :
	 * @메소드 설명 : code EAN13 규격 바코드에 대한 ZPL 스크립트값 리턴.
     * @param xPosition : X축 시작점(Pixel)
     * @param yPosition : Y축 시작점(Pixel)
     * @param barcodeModuleWidth : 바코드 모듈 너비
     * @param barcodeHeight : 바코드 모듈 높이
     * @param landscape : N - Normal로 회전값이 0도
     * @param barcodeTextUnderYn : 바코드 아래 텍스트 표기 여부
     * @param labelValue : FILL - 해당 박스가 검정색으로 채워진다.(선굵기가 box_width와 동일하게 됨.)  ??
     * @return String : 라벨 바코드 오브젝트에 대한 ZPL 스크립트값
     */
    public String codeEAN13Script(String xPosition, String yPosition, String barcodeModuleWidth, String barcodeHeight, String landscape, String barcodeTextUnderYn, String labelValue)
    {
        String barcodeRatio = "2";
        String retBuf = "";

        if( "".equals(labelValue.trim()) )
        {
            retBuf = "";
        }
        else
        {
            retBuf = "^BY" + barcodeModuleWidth.trim() + "," + barcodeRatio.trim() + "," + barcodeHeight.trim() + "^FT" + xPosition.trim() + "," + yPosition.trim() + "^BE" + landscape.trim() + "," + barcodeHeight.trim() + "," + barcodeTextUnderYn + ",N^FD" + labelValue + "^FS";
        }

        return retBuf;
    }
    // End of codeEAN13Script
    //----------------------------------------------------------

    /**
	 * @메소드명 : codeEAN8Script
	 * @작성일 : 2020.06.01
	 * @author : COM
	 * @변경이력 :
	 * @메소드 설명 : code EAN8 규격 바코드에 대한 ZPL 스크립트값 리턴.
     * @param xPosition : X축 시작점(Pixel)
     * @param yPosition : Y축 시작점(Pixel)
     * @param barcodeModuleWidth : 바코드 모듈 너비
     * @param barcodeHeight : 바코드 모듈 높이
     * @param landscape : N - Normal로 회전값이 0도
     * @param barcodeTextUnderYn : 바코드 아래 텍스트 표기 여부
     * @param labelValue : FILL - 해당 박스가 검정색으로 채워진다.(선굵기가 box_width와 동일하게 됨.)  ??
     * @return String : 라벨 바코드 오브젝트에 대한 ZPL 스크립트값
     */
    public String codeEAN8Script(String xPosition, String yPosition, String barcodeModuleWidth, String barcodeHeight, String landscape, String barcodeTextUnderYn, String labelValue)
    {
        String barcodeRatio = "2";
        String retBuf = "";

        if( "".equals(labelValue.trim()) )
        {
            retBuf = "";
        }
        else
        {
            retBuf = "^BY" + barcodeModuleWidth.trim() + "," + barcodeRatio.trim() + "," + barcodeHeight.trim() + "^FT" + xPosition.trim() + "," + xPosition.trim() + "^B8" + landscape.trim() + "," + barcodeHeight.trim() + "," + barcodeTextUnderYn + ",N^FD" + labelValue + "^FS";
        }

        return retBuf;
    }
    // End of codeEAN8Script
    //----------------------------------------------------------
    
    /**
	 * @메소드명 : codeEAN8Script
	 * @작성일 : 2020.06.01
	 * @author : COM
	 * @변경이력 :
	 * @메소드 설명 : code UPC 규격 바코드에 대한 ZPL 스크립트값 리턴.
     * @param xPosition : X축 시작점(Pixel)
     * @param yPosition : Y축 시작점(Pixel)
     * @param barcodeModuleWidth : 바코드 모듈 너비
     * @param barcodeHeight : 바코드 모듈 높이
     * @param landscape : N - Normal로 회전값이 0도
     * @param barcodeTextUnderYn : 바코드 아래 텍스트 표기 여부
     * @param labelValue : FILL - 해당 박스가 검정색으로 채워진다.(선굵기가 box_width와 동일하게 됨.)  ??
     * @return String : 라벨 바코드 오브젝트에 대한 ZPL 스크립트값
     */
    public String codeUpcScript(String xPosition, String yPosition, String barcodeModuleWidth, String barcodeHeight, String landscape, String barcodeTextUnderYn, String labelValue)
    {
        String barcodeRatio = "2";
        String retBuf = "";

        if( "".equals(labelValue.trim()) )
        {
            retBuf = "";
        }
        else
        {
            retBuf = "^BY" + barcodeModuleWidth.trim() + "," + barcodeRatio.trim() + "," + barcodeHeight.trim() + "^FT" + xPosition.trim() + "," + yPosition.trim() + "^BU" + landscape.trim() + "," + barcodeHeight.trim() + "," + barcodeTextUnderYn + ",N,Y^FD" + labelValue + "^FS";
        }

        return retBuf;
    }
    // End of codeUpcScript
    //----------------------------------------------------------

    /**
	 * @메소드명 : codePdf417Script
	 * @작성일 : 2020.06.01
	 * @author : COM
	 * @변경이력 :
	 * @메소드 설명 : code PDF417 규격 바코드에 대한 ZPL 스크립트값 리턴.
     * @param xPosition : X축 시작점(Pixel)
     * @param yPosition : Y축 시작점(Pixel)
     * @param barcodeModuleWidth : 바코드 모듈 너비
     * @param barcode2Dsize : 2D 바코드 크기
     * @param landscape : N - Normal로 회전값이 0도
     * @param labelValue : FILL - 해당 박스가 검정색으로 채워진다.(선굵기가 box_width와 동일하게 됨.)  ??
     * @return String : 라벨 바코드 오브젝트에 대한 ZPL 스크립트값
     */
    public String codePdf417Script(String xPosition, String yPosition, String barcodeModuleWidth, String barcode2Dsize, String landscape, String labelValue)
    {
        String barcodeRatio = "2";
        String retBuf = "";

        if( "".equals(labelValue.trim()) )
        {
            retBuf = "";
        }
        else
        {
            retBuf = "^BY" + barcodeModuleWidth.trim() + "," + barcodeRatio.trim() + "^FO" + xPosition.trim() + "," + yPosition.trim() + "^B7" + landscape.trim() + "," + barcode2Dsize.trim() + ",0,,,N^FD" + labelValue + "^FS";
        }

        return retBuf;
    }
    // End of codePdf417Script
    //----------------------------------------------------------

    /**
	 * @메소드명 : codeQrScript
	 * @작성일 : 2020.06.01
	 * @author : COM
	 * @변경이력 :
	 * @메소드 설명 : code QR 규격 바코드에 대한 ZPL 스크립트값 리턴.
     * @param xPosition : X축 시작점(Pixel)
     * @param yPosition : Y축 시작점(Pixel)
     * @param barcodeModuleWidth : 바코드 모듈 너비
     * @param barcode2Dsize : 2D 바코드 크기
     * @param landscape : N - Normal로 회전값이 0도
     * @param labelValue : FILL - 해당 박스가 검정색으로 채워진다.(선굵기가 box_width와 동일하게 됨.)  ??
     * @return String : 라벨 바코드 오브젝트에 대한 ZPL 스크립트값
     */
    public String codeQrScript(String xPosition, String yPosition, String barcodeModuleWidth, String barcode2Dsize, String landscape, String labelValue)
    {
        String retBuf = "";
        //String barcode_ratio = "2";
        //String retBuf = "^BY" + barcodeModuleWidth.Trim() + "," + barcode_ratio.Trim() + "^FO" + xPosition.Trim() + "," + yPosition.Trim() + "^BQ" + landscape.Trim() + ",1," + barcode2Dsize.Trim() + "^FD" + labelValue + "^FS";
        if( "".equals(labelValue.trim()) )
        {
            retBuf = "";
        }
        else
        {
            retBuf = "^FO" + xPosition.trim() + "," + yPosition.trim() + "^BQ" + landscape.trim() + ",2," + barcode2Dsize.trim() + "^FDQA," + labelValue + "^FS";
            //retBuf = "^FT" + xPosition.trim() + "," + yPosition.trim() + ",2^BQ" + landscape.trim() + ",2," + barcode2Dsize.trim() + "^FDQA," + labelValue + "^FS";
        }

        return retBuf;
    }
    // End of codeQrScript
    //----------------------------------------------------------

    /**
	 * @메소드명 : codeQrFtScript
	 * @작성일 : 2020.06.01
	 * @author : COM
	 * @변경이력 :
	 * @메소드 설명 : code QR(FT) 규격 바코드에 대한 ZPL 스크립트값 리턴.
     * @param xPosition : X축 시작점(Pixel)
     * @param yPosition : Y축 시작점(Pixel)
     * @param barcodeModuleWidth : 바코드 모듈 너비
     * @param barcode2Dsize : 2D 바코드 크기
     * @param landscape : N - Normal로 회전값이 0도
     * @param labelValue : FILL - 해당 박스가 검정색으로 채워진다.(선굵기가 box_width와 동일하게 됨.)  ??
     * @return String : 라벨 바코드 오브젝트에 대한 ZPL 스크립트값
     */
    public String codeQrFtScript(String xPosition, String yPosition, String barcodeModuleWidth, String barcode2Dsize, String landscape, String labelValue)
    {
        String retBuf = "";
        //String barcode_ratio = "2";
        //String retBuf = "^BY" + barcodeModuleWidth.Trim() + "," + barcode_ratio.Trim() + "^FO" + xPosition.Trim() + "," + yPosition.Trim() + "^BQ" + landscape.Trim() + ",1," + barcode2Dsize.Trim() + "^FD" + labelValue + "^FS";
        if( "".equals(labelValue.trim()) )
        {
            retBuf = "";
        }
        else
        {
            retBuf = "^FT" + xPosition.trim() + "," + yPosition.trim() + ",2^BQ" + landscape.trim() + ",2," + barcode2Dsize.trim() + "^FDQA," + labelValue + "^FS";
        }

        return retBuf;
    }
    // End of codeQrFtScript
    //----------------------------------------------------------

    /**
	 * @메소드명 : codeMatrixScript
	 * @작성일 : 2020.06.01
	 * @author : COM
	 * @변경이력 :
	 * @메소드 설명 : DATA Matrix 규격 바코드에 대한 ZPL 스크립트값 리턴.
     * @param xPosition : X축 시작점(Pixel)
     * @param yPosition : Y축 시작점(Pixel)
     * @param barcodeModuleWidth : 바코드 모듈 너비
     * @param barcode2Dsize : 2D 바코드 크기
     * @param landscape : N - Normal로 회전값이 0도
     * @param labelValue : FILL - 해당 박스가 검정색으로 채워진다.(선굵기가 box_width와 동일하게 됨.)  ??
     * @return String : 라벨 바코드 오브젝트에 대한 ZPL 스크립트값
     */
    public String codeMatrixScript(String xPosition, String yPosition, String barcodeModuleWidth, String barcode2Dsize, String landscape, String labelValue)
    {
        String retBuf = "";
        if( "".equals(labelValue.trim()) )
        {
            retBuf = "";
        }
        else
        {
            retBuf = "^FT" + xPosition.trim() + "," + yPosition.trim() + "^BX" + landscape.trim() + "," + barcode2Dsize.trim() + ",200,0,0,1^FD" + labelValue + "^FS";
        }

        return retBuf;
    }
    // End of codeMatrixScript
    //----------------------------------------------------------

    /**
	 * @메소드명 : getLabelObjectMapListToZplScript
	 * @작성일 : 2020.06.01
	 * @author : COM
	 * @변경이력 :
	 * @메소드 설명 : 라벨 오브젝트 리스트 데이터를 ZPL 스크립트로 변환 리턴.
     * @param listParam : 라벨 오브젝트 리스트 데이터
     * @return String  변환된 ZPL 스크립트
     * @throws Exception
     */
    public static String getLabelObjectMapListToZplScript(List<Map<String,Object>> listParam) throws Exception
    {
        String labelScript = "";
        boolean rowCheck = true;
        String xPosition = "";
        String yPosition = "";
        String boxWidth = "";
        String boxHeight = "";
        String lineThikness = "";
        String labelValue = "";
        String landscape = "";
        String barcodeModuleWidth = "";
        String barcodeHeight = "";
        String barcodeTextUnderYn = "";
        String barcodeRatio = "";
        String barcode2Dsize = "";

        ZplScriptPrintUtil label = new ZplScriptPrintUtil();
        labelScript = "^XA";

        for(int i=0;i < listParam.size(); i++)
        {
            if( "STRING_KOR".equals( listParam.get(i).get("methodId").toString() ) )
            {
                labelScript = "^XA^SEE:UHANGUL.DAT^CW1,E: SLIMGULIM.FNT^CI28";
                break;
            }
        }
        System.out.println("@@@###000 labelScript : " + labelScript);

        for (int i=0;i < listParam.size();i++)
        {
            //공통
            xPosition            = returnMmToPix( listParam.get(i).get("xPositionMm").toString(), listParam.get(i).get("xPositionPix").toString() );
            yPosition            = returnMmToPix( listParam.get(i).get("yPositionMm").toString(), listParam.get(i).get("yPositionPix").toString() );
            boxWidth             = returnMmToPix( listParam.get(i).get("widthAreaMm").toString(), listParam.get(i).get("widthAreaPix").toString() );
            boxHeight            = returnMmToPix( listParam.get(i).get("heightAreaMm").toString(), listParam.get(i).get("heightAreaPix").toString() );
            
            lineThikness         = ( listParam.get(i).get("lineThickness") == null ) ? "" : listParam.get(i).get("lineThickness").toString();
            
            String tmpLabelValue = ( listParam.get(i).get("labelValue")    == null ) ? "" : listParam.get(i).get("labelValue").toString();
            labelValue           = returnLabelValueDecoder( tmpLabelValue );

            landscape            = ( listParam.get(i).get("landscape")     == null ) ? "" : listParam.get(i).get("landscape").toString();
            
            barcodeModuleWidth   = returnWidthTo( listParam.get(i).get("barcodeModuleWidth").toString() );
            barcodeHeight        = returnMmToPix( listParam.get(i).get("barcodeHeightMm").toString(), listParam.get(i).get("barcodeHeightPix").toString() );
            
            barcodeTextUnderYn   = ( listParam.get(i).get("barcodeTextUnderYn") == null ) ? "" : listParam.get(i).get("barcodeTextUnderYn").toString();
            
            barcodeRatio         = returnWidthTo( listParam.get(i).get("barcodeRatio").toString() );
            barcode2Dsize        = returnWidthTo( listParam.get(i).get("barcode2dSize").toString() );

            System.out.println("@@@###000 methodId0 : " + listParam.get(i).get("methodId").toString());

            //라인오브젝트 스크립트 리턴
            if( "LABEL_BOX_LINE".equals( listParam.get(i).get("methodId").toString() ) )
            {
            	System.out.println(">>>i = " + i);
                System.out.println("@@@###000 xPosition : " + xPosition);
                System.out.println("@@@###000 yPosition : " + yPosition);
                System.out.println("@@@###000 boxWidth : " + boxWidth);
                System.out.println("@@@###000 boxHeight : " + boxHeight);
                System.out.println("@@@###000 lineThikness : " + lineThikness);
                System.out.println("@@@###000 labelValue : " + labelValue);
                
            	labelScript += label.lineScript(xPosition, yPosition, boxWidth, boxHeight, lineThikness, labelValue);
//            	if(i==12) break;
            	continue;
            }
//            if( !"LABEL_BOX_LINE".equals( listParam.get(i).get("methodId").toString() ) ) { break; }

            //영문자 스크립트 리턴
            if( "STRING_ENG".equals( listParam.get(i).get("methodId").toString() ) )
            {
            	labelScript += label.englishScript(xPosition, yPosition, boxWidth, boxHeight, lineThikness, labelValue, landscape);
            	continue;
            }

            //한글 스크립트 리턴
            if( "STRING_KOR".equals( listParam.get(i).get("methodId").toString() ) )
            {
            	System.out.println(">>>============================================================");
            	System.out.println(">>>i = " + i);
                System.out.println("@@@###000 xPosition : " + xPosition);
                System.out.println("@@@###000 yPosition : " + yPosition);
                System.out.println("@@@###000 boxWidth : " + boxWidth);
                System.out.println("@@@###000 boxHeight : " + boxHeight);
                System.out.println("@@@###000 lineThikness : " + lineThikness);
                System.out.println("@@@###000 labelValue : " + labelValue);
                System.out.println("@@@###000 landscape : " + landscape);
                
            	//굴림체가 너무 얇아 굵게 찍기 위하여 2번 실행(x축, y축 0.5mm씩 이동)
            	labelScript += label.koreaScript(xPosition, yPosition, boxWidth, boxHeight, lineThikness, labelValue, landscape);
                System.out.println("@@@###000 KORT labelScript : " + labelScript);
//            	if(i==13) break;
            	continue;
            }
//            if( !"STRING_KOR".equals( listParam.get(i).get("methodId").toString() ) ) { break; }

            //Code128 스크립트 리턴
            if( "BARCODE_128".equals( listParam.get(i).get("methodId").toString() ) )
            {
            	labelScript += label.code128Script(xPosition, yPosition, barcodeModuleWidth, barcodeHeight, landscape, barcodeTextUnderYn, labelValue);
            	continue;
            }

            //Code39 스크립트 리턴
            if( "BARCODE_39".equals( listParam.get(i).get("methodId").toString() ) )
            {
            	labelScript += label.code39Script(xPosition, yPosition, barcodeModuleWidth, barcodeRatio, barcodeHeight, landscape, barcodeTextUnderYn, labelValue);
            	continue;
            }

            //Code93 스크립트 리턴
            if( "BARCODE_93".equals( listParam.get(i).get("methodId").toString() ) )
            {
            	labelScript += label.code93Script(xPosition, yPosition, barcodeModuleWidth, barcodeRatio, barcodeHeight, landscape, barcodeTextUnderYn, labelValue);
            	continue;
            }

            //Code EAN-13 스크립트 리턴
            if( "BARCODE_EAN-13".equals( listParam.get(i).get("methodId").toString() ) )
            {
            	labelScript += label.codeEAN13Script(xPosition, yPosition, barcodeModuleWidth, barcodeHeight, landscape, barcodeTextUnderYn, labelValue);
            	continue;
            }

            //Code EAN-8 스크립트 리턴
            if( "BARCODE_EAN-8".equals( listParam.get(i).get("methodId").toString() ) )
            {
            	labelScript += label.codeEAN8Script(xPosition, yPosition, barcodeModuleWidth, barcodeHeight, landscape, barcodeTextUnderYn, labelValue);
            	continue;
            }

            //Code UPC 스크립트 리턴
            if( "BARCODE_UPC".equals( listParam.get(i).get("methodId").toString() ) )
            {
            	labelScript += label.codeUpcScript(xPosition, yPosition, barcodeModuleWidth, barcodeHeight, landscape, barcodeTextUnderYn, labelValue);
            	continue;
            }

            //Code PDF417 스크립트 리턴
            if( "BARCODE_PDF417".equals( listParam.get(i).get("methodId").toString() ) )
            {
            	labelScript += label.codePdf417Script(xPosition, yPosition, barcodeModuleWidth, barcode2Dsize, landscape, labelValue);
            	continue;
            }

            //QR코드 스크립트 리턴
            if( "BARCODE_QR".equals( listParam.get(i).get("methodId").toString() ) )
            {
            	labelScript += label.codeQrScript(xPosition, yPosition, barcodeModuleWidth, barcode2Dsize, landscape, labelValue);
            	continue;
            }

            //QR코드(FT) 스크립트 리턴
            if( "BARCODE_QR(FT)".equals( listParam.get(i).get("methodId").toString() ) )
            {
            	labelScript += label.codeQrFtScript(xPosition, yPosition, barcodeModuleWidth, barcode2Dsize, landscape, labelValue);
            	continue;
            }

            //Data Matrix 스크립트 리턴
            if( "BARCODE_MATRIX".equals( listParam.get(i).get("methodId").toString() ) )
            {
            	labelScript += label.codeMatrixScript(xPosition, yPosition, barcodeModuleWidth, barcode2Dsize, landscape, labelValue);
            	continue;
            }

//            if(i==13) break;
        }
        labelScript += "^XZ";
     
        System.out.println("@@@###999 labelScript : " + labelScript);
        return labelScript;
    }
    // End of getLabelObjectMapListToZplScript
    //----------------------------------------------------------
    
        
}
