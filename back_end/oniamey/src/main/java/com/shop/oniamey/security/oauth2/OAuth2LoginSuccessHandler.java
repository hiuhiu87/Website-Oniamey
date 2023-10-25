package com.shop.oniamey.security.oauth2;

import com.nimbusds.jose.shaded.gson.Gson;
import com.shop.oniamey.core.admin.customer.service.CustomerService;
import com.shop.oniamey.core.admin.user.service.UserService;
import com.shop.oniamey.entity.Customer;
import com.shop.oniamey.infrastructure.constant.AuthenticationProvider;
import com.shop.oniamey.security.jwt.JwtTokenUtil;
import com.shop.oniamey.security.model.LoginResponse;
import com.shop.oniamey.security.securitymodel.AuthUser;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final Gson gson = new Gson();
    private JwtTokenUtil jwtTokenUtil;
    private UserService userService;

    private CustomerService customerService;

    @Autowired
    public void setJwtTokenUtil(JwtTokenUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        super.onAuthenticationSuccess(request, response, authentication);
        this.setAlwaysUseDefaultTargetUrl(true);
        this.setDefaultTargetUrl(this.determineTargetUrl(request, response, authentication));
    }

    @Override
    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        AuthUser user = (AuthUser) authentication.getPrincipal();
        AuthUser authUser = new AuthUser();

        if (userService.checkByEmail(user.getEmail())) {
            System.out.println("Email is already exist");
            authUser.setUser(userService.getUserByEmail(user.getEmail()));
        } else {
            throw new RuntimeException("Email is not exist");
        }

        if (customerService.getCustomerByEmail(user.getEmail()) != null) {
            System.out.println("Email is already exist");
            authUser.setCustomer(customerService.getCustomerByEmail(user.getEmail()));
        } else {
            Customer newCustomer = new Customer();
            if (user.getClientProvider().equals("Facebook")) {
                newCustomer.setAuthProvider(AuthenticationProvider.FACEBOOK);
                newCustomer.setEmail(user.getEmail());
                customerService.registerCustomerFacebook(newCustomer);
            } else if (user.getClientProvider().equals("Google")) {
                newCustomer.setAuthProvider(AuthenticationProvider.GOOGLE);
                newCustomer.setEmail(user.getEmail());
                customerService.registerCustomerGoogle(newCustomer);
            }
        }

        String accessToken = jwtTokenUtil.generateAccessToken(authUser);
        String role = authUser.getRole();
        LoginResponse loginResponse = new LoginResponse(user.getEmail(), accessToken, role);
        System.out.println("Role:" + role);
        String jsonResponse = gson.toJson(loginResponse);
        response.setStatus(200);
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        System.out.println("Json response: " + jsonResponse);
        String redirectUrl = "http://localhost:3001/loginbyfacebook/" + jsonResponse;
        System.out.println("Redirect url: " + redirectUrl);
        return redirectUrl;
    }

}
