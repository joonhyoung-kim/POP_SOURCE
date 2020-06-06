package com.thirautech.mom.util;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import com.thirautech.mom.dao.MomDao;

public class EncryptionUtil {
	public static String seed;
	public static Random random;
	public static List<Map<String, Object>> result;
	
	public static String ENC = "ENCTYPTION";
	
	public static Map<String, Object> matrix1;
	static {
		if(EncryptionUtil.seed == null) {
			EncryptionUtil.seed = "";
			Random random = new Random(8876L);
			for(int i = 0; i < 100; i++) {
				EncryptionUtil.seed += String.valueOf(Math.abs(random.nextInt()) % 10);
			}
		}
		
		if(EncryptionUtil.random == null) {
			EncryptionUtil.random = new Random(System.currentTimeMillis());
		}
		
		if(EncryptionUtil.matrix1 == null) {
			EncryptionUtil.matrix1 = new HashMap<String, Object>();
			EncryptionUtil.matrix1.put("a",   0); EncryptionUtil.matrix1.put("b",   1); EncryptionUtil.matrix1.put("c",  2); EncryptionUtil.matrix1.put("d",  3); EncryptionUtil.matrix1.put("e",  4); EncryptionUtil.matrix1.put("f",  5); EncryptionUtil.matrix1.put("g",  6); EncryptionUtil.matrix1.put("h",  7); EncryptionUtil.matrix1.put("i",  8); EncryptionUtil.matrix1.put("j",  9);
			EncryptionUtil.matrix1.put("k",  10); EncryptionUtil.matrix1.put("l",  11); EncryptionUtil.matrix1.put("m", 12); EncryptionUtil.matrix1.put("n", 13); EncryptionUtil.matrix1.put("o", 14); EncryptionUtil.matrix1.put("p", 15); EncryptionUtil.matrix1.put("q", 16); EncryptionUtil.matrix1.put("r", 17); EncryptionUtil.matrix1.put("s", 18); EncryptionUtil.matrix1.put("t", 19);
			EncryptionUtil.matrix1.put("u",  20); EncryptionUtil.matrix1.put("v",  21); EncryptionUtil.matrix1.put("w", 22); EncryptionUtil.matrix1.put("x", 23); EncryptionUtil.matrix1.put("y", 24); EncryptionUtil.matrix1.put("z", 25); 
			EncryptionUtil.matrix1.put("A",  26); EncryptionUtil.matrix1.put("B",  27); EncryptionUtil.matrix1.put("C", 28); EncryptionUtil.matrix1.put("D", 29); EncryptionUtil.matrix1.put("E", 30); EncryptionUtil.matrix1.put("F", 31); EncryptionUtil.matrix1.put("G", 32); EncryptionUtil.matrix1.put("H", 33); EncryptionUtil.matrix1.put("I", 34); EncryptionUtil.matrix1.put("J", 35);
			EncryptionUtil.matrix1.put("K",  36); EncryptionUtil.matrix1.put("L",  37); EncryptionUtil.matrix1.put("M", 38); EncryptionUtil.matrix1.put("N", 39); EncryptionUtil.matrix1.put("O", 40); EncryptionUtil.matrix1.put("P", 41); EncryptionUtil.matrix1.put("Q", 42); EncryptionUtil.matrix1.put("R", 43); EncryptionUtil.matrix1.put("S", 44); EncryptionUtil.matrix1.put("T", 45);
			EncryptionUtil.matrix1.put("U",  46); EncryptionUtil.matrix1.put("V",  47); EncryptionUtil.matrix1.put("W", 48); EncryptionUtil.matrix1.put("X", 49); EncryptionUtil.matrix1.put("Y", 50); EncryptionUtil.matrix1.put("Z", 51); 
			EncryptionUtil.matrix1.put("0",  52); EncryptionUtil.matrix1.put("1",  53); EncryptionUtil.matrix1.put("2", 54); EncryptionUtil.matrix1.put("3", 55); EncryptionUtil.matrix1.put("4", 56); EncryptionUtil.matrix1.put("5", 57); EncryptionUtil.matrix1.put("6", 58); EncryptionUtil.matrix1.put("7", 59); EncryptionUtil.matrix1.put("8", 60); EncryptionUtil.matrix1.put("9", 61);
			EncryptionUtil.matrix1.put("-",  62); EncryptionUtil.matrix1.put("_",  63); EncryptionUtil.matrix1.put("|", 64); EncryptionUtil.matrix1.put("@", 65); EncryptionUtil.matrix1.put("%", 66); 
			EncryptionUtil.matrix1.put("*",  67); EncryptionUtil.matrix1.put(":",  68); EncryptionUtil.matrix1.put(";", 69); EncryptionUtil.matrix1.put("(", 70); EncryptionUtil.matrix1.put(")", 71); EncryptionUtil.matrix1.put(",", 72); EncryptionUtil.matrix1.put(".", 73);
		}
		
		if(EncryptionUtil.result == null) {
			EncryptionUtil.result = new ArrayList<Map<String, Object>>();
		}
	}
	
