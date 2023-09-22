package com.atahf.IntraLink.user;

import com.atahf.IntraLink.user.UserDto.NewUser;
import com.atahf.IntraLink.userLogs.LogService;
import com.atahf.IntraLink.user.UserDto.ChangePassword;
import com.atahf.IntraLink.user.UserDto.UserInfo;
import com.atahf.IntraLink.utils.GeneralHttpResponse;
import org.springframework.security.core.Authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
            userInfo.setReturnObject(userService.getUser(username, authentication.getName()));

            if(!username.equals(authentication.getName())) {
                logService.addLog(authentication.getName(), "accessed User Info with username of " + username);
            }
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

            logService.addLog(authentication.getName(), "Added new User with username of " + "");
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

            logService.addLog(authentication.getName(), "changed password of user with username of " + changePassword.getUsername());
        }
        catch (Exception e) {
            response.setStatus("400");
            response.setReturnObject(e.getMessage());
        }
        return response;
    }
}
