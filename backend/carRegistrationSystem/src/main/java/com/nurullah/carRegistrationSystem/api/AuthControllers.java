package com.nurullah.carRegistrationSystem.api;
import com.nurullah.carRegistrationSystem.DTOs.request.CreateUserRequest;
import com.nurullah.carRegistrationSystem.DTOs.request.LoginUser;
import com.nurullah.carRegistrationSystem.DTOs.response.AuthResponse;
import com.nurullah.carRegistrationSystem.bussiness.abstractt.IUserService;
import com.nurullah.carRegistrationSystem.entities.User;
import com.nurullah.carRegistrationSystem.security.JwtTokenProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/auth")
public class AuthControllers {

    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;

    private final IUserService userService;

    private  BCryptPasswordEncoder bCryptPasswordEncoder;


    public AuthControllers(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, IUserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginUser loginRequest) {

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(loginRequest.getUserName(), loginRequest.getPassword());
        Authentication auth = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(auth);
        String jwtToken = jwtTokenProvider.generateJwtToken(auth);
        User user=userService.getByUserName(loginRequest.getUserName()).getData();
        AuthResponse authResponse=new AuthResponse();
        authResponse.setMessage("Bearer "+jwtToken);
        authResponse.setUserId(user.getId());
        authResponse.setUserName(user.getUserName());
        return authResponse;

    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody CreateUserRequest registerRequest) {
        AuthResponse authResponse=new AuthResponse();
        if(userService.getByUserName(registerRequest.getUserName()).getData() != null) {
            authResponse.setMessage("Böyle bir kullanıcı zaten var");
            return authResponse;
        }
        CreateUserRequest user = new CreateUserRequest();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setName(registerRequest.getName());
        user.setLastName(registerRequest.getLastName());
        user.setUserName(registerRequest.getUserName());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        userService.createOneUser(user);
        User getUser=userService.getByUserName(user.getUserName()).getData();
        authResponse.setMessage("Kullanıcı Başarıyla Oluşturuldu");
        authResponse.setUserName(getUser.getUserName());
        authResponse.setUserId(getUser.getId());

        return authResponse;


    }





}
