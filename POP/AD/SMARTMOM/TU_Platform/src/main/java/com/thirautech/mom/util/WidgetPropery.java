package com.thirautech.mom.util;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

import com.thirautech.mom.literal.MomLiteral;

public class WidgetPropery {
	public static Map<String, Object> readConfiguration(String file) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("use", "N");
		
		if(file == null || file.equals("")) {
			return map;
		}
		
		try {
			InputStream inputStream = new FileInputStream(MomLiteral.REPOSITORY_CONFIG + file);
			InputStreamReader inputStreamReader = new InputStreamReader(inputStream, "UTF-8");
			BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
			String line = null;
			while((line = bufferedReader.readLine()) != null) {
				line = line.trim();
				if(line.length() < 4 || line.indexOf("=") < 0 || line.charAt(0) == '#') {
					continue;
				}
				
				String key = line.substring(0, line.indexOf("=")).trim();
				String value = line.substring(line.indexOf("=")+1).trim();
				if(value.length() < 1 || (!key.equals("use") && value.charAt(0) == 'N')) {
					continue;
				}
				
				map.put(key, value);
			}
			
			bufferedReader.close();
			inputStreamReader.close();
			inputStream.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			
			map.put("use", "N");
			return map;
		} finally {
			if(map.get("use").toString().equals("Y") && map.get("len") == null) {
				int len = 0;
				for(String key : map.keySet()) {
					if(!key.equals("use") && !map.get(key).equals("N")) {
						len = ((String)map.get(key)).split("\\|").length;
						break;
					}
				}
				
				map.put("len", len);
			}
		}
		
		return map;
	}
}
