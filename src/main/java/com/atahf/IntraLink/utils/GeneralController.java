package com.atahf.IntraLink.utils;

import com.atahf.IntraLink.user.ConfirmationToken.ConfirmationTokenService;
import com.atahf.IntraLink.user.ResetConfirmationToken.ResetConfirmationTokenService;
import com.atahf.IntraLink.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/general")
public class GeneralController {

    private final UserService userService;
    private final ConfirmationTokenService confirmationTokenService;
    private final ResetConfirmationTokenService resetConfirmationTokenService;

    @Autowired
    public GeneralController(UserService userService, ConfirmationTokenService confirmationTokenService, ResetConfirmationTokenService resetConfirmationTokenService) {
        this.userService = userService;
        this.confirmationTokenService = confirmationTokenService;
        this.resetConfirmationTokenService = resetConfirmationTokenService;
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

    @GetMapping("/activation")
    public String mailConfirmation(@RequestParam String token){
        try{
            confirmationTokenService.mailConfirmation(token);
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return "Confirmation failed.";
        }
        return "You have successfully confirmed your account.";
    }

    @GetMapping("/reset")
    public String resetPasswordConfirmation(@RequestParam String token){
        try{
            resetConfirmationTokenService.mailConfirmation(token);
        }
        catch (Exception e){
            return "Resetting Password failed.";
        }
        return "You have successfully retested your password.";
    }
}