	public static String[] matrix2 = {
		 "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"
		,"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
		,"0","1","2","3","4","5","6","7","8","9"
		,"-","_","|","@","%"
		,"*",":",";","(",")",",","."
	};
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub		
		String paths = "D:/Eclipse-CJ/workspace/TU_Platform/src/main/resources/mybatis/sql/mom/reference/resource/";
		
		//EncryptionUtil.enDecodingDir(paths, true, true);
		//EncryptionUtil.enDecodingDir(paths, false, true);
		//System.out.println("ENCTYPTIONpiA(Aiveor_ojyw = " + EncryptionUtil.encodingQueryId("ENCTYPTIONpiA(Aiveor_ojyw"));
	}
	
	public static Map<String,Object> doJob(MomDao momDao, String query, List<Map<String,Object>> param) {
		if(!query.equals("com.thirautech.mom.encryption.create_encryption") && !query.equals("com.thirautech.mom.encryption.create_decryption")) {
			return null;
		} else if(param == null || param.size() < 1) {
			return FrameworkUtil.createResponseMap(null, true);
		}
		
		String paths = param.get(0).get("paths").toString();
		if(paths.charAt(paths.length() - 1) != '/') {
			paths += "/";
		}
		
		List<Map<String, Object>> list = null;
		if(query.equals("com.thirautech.mom.encryption.create_encryption")) {
			list = EncryptionUtil.enDecodingDir(paths, true, true);
		} else {
			list = EncryptionUtil.enDecodingDir(paths, false, true);
			query = "com.thirautech.mom.encryption.create_encryption";
		}
		
		for(int i = 0; i < list.size(); i++) {
			list.get(i).put("divisionCd", param.get(0).get("divisionCd"));
			list.get(i).put("companyCd", param.get(0).get("companyCd"));
			list.get(i).put("userId", param.get(0).get("userId"));
		}

		return momDao.createMapList(query, list);
	}
	
	public static List<Map<String, Object>> enDecodingDir(String paths, boolean flag, boolean isFirst) {
		if(isFirst) {
			EncryptionUtil.result.clear();			
		}
		
		File dir = new File(paths);
		File[] fileList = dir.listFiles();
		
		try{
			for(int i = 0 ; i < fileList.length ; i++) {
				File file = fileList[i]; 
				if(file.isFile()) {
					if(file.getName().indexOf(".xml") < 0) {	// Mybatis가 아니면 무시
						continue;
					}
					
					// 파일이 있다면 파일 이름 출력
					Map<String, Object> map = new HashMap<String, Object>();
					map.put("page", paths/* + "\\"*/ + file.getName());
					if(file.getName().indexOf("vendor_sql.xml") >= 0) {
						boolean result = EncryptionUtil.enDecodingPage(paths/* + "\\"*/ + file.getName(), flag);
						if(result) {
							if(flag) {
								map.put("encryption", "ENCRYPTION");
							} else {
								map.put("encryption", "DECRYPTION");
							}
						} else {
							map.put("encryption", "FAIL");
						}
					} else {
						map.put("encryption", "HOLDING");
					}
					
					EncryptionUtil.result.add(map);
				} else if(file.isDirectory()) {
					// 서브디렉토리가 존재하면 재귀적 방법으로 다시 탐색
					EncryptionUtil.enDecodingDir(file.getCanonicalPath().toString(), flag, false); 
				}
			}

		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return EncryptionUtil.result;
	}
	
	public static boolean enDecodingPage(String paths, boolean flag) {
		try {
			File file = new File(paths);
			BufferedReader bufferedReader = new BufferedReader(new FileReader(file));
			
			List<String> list = new ArrayList<String>();
			String line;

		    while((line = bufferedReader.readLine()) != null) {
		    	if(line.indexOf("<?xml") >= 0 || line.indexOf("<!DOCTYPE") >= 0 || line.indexOf("mapper") >= 0) {
		    		list.add(line);
		    		continue;
		    	}
		    	
	    		if(flag) {
	    			line = EncryptionUtil.encoding(line);
	    		} else {
	    			line = EncryptionUtil.decoding(line);
	    		}
		    	
		    	list.add(line);
		    }
		    
		    bufferedReader.close();
		    
		    BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(file));
		    
			for(int i = 0; i < list.size(); i++) {
		    	bufferedWriter.write(list.get(i));
		    	bufferedWriter.newLine();
		    }
		    
		    bufferedWriter.close();
		} catch (Exception e) {
			e.printStackTrace();
	        return false;
	    }
		
		return true;
	}
	
	public static String encoding(String line/*, String namespace, String queryId, Map<String, Object> map*/) {
		if(line == null || line.length() == 0) {
			return "";
		} else if(line.indexOf(EncryptionUtil.ENC) > 0) {
			return line;
		}
		
		for(int i = line.length()-1; i >= 0; i--) {
			if(line.charAt(i) == ' ' || line.charAt(i) == '\t') {
				line = line.substring(0, i);
			} else {
				break;
			}
		}
		
		String newLine = ""; 
		int N = EncryptionUtil.matrix2.length;
		
		if(line.indexOf("<mapper") >= 0 || line.indexOf("<select id") >= 0 || line.indexOf("<insert id") >= 0 || line.indexOf("<update id") >= 0 || line.indexOf("<delete id") >= 0) {
			return line;
		/*if(line.indexOf("<mapper") >= 0 && line.indexOf("namespace") >= 0) {
			String[] tokens = line.split("\"");
			newLine += (tokens[0] + "\"");
			
			String namespaceEnc = "";
			for(int i = 0; i < tokens[1].length(); i++) {	
				if(i == 0) {
					namespaceEnc = EncryptionUtil.ENC;
				}
				namespaceEnc += EncryptionUtil.matrix2[((int)EncryptionUtil.matrix1.get(tokens[1].substring(i, i+1)) + Integer.parseInt(EncryptionUtil.seed.substring(i%100, i%100+1))+N) % N];
			}
			
			newLine += namespaceEnc;
			newLine += ("\"" + tokens[2]);
			
			return newLine; 
		} else if(line.indexOf("<select id") >= 0 || line.indexOf("<insert id") >= 0 || line.indexOf("<update id") >= 0 || line.indexOf("<delete id") >= 0) {
			String[] tokens = line.split("\"");
			newLine += (tokens[0] + "\"");
			
			String queryIdEnc = "";
			for(int i = 0; i < tokens[1].length(); i++) {
				if(i == 0) {
					queryIdEnc = EncryptionUtil.ENC;
				}
				queryIdEnc += EncryptionUtil.matrix2[((int)EncryptionUtil.matrix1.get(tokens[1].substring(i, i+1)) + Integer.parseInt(EncryptionUtil.seed.substring(i%100, i%100+1))+N) % N];
			}
			
			newLine += queryIdEnc;
			for(int i = 2; i < tokens.length; i++) {	
				newLine += ("\"" + tokens[i]);
			}
			
			return newLine;*/
		} else if(line.indexOf("<if test") >= 0/* || line.indexOf("<select id") >= 0*/) {
			String[] tokens = line.split("\"");
			newLine += (tokens[0] + "\"");
			
			String queryIdEnc = "";
			int lineLen = tokens[1].length();
			for(int i = 0; i < lineLen; i++) {
				if(i == 0) {
					queryIdEnc = EncryptionUtil.ENC;
				}
				if(i <= lineLen-2 && tokens[1].substring(i, i+2).equals("eq")) {
					queryIdEnc += "eq";
					i += 1;
					continue;
				} else if(i <= lineLen-3 && tokens[1].substring(i, i+3).equals("neq")) {
					queryIdEnc += "neq";
					i += 2;
					continue;
				} else if(i <= lineLen-3 && tokens[1].substring(i, i+3).equals("and")) {
					queryIdEnc += "and";
					i += 2;
					continue;
				} else if(i <= lineLen-2 && tokens[1].substring(i, i+2).equals("or")) {
					queryIdEnc += "or";
					i += 1;
					continue;
				} else if(i <= lineLen-4 && tokens[1].substring(i, i+4).equals("null")) {
					queryIdEnc += "null";
					i += 3;
					continue;
				}
				
				String ch = tokens[1].substring(i, i+1);
				if(ch.equals(" ") || ch.equals("!") || ch.equals("=") || ch.equals("'")) {
					queryIdEnc += ch;
					continue;
				}
				
				queryIdEnc += EncryptionUtil.matrix2[((int)EncryptionUtil.matrix1.get(tokens[1].substring(i, i+1)) + Integer.parseInt(EncryptionUtil.seed.substring(i%100, i%100+1))+N) % N];
			}
			
			newLine += queryIdEnc;
			for(int i = 2; i < tokens.length; i++) {	
				newLine += ("\"" + tokens[i]);
			}
			
			return newLine;
		} else if(line.indexOf("</select") >= 0 || line.indexOf("</insert") >= 0 || line.indexOf("</update") >= 0 || line.indexOf("</delete") >= 0) {
			return line;
		} else if(line.indexOf("</if") >= 0 || line.indexOf("<choose") >= 0 || line.indexOf("</choose") >= 0) {
			return line;
		}
		
		int rnd = Math.abs(EncryptionUtil.random.nextInt()) % 26;		
		int lineLen = line.length();
		
		for(int i = 0; i < lineLen; i++) {
			char ch = line.charAt(i);
			String str = line.substring(i, i+1);
		
			if(ch == ' ' || ch == '\t' || ch == '#' || ch == '\'' || ch == '\"' || ch == '!' || ch == '=' || ch == '{' || ch == '}' || ch == '<' || ch == '>' || ch == '/') {
				if(i <= lineLen-9 && line.substring(i, i+9).equals("<![CDATA[")) {
					newLine += "<![CDATA[";
					i += 8;
					continue;
				}
				
				newLine += str;
			} else if(i <= lineLen-3 && line.substring(i, i+3).equals("<if")) {
				newLine += "<if";
				i += 2;
			} else if(i <= lineLen-5 && line.substring(i, i+5).equals("<when")) {
				newLine += "<when";
				i += 4;
			} else if(i <= lineLen-5 && (line.indexOf("<if") >= 0 || line.indexOf("<when") >= 0) && line.substring(i, i+5).equals("test")) {
				newLine += " test";
				i += 4;
			} /*else if(i <= lineLen-2 && line.substring(i, i+2).equals("eq")) {
				newLine += "eq";
				i += 1;
			} else if(i <= lineLen-3 && line.substring(i, i+3).equals("neq")) {
				newLine += "neq";
				i += 2;
			}*/ else if(i <= lineLen-4 && (line.indexOf("<if") >= 0 || line.indexOf("<when") >= 0) && line.substring(i, i+4).equals("and")) {
				newLine += " and";
				i += 3;
			} else if(i <= lineLen-3 && (line.indexOf("<if") >= 0 || line.indexOf("<when") >= 0) && line.substring(i, i+3).equals(" or")) {
				newLine += " or";
				i += 2;
			} else if(i <= lineLen-4 && (line.indexOf("<if") >= 0 || line.indexOf("<when") >= 0) && line.substring(i, i+4).equals("null")) {
				newLine += "null";
				i += 3;
			} else if(i <= lineLen-8 && line.substring(i, i+8).equals("jdbcType")) {
				newLine += "jdbcType";
				i += 7;
			} else if(i <= lineLen-8 && line.substring(i, i+8).equals("javaType")) {
				newLine += "javaType";
				i += 7;
			} else if(i <= lineLen-7 && line.substring(i, i+7).equals("VARCHAR")) {
				newLine += "VARCHAR";
				i += 6;
			} else if(i <= lineLen-7 && line.substring(i, i+7).equals("INTEGER")) {
				newLine += "INTEGER";
				i += 6;
			} else if(i <= lineLen-4 && line.substring(i, i+4).equals("CLOB")) {
				newLine += "CLOB";
				i += 3;
			} else if(i <= lineLen-6 && line.substring(i, i+6).equals("String")) {
				newLine += "String";
				i += 5;
			} else if(i <= lineLen-7 && line.indexOf("jdbcType") >= 0 && line.substring(i, i+7).equals("mode=IN")) {
				newLine += "mode=IN";
				i += 6;
			} else if(i <= lineLen-8 && line.indexOf("jdbcType") >= 0 && line.substring(i, i+8).equals("mode=OUT")) {
				newLine += "mode=OUT";
				i += 7;
			} else if(i <= lineLen-4 && line.substring(i, i+4).equals("<!--")) {
				newLine += "<!--";
				i += 3;
			} else if(i <= lineLen-3 && line.substring(i, i+3).equals("-->")) {
				newLine += "-->";
				i += 2;
			} else if(i <= lineLen-3 && line.substring(i, i+3).equals("]]>")) {
				newLine += "]]>";
				i += 2;
			} else if(i <= lineLen-4 && line.substring(i, i+4).equals("&lt;")) {
				newLine += "&lt;";
				i += 3;
			} else if(i <= lineLen-4 && line.substring(i, i+4).equals("&gt;")) {
				newLine += "&gt;";
				i += 3;
			} else {
				if((int)str.charAt(0) >= 44032) {
					if((int)str.charAt(0) + Integer.parseInt(EncryptionUtil.seed.substring((i+rnd)%100, (i+rnd)%100+1)) + 2000 > 55203) {
						newLine += String.valueOf((char)((int)str.charAt(0) + Integer.parseInt(EncryptionUtil.seed.substring((i+rnd)%100, (i+rnd)%100+1)) + 2000 - 55203 + 44032 - 1));
					} else {
						newLine += String.valueOf((char)((int)str.charAt(0) + Integer.parseInt(EncryptionUtil.seed.substring((i+rnd)%100, (i+rnd)%100+1)) + 2000));
					}
				} else {
					newLine += EncryptionUtil.matrix2[((int)EncryptionUtil.matrix1.get(str) + Integer.parseInt(EncryptionUtil.seed.substring((i+rnd)%100, (i+rnd)%100+1))+N) % N];
				}
				
				/*if(i > 0 && newLine.substring(i-1, i+1).equals("eq")) {
					newLine = newLine.substring(0, i-1) + "&eq";
				} else if(i > 0 && newLine.substring(i-1, i+1).equals("or")) {
					newLine = newLine.substring(0, i-1) + "&or";
				} else if(i > 0 && newLine.substring(i-1, i+1).equals("if")) {
					newLine = newLine.substring(0, i-1) + "&if";
				} else if(i > 1 && newLine.substring(i-2, i+2).equals("neq")) {
					newLine = newLine.substring(0, i-2) + "&neq";
				} else if(i > 1 && newLine.substring(i-2, i+2).equals("and")) {
					newLine = newLine.substring(0, i-2) + "&and";
				} else if(i > 2 && newLine.substring(i-3, i+3).equals("when")) {
					newLine = newLine.substring(0, i-3) + "&when";
				} else if(i > 2 && newLine.substring(i-3, i+3).equals("test")) {
					newLine = newLine.substring(0, i-3) + "&test";
				} else if(i > 2 && newLine.substring(i-3, i+3).equals("null")) {
					newLine = newLine.substring(0, i-3) + "&null";
				}*/ 
			}
		}
		
		if(line.indexOf("-->") >= 0) {
			newLine = newLine.substring(0, newLine.indexOf("-->")) + String.valueOf((char)((int)('A') + rnd)) + newLine.substring(newLine.indexOf("-->"));
		} else {
			newLine += String.valueOf((char)((int)('A') + rnd));
		}
		
		return newLine + EncryptionUtil.ENC;
	}
	
	public static String decoding(String line) {
		if(line == null || line.length() == 0) {
			return "";
		} else if(line.length() <= EncryptionUtil.ENC.length()) {
			return line;
		} else if(line.length() > EncryptionUtil.ENC.length() && line.indexOf(EncryptionUtil.ENC) < 0) {
			return line;
		}
		
		/*if(EncryptionUtil.seed == null) {
			EncryptionUtil.seed = "";
			Random random = new Random(8876L);
			for(int i = 0; i < 100; i++) {
				EncryptionUtil.seed += String.valueOf(Math.abs(random.nextInt()) % 10);
			}
		}*/
		
		/*if(EncryptionUtil.matrix1 == null) {
			EncryptionUtil.matrix1 = new HashMap<String, Object>();
			EncryptionUtil.matrix1.put("a",   0); EncryptionUtil.matrix1.put("b",   1); EncryptionUtil.matrix1.put("c",  2); EncryptionUtil.matrix1.put("d",  3); EncryptionUtil.matrix1.put("e",  4); EncryptionUtil.matrix1.put("f",  5); EncryptionUtil.matrix1.put("g",  6); EncryptionUtil.matrix1.put("h",  7); EncryptionUtil.matrix1.put("i",  8); EncryptionUtil.matrix1.put("j",  9);
			EncryptionUtil.matrix1.put("k",  10); EncryptionUtil.matrix1.put("l",  11); EncryptionUtil.matrix1.put("m", 12); EncryptionUtil.matrix1.put("n", 13); EncryptionUtil.matrix1.put("o", 14); EncryptionUtil.matrix1.put("p", 15); EncryptionUtil.matrix1.put("q", 16); EncryptionUtil.matrix1.put("r", 17); EncryptionUtil.matrix1.put("s", 18); EncryptionUtil.matrix1.put("t", 19);
			EncryptionUtil.matrix1.put("u",  20); EncryptionUtil.matrix1.put("v",  21); EncryptionUtil.matrix1.put("w", 22); EncryptionUtil.matrix1.put("x", 23); EncryptionUtil.matrix1.put("y", 24); EncryptionUtil.matrix1.put("z", 25); 
			EncryptionUtil.matrix1.put("A",  26); EncryptionUtil.matrix1.put("B",  27); EncryptionUtil.matrix1.put("C", 28); EncryptionUtil.matrix1.put("D", 29); EncryptionUtil.matrix1.put("E", 30); EncryptionUtil.matrix1.put("F", 31); EncryptionUtil.matrix1.put("G", 32); EncryptionUtil.matrix1.put("H", 33); EncryptionUtil.matrix1.put("I", 34); EncryptionUtil.matrix1.put("J", 35);
			EncryptionUtil.matrix1.put("K",  36); EncryptionUtil.matrix1.put("L",  37); EncryptionUtil.matrix1.put("M", 38); EncryptionUtil.matrix1.put("N", 39); EncryptionUtil.matrix1.put("O", 40); EncryptionUtil.matrix1.put("P", 41); EncryptionUtil.matrix1.put("Q", 42); EncryptionUtil.matrix1.put("R", 43); EncryptionUtil.matrix1.put("S", 44); EncryptionUtil.matrix1.put("T", 45);
			EncryptionUtil.matrix1.put("U",  46); EncryptionUtil.matrix1.put("V",  47); EncryptionUtil.matrix1.put("W", 48); EncryptionUtil.matrix1.put("X", 49); EncryptionUtil.matrix1.put("Y", 50); EncryptionUtil.matrix1.put("Z", 51); 
			EncryptionUtil.matrix1.put("0",  52); EncryptionUtil.matrix1.put("1",  53); EncryptionUtil.matrix1.put("2", 54); EncryptionUtil.matrix1.put("3", 55); EncryptionUtil.matrix1.put("4", 56); EncryptionUtil.matrix1.put("5", 57); EncryptionUtil.matrix1.put("6", 58); EncryptionUtil.matrix1.put("7", 59); EncryptionUtil.matrix1.put("8", 60); EncryptionUtil.matrix1.put("9", 61);
			EncryptionUtil.matrix1.put("-",  62); EncryptionUtil.matrix1.put("_",  63); EncryptionUtil.matrix1.put("|", 64); EncryptionUtil.matrix1.put("@", 65); EncryptionUtil.matrix1.put("%", 66); 
			EncryptionUtil.matrix1.put("*",  67); EncryptionUtil.matrix1.put(":",  68); EncryptionUtil.matrix1.put(";", 69); EncryptionUtil.matrix1.put("(", 70); EncryptionUtil.matrix1.put(")", 71); EncryptionUtil.matrix1.put(",", 72); EncryptionUtil.matrix1.put(".", 73);
		}*/
		
		line = line.replace(EncryptionUtil.ENC, "");
		String newLine = "";
		int N = EncryptionUtil.matrix2.length;
		/*if(line.indexOf("<mapper") >= 0 && line.indexOf("namespace") >= 0) {
			//line = line.replace(EncryptionUtil.ENC, "");
			String[] tokens = line.split("\"");
			newLine += (tokens[0] + "\"");
			
			for(int i = 0; i < tokens[1].length(); i++) {	
				newLine += EncryptionUtil.matrix2[((int)EncryptionUtil.matrix1.get(tokens[1].substring(i, i+1)) - Integer.parseInt(EncryptionUtil.seed.substring(i%100, i%100+1))+N) % N];
			}
			
			newLine += ("\"" + tokens[2]);
			
			return newLine;
		} else if(line.indexOf("<select id") >= 0 || line.indexOf("<insert id") >= 0 || line.indexOf("<update id") >= 0 || line.indexOf("<delete id") >= 0) {
			//line = line.replace(EncryptionUtil.ENC, "");
			String[] tokens = line.split("\"");
			newLine += (tokens[0] + "\"");
			
			for(int i = 0; i < tokens[1].length(); i++) {				
				newLine += EncryptionUtil.matrix2[((int)EncryptionUtil.matrix1.get(tokens[1].substring(i, i+1)) - Integer.parseInt(EncryptionUtil.seed.substring(i%100, i%100+1))+N) % N];
			}
			
			for(int i = 2; i < tokens.length; i++) {	
				newLine += ("\"" + tokens[i]);
			}
			
			return newLine;
		} else */if(line.indexOf("<if test") >= 0/* || line.indexOf("<select id") >= 0*/) {
			//line = line.replace(EncryptionUtil.ENC, "");
			String[] tokens = line.split("\"");
			newLine += (tokens[0] + "\"");
			
			int lineLen = tokens[1].length();
			for(int i = 0; i < lineLen; i++) {
				if(i <= lineLen-2 && tokens[1].substring(i, i+2).equals("eq")) {
					newLine += "eq";
					i += 1;
					continue;
				} else if(i <= lineLen-3 && tokens[1].substring(i, i+3).equals("neq")) {
					newLine += "neq";
					i += 2;
					continue;
				} else if(i <= lineLen-3 && tokens[1].substring(i, i+3).equals("and")) {
					newLine += "and";
					i += 2;
					continue;
				} else if(i <= lineLen-2 && tokens[1].substring(i, i+2).equals("or")) {
					newLine += "or";
					i += 1;
					continue;
				} else if(i <= lineLen-4 && tokens[1].substring(i, i+4).equals("null")) {
					newLine += "null";
					i += 3;
					continue;
				}
				
				String ch = tokens[1].substring(i, i+1);
				if(ch.equals(" ") || ch.equals("!") || ch.equals("=") || ch.equals("'")) {
					newLine += ch;
					continue;
				}
				
				newLine += EncryptionUtil.matrix2[((int)EncryptionUtil.matrix1.get(tokens[1].substring(i, i+1)) - Integer.parseInt(EncryptionUtil.seed.substring(i%100, i%100+1))+N) % N];
			}
			
			for(int i = 2; i < tokens.length; i++) {	
				newLine += ("\"" + tokens[i]);
			}
			
			return newLine;
		} else if(line.indexOf("</select") >= 0 || line.indexOf("</insert") >= 0 || line.indexOf("</update") >= 0 || line.indexOf("</delete") >= 0) {
			return line;
		} else if(line.indexOf("</if") >= 0 || line.indexOf("<choose") >= 0 || line.indexOf("</choose") >= 0) {
			return line;
		}
		
		if(line.indexOf("-->") >= 0) {
			line = line.substring(0, line.indexOf("-->")-1) + line.substring(line.indexOf("-->")) + line.substring(line.indexOf("-->")-1, line.indexOf("-->"));
		}
		
		int rnd = (int)(line.substring(line.length()-1, line.length()).charAt(0)) - (int)('A');
		int lineLen = line.length();
		
		for(int i = 0; i < lineLen-1; i++) {
			char ch = line.charAt(i);
			String str = line.substring(i, i+1);
		
			if(ch == ' ' || ch == '\t' || ch == '#' || ch == '\'' || ch == '\"' || ch == '!' || ch == '=' || ch == '{' || ch == '}' || ch == '<' || ch == '>' || ch == '/') {
				if(i <= lineLen-9 && line.substring(i, i+9).equals("<![CDATA[")) {
					newLine += "<![CDATA[";
					i += 8;
					continue;
				}
				
				newLine += str;
			} else if(i <= lineLen-3 && line.substring(i, i+3).equals("<if")) {
				newLine += "<if";
				i += 2;
			} else if(i <= lineLen-5 && line.substring(i, i+5).equals("<when")) {
				newLine += "<when";
				i += 4;
			} else if(i <= lineLen-4 && (line.indexOf("<if") >= 0 || line.indexOf("<when") >= 0) && line.substring(i, i+4).equals("test")) {
				newLine += "test";
				i += 3;
			} /*else if(i <= lineLen-2 && line.substring(i, i+2).equals("eq")) {
				newLine += "eq";
				i += 1;
			} else if(i <= lineLen-3 && line.substring(i, i+3).equals("neq")) {
				newLine += "neq";
				i += 2;
			}*/ else if(i <= lineLen-4 && (line.indexOf("<if") >= 0 || line.indexOf("<when") >= 0) && line.substring(i, i+4).equals(" and")) {
				newLine += " and";
				i += 3;
			} else if(i <= lineLen-3 && (line.indexOf("<if") >= 0 || line.indexOf("<when") >= 0) && line.substring(i, i+3).equals(" or")) {
				newLine += " or";
				i += 2;
			} else if(i <= lineLen-4 && (line.indexOf("<if") >= 0 || line.indexOf("<when") >= 0) && line.substring(i, i+4).equals("null")) {
				newLine += "null";
				i += 3;
			} else if(i <= lineLen-8 && line.substring(i, i+8).equals("jdbcType")) {
				newLine += "jdbcType";
				i += 7;
			} else if(i <= lineLen-8 && line.substring(i, i+8).equals("javaType")) {
				newLine += "javaType";
				i += 7;
			} else if(i <= lineLen-7 && line.substring(i, i+7).equals("VARCHAR")) {
				newLine += "VARCHAR";
				i += 6;
			} else if(i <= lineLen-7 && line.substring(i, i+7).equals("INTEGER")) {
				newLine += "INTEGER";
				i += 6;
			} else if(i <= lineLen-4 && line.substring(i, i+4).equals("CLOB")) {
				newLine += "CLOB";
				i += 3;
			} else if(i <= lineLen-6 && line.substring(i, i+6).equals("String")) {
				newLine += "String";
				i += 5;
			} else if(i <= lineLen-7 && line.indexOf("jdbcType") >= 0 && line.substring(i, i+7).equals("mode=IN")) {
				newLine += "mode=IN";
				i += 6;
			} else if(i <= lineLen-8 && line.indexOf("jdbcType") >= 0 && line.substring(i, i+8).equals("mode=OUT")) {
				newLine += "mode=OUT";
				i += 7;
			} else if(i <= lineLen-4 && line.substring(i, i+4).equals("<!--")) {
				newLine += "<!--";
				i += 3;
			} else if(i <= lineLen-3 && line.substring(i, i+3).equals("-->")) {
				newLine += "-->";
				i += 2;
			} else if(i <= lineLen-3 && line.substring(i, i+3).equals("]]>")) {
				newLine += "]]>";
				i += 2;
			} else if(i <= lineLen-4 && line.substring(i, i+4).equals("&lt;")) {
				newLine += "&lt;";
				i += 3;
			} else if(i <= lineLen-4 && line.substring(i, i+4).equals("&gt;")) {
				newLine += "&gt;";
				i += 3;
			} else {
				if((int)str.charAt(0) >= 44032) {
					if((int)str.charAt(0) - Integer.parseInt(EncryptionUtil.seed.substring((i+rnd)%100, (i+rnd)%100+1)) - 2000 < 44032) {
						newLine += String.valueOf((char)((int)str.charAt(0) - Integer.parseInt(EncryptionUtil.seed.substring((i+rnd)%100, (i+rnd)%100+1)) - 2000 + 55203 - 44032 + 1));
					} else {
						newLine += String.valueOf((char)((int)str.charAt(0) - Integer.parseInt(EncryptionUtil.seed.substring((i+rnd)%100, (i+rnd)%100+1)) - 2000));
					}
				} else {
					newLine += EncryptionUtil.matrix2[((int)EncryptionUtil.matrix1.get(str) - Integer.parseInt(EncryptionUtil.seed.substring((i+rnd)%100, (i+rnd)%100+1))+N) % N];
				}
			}
		}
		
		return newLine;
	}
	
	/*public static String encodingQueryId(String queryId) {
		if(queryId.indexOf(EncryptionUtil.ENC) < 0) {
			return queryId;
		}
		
		queryId = queryId.substring(10);
		int N = EncryptionUtil.matrix2.length;
		int strLen = queryId.length();
		String encQueryId = EncryptionUtil.ENC;
		for(int i = 0; i < queryId.length(); i++) {
			if(i <= strLen-2 && queryId.substring(i, i+2).equals("eq")) {
				encQueryId += "eq";
				i += 1;
				continue;
			} else if(i <= strLen-3 && queryId.substring(i, i+3).equals("neq")) {
				encQueryId += "neq";
				i += 2;
				continue;
			} else if(i <= strLen-3 && queryId.substring(i, i+3).equals("and")) {
				encQueryId += "and";
				i += 2;
				continue;
			} else if(i <= strLen-2 && queryId.substring(i, i+2).equals("or")) {
				encQueryId += "or";
				i += 1;
				continue;
			} else if(i <= strLen-4 && queryId.substring(i, i+4).equals("null")) {
				encQueryId += "null";
				i += 3;
				continue;
			}
			
			encQueryId += EncryptionUtil.matrix2[((int)EncryptionUtil.matrix1.get(queryId.substring(i, i+1)) + Integer.parseInt(EncryptionUtil.seed.substring(i%100, i%100+1))+N) % N];
			//encQueryId += EncryptionUtil.matrix2[((int)EncryptionUtil.matrix1.get(queryId.substring(i, i+1)) - Integer.parseInt(EncryptionUtil.seed.substring(i%100, i%100+1))+N) % N];
		}
		
		return encQueryId;
	}*/
}
