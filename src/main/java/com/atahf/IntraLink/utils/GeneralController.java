package com.atahf.IntraLink.utils;

import com.atahf.IntraLink.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

@CrossOrigin
@RestController
@RequestMapping("/general")
public class GeneralController {

    private final UserService userService;

    @Autowired
    public GeneralController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("reset")
    public GeneralHttpResponse<String> getUser(@RequestBody String username) {
        GeneralHttpResponse<String> response = new GeneralHttpResponse<>("200", null);
        try{
            userService.resetPassword(username);
            response.setReturnObject("Password Reset Request Received!");
        }
        catch(Exception e) {
            response.setStatus("400: " + e.getMessage());
        }
        return response;
    }
}

