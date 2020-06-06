package com.thirautech.mom.util;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class B2BIUtil {
	public static List listXmlDmz(String xmlFile, Map<String, Object> param) throws Exception {
        //확장자
		String fileName[] = xmlFile.split("\\.");
        List list = new ArrayList();
        if (fileName[fileName.length - 1].equals("xml")) {
            File file = new File(xmlFile);
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document doc = db.parse(file);
            
            doc.getDocumentElement().normalize();
            NodeList nodeOrgIdList = doc.getElementsByTagName("ORGANIZATION_ID"); //org id (사업부)
            NodeList nodeOrgCodeList = doc.getElementsByTagName("ORGANIZATION_CODE"); //org code (사업부 코드)
            NodeList nodeVendorSiteCdList = doc.getElementsByTagName("VENDOR_SITE_CODE"); //vendor site code (업체 코드)
            NodeList nodeColSpecList = doc.getElementsByTagName("BPEL_COL_SPEC");	 //table col id
            NodeList nodeColValueList = doc.getElementsByTagName("BPEL_DATA");		 //table col value

            //org Id setting
            Node nodeOrgId = nodeOrgIdList.item(0);
            Element orgIdElmnt = (Element) nodeOrgId;
            
            //org Code setting
            Node nodeOrgCode;
            Element orgCodeElmnt;
            String orgCode = "";
            if(nodeOrgCodeList.getLength() > 0) {
            	nodeOrgCode = nodeOrgCodeList.item(0);
            	orgCodeElmnt = (Element) nodeOrgCode;
            	orgCode = orgCodeElmnt.getTextContent();
            } else {
            	if(param.get("orgCode") != null) {
                	orgCode = (String)param.get("orgCode");
                }
            }
            
            //vendor site Cd setting
            Node nodeVendorSiteCd = nodeVendorSiteCdList.item(0);
            Element vendorSiteCdElmnt = (Element) nodeVendorSiteCd;
            String vendorSiteCd = "";
            if(nodeVendorSiteCdList.getLength() > 0) {
            	vendorSiteCd = vendorSiteCdElmnt.getTextContent();
            }
            
            //col Id setting
            Node nodeColSpec = nodeColSpecList.item(0);
            String[] strColSpecList = {};
            if (nodeColSpec.getNodeType() == Node.ELEMENT_NODE) {
            	Element colSpecElmnt = (Element) nodeColSpec;
            	strColSpecList = colSpecElmnt.getTextContent().split("\\|");
            }
            
            //col value setting
            String[] strColValueList;
            String colSpec = "";
            Map<String, Object> map;
            
            for (int s = 0; s < nodeColValueList.getLength(); s++) {
                Node nodeColValue = nodeColValueList.item(s);

                if (nodeColValue.getNodeType() == Node.ELEMENT_NODE) {
                	map = new HashMap<String, Object>();
                	Element fstElmnt = (Element) nodeColValue;
                    strColValueList = fstElmnt.getTextContent().split("\\|");
                    
                	map.put("organizationId", orgIdElmnt.getTextContent());
                    map.put("organizationCode", orgCode);
                    map.put("workDate", param.get("workDate"));
                    if(!"".equals(vendorSiteCd)) {
                    	map.put("vendorSiteCode", vendorSiteCd);
                    }
//                    System.out.println(s + "...strColSpecList.length ::: " + strColSpecList.length + " -- strColValueList.length ::: " + strColValueList.length);
                    
                    if(strColSpecList.length <= strColValueList.length) {
                    	for(int j=0; j<strColSpecList.length; j++) {
                        	colSpec = FrameworkUtil.toCamelCase(strColSpecList[j]);
//                        	System.out.println(j + " ::: " + colSpec + " == " + strColValueList[j]);
                        	if(strColValueList[j].equals("NULL")) {
                        		map.put(colSpec, "");
                        	} else {
                        		map.put(colSpec, strColValueList[j].replaceAll("&#38;", "\\&").replaceAll("&#47;", "\\/"));
                        	}
                    		
                    	}
                    } else {
                    	for(int j=0; j<strColValueList.length; j++) {
                        	colSpec = FrameworkUtil.toCamelCase(strColSpecList[j]);
                        	if(strColValueList[j].equals("NULL")) {
                        		map.put(colSpec, "");
                        	} else {
                        		map.put(colSpec, strColValueList[j].replaceAll("&#38;", "\\&").replaceAll("&#47;", "\\/"));
                        	}
                    		
                    	}
                    }
                    
                    list.add(map);
                }
            }
        }
        return list;
    }
}
