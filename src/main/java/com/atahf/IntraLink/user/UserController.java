package com.atahf.IntraLink.user;

import com.atahf.IntraLink.ticket.ticketDto.NewTicketDto;
import com.atahf.IntraLink.user.UserDto.ChangePassword;
import com.atahf.IntraLink.user.UserDto.UserInfo;
import com.atahf.IntraLink.utils.GeneralHttpResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("{username}")
    public GeneralHttpResponse<UserInfo> getUser(@PathVariable String username) {
        GeneralHttpResponse<UserInfo> userInfo = new GeneralHttpResponse<>("200", null);
        try{
            userInfo.setReturnObject(userService.getUser(username));
        }
        catch(Exception e) {
            userInfo.setStatus("400: " + e.getMessage());
        }
        return userInfo;
    }

    @PostMapping("change-password")
    public GeneralHttpResponse<String> changePassword(@RequestBody ChangePassword changePassword) {
        GeneralHttpResponse<String> response = new GeneralHttpResponse<>("200", null);
        try {
            userService.changePassword(changePassword);
            response.setReturnObject("Password Successfully Changed!");
        }
        catch (Exception e) {
            response.setStatus("400");
            response.setReturnObject(e.getMessage());
        }
        return response;
    }

    @PostMapping("reset-password")
    public GeneralHttpResponse<String> resetPassword(@RequestBody String username) {
        GeneralHttpResponse<String> response = new GeneralHttpResponse<>("200", null);
        try {
            userService.resetPassword(username);
            response.setReturnObject("Password Reset Request Received!");
        }
        catch (Exception e) {
            response.setStatus("400");
            response.setReturnObject(e.getMessage());
        }
        return response;
    }
}
