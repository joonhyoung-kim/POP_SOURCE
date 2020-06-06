package com.thirautech.mom.realm;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.apache.shiro.authc.AccountException;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.Permission;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.jdbc.JdbcRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;

import com.thirautech.framework.common.util.Base64Util;
import com.thirautech.mom.service.MomService;

public class DefaultJdbcRealm extends JdbcRealm {
	//@Autowired
	//private UserService userService;
	@Autowired
	private MomService momService;
	
	public DefaultJdbcRealm() {
		this.setAuthenticationTokenClass(MomUserToken.class);
	}
	
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		MomUserToken muToken = (MomUserToken) token;
		
		String divisionCd = muToken.getDivisionCd();
		String companyCd = muToken.getCompanyCd();
        String userId = muToken.getUserId();

        if (divisionCd == null || companyCd == null || userId == null) {
            throw new AccountException("Null usernames are not allowed by this realm.");
        }
        
        //User user = userService.findByLoginId(loginId);
        Map<String, Object> user = findUser(muToken);

        SimpleAuthenticationInfo info = null;
        String password = null;
        String salt = null;
        
        switch (saltStyle) {
	        case NO_SALT:
	        	password = (user.get("password") == null) ? (String)user.get("PASSWORD") : (String)user.get("password");
	            info = new SimpleAuthenticationInfo(muToken.getPrincipal(), password.toCharArray(), getName());
	            break;
	        case CRYPT:
	        	password = Base64Util.decodeToString((String)user.get("PASSWORD"));
	    		info = new SimpleAuthenticationInfo(muToken.getPrincipal(), password, getName());
	            break;
	        case COLUMN:
	        	password = (String)user.get("PASSWORD");
	            salt = getSaltForUser(muToken.getPrincipalString());
	            break;
	        case EXTERNAL:
	            password = (String)user.get("PASSWORD");
	            salt = getSaltForUser(muToken.getPrincipalString());
        }

        if (password == null) {
            throw new UnknownAccountException("No account found for user [" + muToken.getPrincipalString() + "]");
        }
        
        if (salt != null) {
            info.setCredentialsSalt(ByteSource.Util.bytes(salt));
        }
        
        return info;
	}
	
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		if(principals == null) {
            throw new AuthorizationException("PrincipalCollection method argument cannot be null.");
        }

        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        
        Set<Permission> permissions = new HashSet<>();
        /*
        User user = userService.findByLoginId((String)getAvailablePrincipal(principals));
        info.setRoles(user.getRolesWithString());
        
        for (MCRole role : user.getRoles()) {
        	List<MCPermission> permissionList = role.getPermissions();
        	if (!permissionList.isEmpty()) {
        		permissions.addAll(role.getPermissions());
        	}
        }
        */
        info.setObjectPermissions(permissions);
        
        return info;
	}
	
	private Map<String, Object> findUser(MomUserToken token) {
		Map<String, Object> param = new HashMap<>();
		param.put("divisionCd", token.getDivisionCd());
		param.put("companyCd", token.getCompanyCd());
		param.put("userId", token.getUserId());
		param.put("locale", token.getLocale());
		return momService.getMap("com.thirautech.mom.user.get_user", param);
	}
}
