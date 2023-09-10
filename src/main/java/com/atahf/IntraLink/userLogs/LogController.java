package com.atahf.IntraLink.userLogs;

import com.atahf.IntraLink.user.UserService;
import com.atahf.IntraLink.utils.GeneralHttpResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/v1/log")
public class LogController {
    private final LogService logService;
    private final UserService userService;

    public LogController(LogService logService, UserService userService) {
        this.logService = logService;
        this.userService = userService;
    }

    @GetMapping("all")
    public GeneralHttpResponse<List<Log>> getLogs(Authentication authentication) {
        GeneralHttpResponse<List<Log>> response = new GeneralHttpResponse<>("200", null);
        try{
            if(!userService.hasPermission(authentication.getName(), "log:read")) throw new Exception("User Does Not Have Permission!");

            response.setReturnObject(logService.getLogs());
        }
        catch (Exception e) {
            response.setStatus("400: " + e.getMessage());
        }
        return response;
    }

    @GetMapping("{logId}")
    public GeneralHttpResponse<Log> getLog(@PathVariable Long logId, Authentication authentication) {
        GeneralHttpResponse<Log> response = new GeneralHttpResponse<>("200", null);
        try{
            if(!userService.hasPermission(authentication.getName(), "log:read")) throw new Exception("User Does Not Have Permission!");

            response.setReturnObject(logService.getLog(logId));
        }
        catch (Exception e) {
            response.setStatus("400: " + e.getMessage());
        }
        return response;
    }
}
