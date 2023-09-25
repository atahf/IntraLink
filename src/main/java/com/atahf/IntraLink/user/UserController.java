package com.atahf.IntraLink.user;

import com.atahf.IntraLink.user.UserDto.EditUser;
import com.atahf.IntraLink.user.UserDto.NewUser;
import com.atahf.IntraLink.userLogs.LogService;
import com.atahf.IntraLink.user.UserDto.ChangePassword;
import com.atahf.IntraLink.user.UserDto.UserInfo;
import com.atahf.IntraLink.utils.GeneralHttpResponse;
import org.springframework.security.core.Authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;
    private final LogService logService;

    @Autowired
    public UserController(UserService userService, LogService logService) {
        this.userService = userService;
        this.logService = logService;
    }

    @GetMapping("{username}")
    public GeneralHttpResponse<UserInfo> getUser(@PathVariable String username, Authentication authentication) {
        GeneralHttpResponse<UserInfo> userInfo = new GeneralHttpResponse<>("200", null);
        try{
            if(!userService.hasPermission(authentication.getName(), "user:read") && !username.equals(authentication.getName())) throw new Exception("User Does Not Have Permission!");

            userInfo.setReturnObject(userService.getUser(username, authentication.getName()));

            if(!username.equals(authentication.getName())) {
                logService.addLog(authentication.getName(), "Accessed User Info with username of " + username);
            }
        }
        catch(Exception e) {
            userInfo.setStatus("400: " + e.getMessage());
        }
        return userInfo;
    }

    @GetMapping("all")
    public GeneralHttpResponse<List<UserInfo>> getAllUser(Authentication authentication) {
        GeneralHttpResponse<List<UserInfo>> userInfo = new GeneralHttpResponse<>("200", null);
        try{
            if(!userService.hasPermission(authentication.getName(), "user:read")) throw new Exception("User Does Not Have Permission!");

            userInfo.setReturnObject(userService.getAllUser(authentication.getName()));
        }
        catch(Exception e) {
            userInfo.setStatus("400: " + e.getMessage());
        }
        return userInfo;
    }

    @PostMapping("new-user")
    public GeneralHttpResponse<String> addUser(@RequestBody NewUser newUser, Authentication authentication) {
        GeneralHttpResponse<String> response = new GeneralHttpResponse<>("200", null);
        try{
            if(!userService.hasPermission(authentication.getName(), "user:add")) throw new Exception("User Does Not Have Permission!");

            userService.addUser(newUser, authentication.getName());
            response.setReturnObject("User Successfully Added!");

            logService.addLog(authentication.getName(), "Added new User with username of " + newUser.getUsername());
        }
        catch (Exception e) {
            response.setStatus("400");
            response.setReturnObject(e.getMessage());
        }
        return response;
    }

    @PostMapping("edit-user")
    public GeneralHttpResponse<String> addUser(@RequestBody EditUser editUser, Authentication authentication) {
        GeneralHttpResponse<String> response = new GeneralHttpResponse<>("200", null);
        try{
            if(!userService.hasPermission(authentication.getName(), "user:edit") && !editUser.getUsername().equals(authentication.getName())) throw new Exception("User Does Not Have Permission!");

            userService.editUser(editUser, authentication.getName());
            response.setReturnObject("User Successfully Edited!");

            logService.addLog(authentication.getName(), "Edited User with username of " + "");
        }
        catch (Exception e) {
            response.setStatus("400");
            response.setReturnObject(e.getMessage());
        }
        return response;
    }

    @PostMapping("change-password")
    public GeneralHttpResponse<String> changePassword(@RequestBody ChangePassword changePassword, Authentication authentication) {
        GeneralHttpResponse<String> response = new GeneralHttpResponse<>("200", null);
        try {
            userService.changePassword(changePassword, authentication.getName());
            response.setReturnObject("Password Successfully Changed!");

            logService.addLog(authentication.getName(), "Changed password of user with username of " + authentication.getName());
        }
        catch (Exception e) {
            response.setStatus("400");
            response.setReturnObject(e.getMessage());
        }
        return response;
    }

    @PostMapping("reset-password")
    public GeneralHttpResponse<String> resetPassword(@RequestBody String username, Authentication authentication) {
        GeneralHttpResponse<String> response = new GeneralHttpResponse<>("200", null);
        try {
            userService.resetPassword(username);
            response.setReturnObject("Password Successfully Reset!");

            logService.addLog(authentication.getName(), "Reset password of user with username of " + username);
        }
        catch (Exception e) {
            response.setStatus("400");
            response.setReturnObject(e.getMessage());
        }
        return response;
    }
}
