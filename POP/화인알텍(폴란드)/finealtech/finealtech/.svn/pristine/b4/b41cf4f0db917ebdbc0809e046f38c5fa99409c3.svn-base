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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
public class UserController {	
	@Autowired
	private MomService momService;
	//@Autowired
	//private UserService userService;
	
	@GetMapping("/user")
	public LoginResult login() {
		
		return null;
	}
	@PostMapping("/user")
	public Map<String,Object> postUser(@RequestBody Map<String, Object> param) {
		String query = "com.thirautech.mom.user.create_user";
		
		param.put("createBy", AuthManager.getSessionAttribute("userId").toString());
		param.put("updateBy", AuthManager.getSessionAttribute("userId").toString());
//		param.put("divisionCd", AuthManager.getSessionAttribute("divisionCd").toString());
//		param.put("companyCd", AuthManager.getSessionAttribute("companyCd").toString());
		
		return momService.createMap(query, param);
	}
	@PutMapping("/user")
	public Map<String,Object> putUser(@RequestBody Map<String,Object> param) {
		String query = "com.thirautech.mom.user.modify_user";
		
		param.put("updateBy", AuthManager.getSessionAttribute("userId").toString());
//		param.put("divisionCd", AuthManager.getSessionAttribute("divisionCd").toString());
//		param.put("companyCd", AuthManager.getSessionAttribute("companyCd").toString());
		
		return momService.modifyMap(query, param);
	}
	@PutMapping("/userPasswordChange")
	public Map<String, Object> putUserPasswordChange(@RequestBody Map<String, Object> param) {
		String query = "com.thirautech.mom.user.get_user";
		param.put("userId",  AuthManager.getSessionAttribute("userId"));
		param.put("divisionCd",  AuthManager.getSessionAttribute("divisionCd"));
		param.put("companyCd",  AuthManager.getSessionAttribute("companyCd"));
		
		Map<String, Object> map = momService.getMap(query, param);
		if(!map.get("PASSWORD").equals(param.get("nowPassword"))) {
			Map<String, Object> result = new HashMap<String, Object>();
			result.put("result", "fail");
			return result;
		}
		
		query = "com.thirautech.mom.user.modify_user_password";
		
		return momService.modifyMap(query, param);
	}
}
