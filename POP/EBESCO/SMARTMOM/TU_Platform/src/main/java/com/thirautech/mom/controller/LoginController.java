package com.thirautech.mom.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.thirautech.framework.security.manager.AuthManager;
import com.thirautech.framework.security.vo.LoginResult;
import com.thirautech.mom.realm.MomUserToken;
import com.thirautech.mom.service.MomService;
import com.thirautech.mom.util.FrameworkUtil;
import com.thirautech.mom.util.PrintUtil;

@RestController
@RequestMapping("/system")
public class LoginController {	
	@Autowired
	private MomService momService;
	
	@GetMapping("/login")
	public LoginResult login(MomUserToken token) {
		LoginResult result = AuthManager.login(token);
		
		if (result.equals(LoginResult.Success)) {
			AuthManager.setSessionAttribute("userId", token.getUserId());
			AuthManager.setSessionAttribute("divisionCd", token.getDivisionCd());
			AuthManager.setSessionAttribute("companyCd", token.getCompanyCd());
			AuthManager.setSessionAttribute("locale", token.getLocale());
					
			FrameworkUtil.checkMultiLanguage(momService, token.getCompanyCd(), token.getDivisionCd(), token.getLocale());
		}
		
		return result;
	}
	
	@GetMapping("/logout")
	public void logout(HttpServletRequest req) {
		try {
			String companyCd = AuthManager.getSessionAttribute("companyCd").toString();
			String divisionCd = AuthManager.getSessionAttribute("divisionCd").toString();
			String locale = AuthManager.getSessionAttribute("locale").toString();
			//String key = companyCd + divisionCd + locale;
			
			/*if(FrameworkUtil.multiLanguage.get(companyCd + divisionCd + locale + "SERVER") != null) {
				FrameworkUtil.multiLanguage.remove(companyCd + divisionCd + locale + "SERVER");
			}*/
			/*if(FrameworkUtil.multiLanguage.get(companyCd + divisionCd + locale + "XML") != null) {
				FrameworkUtil.multiLanguage.remove(companyCd + divisionCd + locale + "XML");
			}*/
		} catch(Exception e) {
		}
		
		AuthManager.logout();
		AuthManager.removeSessionAttribute("userId");
		AuthManager.removeSessionAttribute("divisionCd");
		AuthManager.removeSessionAttribute("companyCd");
		AuthManager.removeSessionAttribute("locale");
		System.out.println("Init !");
	}
	
	@GetMapping("/postLogout/{key}")
	public Object postLogout(@PathVariable String key) {
		/*if(FrameworkUtil.multiLanguage.get(key + "SERVER") != null) {
			FrameworkUtil.multiLanguage.remove(key + "SERVER");
		}*/
		/*if(FrameworkUtil.multiLanguage != null && FrameworkUtil.multiLanguage.get(key + "XML") != null) {
			FrameworkUtil.multiLanguage.remove(key + "XML");
		}*/
		
		return null;
	}
	
	@GetMapping("/session/{key}")
	public Object	getSessionAttribute(@PathVariable String key) {
		return AuthManager.getSessionAttribute(key);
	}
	
	@GetMapping("/loginCheck")
	public boolean loginCheck() throws IOException, ServletException {
		System.out.println("LoginId : " + AuthManager.getCurrentLoginId());
		return StringUtils.isEmpty(AuthManager.getCurrentLoginId()) ? false : true;
	}
	
	@GetMapping("/loginInfo")
	public Map<String,Object> getLoginInfo(HttpServletRequest request) {
		String query = "com.thirautech.mom.user.user";
		String ipAddress = request.getRemoteAddr();

		Map<String, Object> param = new HashMap<String, Object>();
		String userId = AuthManager.getSessionAttribute("userId").toString();
		String divisionCd = AuthManager.getSessionAttribute("divisionCd").toString();
		String companyCd = AuthManager.getSessionAttribute("companyCd").toString();
		String locale = AuthManager.getSessionAttribute("locale") == null ? null : AuthManager.getSessionAttribute("locale").toString();
		
		param.put("ipAddress", ipAddress);
		param.put("loginType", "I");
		
		query = FrameworkUtil.removeDummy(query, "I");
		param = FrameworkUtil.createParam(param, "I", null, userId, divisionCd, companyCd, locale);
		
		PrintUtil.print("LoginController", "getLoginInfo", "#", "$", "query", query, true, false, false, false);
		PrintUtil.print(null, null, null, "$", "param", param, false, false, true, false);
		Map<String, Object> result = momService.getMap(query, param);
		result.remove("PASSWORD");
		
		String authority = (result.get("EMP_AUTHORITY") == null ? (String)result.get("emp_authority") : (String) result.get("EMP_AUTHORITY"));
		momService.createMap("com.thirautech.mom.admin.create_login", param); //로그인 정보(mom_login) 추가 
		param.put("id",  authority);
		param.put("authId", authority);
		result.put("authGroup", momService.getMap("com.thirautech.mom.admin.get_micaAuthGroup", param));
		result.put("authGroupElement", momService.getMapList("com.thirautech.mom.admin.get_micaAuthElement_list", param));
		result.put("parameters", momService.getMap("com.thirautech.mom.admin.setup.get_setup_list", param));		
		param.put("empAuthority", authority);
		result.put("menuList", momService.getMapList("com.thirautech.mom.admin.get_siteMenu_list", param));
		result.put("resourceList", momService.getMapList("com.thirautech.mom.common.get_comResource_list", param));
		
		return result;
	}
}
