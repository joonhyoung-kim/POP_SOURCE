package com.thirautech.mom.realm;

import java.util.ArrayList;
import java.util.List;

import org.apache.shiro.authc.HostAuthenticationToken;
import org.apache.shiro.authc.RememberMeAuthenticationToken;

public class MomUserToken implements HostAuthenticationToken, RememberMeAuthenticationToken {
	private static final long serialVersionUID = -3504940468196825339L;
	
	private String divisionCd;
	private String companyCd;
	private String userId;
	private String locale;
	private char[] password;
	private boolean rememberMe = false;
	private String host;
	
	public MomUserToken() {}
	
	public MomUserToken(final String divisionCd, final String companyCd, final String userId, final String locale,
			final char[] password) {
		this(divisionCd, companyCd, userId, locale, password, false, null);
	}
	
	public MomUserToken(final String divisionCd, final String companyCd, final String userId, final String locale, 
			final String password) {
		this(divisionCd, companyCd, userId, locale, password != null ? password.toCharArray() : null, false, null);
	}
	
	public MomUserToken(final String divisionCd, final String companyCd, final String userId, final String locale, 
			final char[] password, final String host) {
		this(divisionCd, companyCd, userId, locale, password, false, host);
	}
	
	public MomUserToken(final String divisionCd, final String companyCd, final String userId, final String locale, 
			final String password, final String host) {
		this(divisionCd, companyCd, userId, locale, password != null ? password.toCharArray() : null, false, host);
	}
	
	public MomUserToken(final String divisionCd, final String companyCd, final String userId, final String locale, 
			final char[] password, final boolean rememberMe) {
		this(divisionCd, companyCd, userId, locale, password, rememberMe, null);
	}
	
	public MomUserToken(final String divisionCd, final String companyCd, final String userId, final String locale, 
			final String password, final boolean rememberMe) {
		this(divisionCd, companyCd, userId, locale, password != null ? password.toCharArray() : null, rememberMe, null);
	}
	
	public MomUserToken(final String divisionCd, final String companyCd, final String userId, final String locale, 
			final String password, final boolean rememberMe, final String host) {
		this(divisionCd, companyCd, userId, locale, password != null ? password.toCharArray() : null, rememberMe, host);
	}
	
	public MomUserToken(final String divisionCd, final String companyCd, final String userId, final String locale, 
			final char[] password, final boolean rememberMe, final String host) {
		this.divisionCd = divisionCd;
		this.companyCd = companyCd;
		this.userId = userId;
		this.locale = locale;
		this.password = password;
		this.rememberMe = rememberMe;
		this.host = host;
	}

	public String getDivisionCd() {
		return divisionCd;
	}

	public void setDivisionCd(String divisionCd) {
		this.divisionCd = divisionCd;
	}

	public String getCompanyCd() {
		return companyCd;
	}

	public void setCompanyCd(String companyCd) {
		this.companyCd = companyCd;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	public String getLocale() {
		return locale;
	}

	public void setLocale(String locale) {
		this.locale = locale;
	}

	public char[] getPassword() {
		return password;
	}

	public void setPassword(char[] password) {
		this.password = password;
	}

	@Override
	public boolean isRememberMe() {
		return rememberMe;
	}
	
	public void setRememberMe(boolean rememberMe) {
		this.rememberMe = rememberMe;
	}

	public String getHost() {
		return host;
	}
	
	public void setHost(String host) {
		this.host = host;
	}
	
	@Override
	public List<String> getPrincipal() {
		List<String> list = new ArrayList<>();
		list.add(divisionCd);
		list.add(companyCd);
		list.add(userId);
		//list.add(locale);
		
		return list;
	}
	
	public String getPrincipalString() {
		return divisionCd + ":" + companyCd + ":" + userId;
	}

	@Override
	public Object getCredentials() {
		return getPassword();
	}
	
	public void clear() {
		this.divisionCd = null;
		this.companyCd = null;
        this.userId = null;
        this.locale = null;
        this.host = null;
        this.rememberMe = false;

        if (this.password != null) {
            for (int i = 0; i < password.length; i++) {
                this.password[i] = 0x00;
            }
            this.password = null;
        }
    }
}
