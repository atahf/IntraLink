package com.atahf.IntraLink.file;

import com.atahf.IntraLink.file.FileDto.FileInfoDto;
import com.atahf.IntraLink.file.FileDto.FileSaveDto;
import com.atahf.IntraLink.user.UserService;
import com.atahf.IntraLink.utils.GeneralHttpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("api/v1/file")
public class FileController {
    private final FileService fileService;
    private final UserService userService;

    @Autowired
    public FileController(FileService fileService, UserService userService) {
        this.fileService = fileService;
        this.userService = userService;
    }

    @PostMapping("add")
    public GeneralHttpResponse<String> addFile(@RequestBody FileSaveDto fileSaveDto, Authentication authentication) {
        GeneralHttpResponse<String> response = new GeneralHttpResponse<>("200", null);
        try{
            fileService.addFile(fileSaveDto);
        }
        catch (Exception e) {
            response.setStatus("400");
            response.setReturnObject(e.getMessage());
        }
        return response;
    }

    @PostMapping("add-profile-picture")
    public GeneralHttpResponse<String> addProfilePicture(@RequestBody FileSaveDto fileSaveDto, Authentication authentication) {
        GeneralHttpResponse<String> response = new GeneralHttpResponse<>("200", null);
        try{
            if(!fileSaveDto.getUsername().equals(authentication.getName())) throw new Exception("No Permissions!");

            fileService.addFile(fileSaveDto);
            userService.setProfilePicture(fileSaveDto.getUsername(), fileSaveDto.getFileName());
        }
        catch (Exception e) {
            response.setStatus("400");
            response.setReturnObject(e.getMessage());
        }
        return response;
    }

    @GetMapping("{fileName}")
    public GeneralHttpResponse<File> getFile(@PathVariable String fileName, Authentication authentication) {
        GeneralHttpResponse<File> response = new GeneralHttpResponse<>("200", null);
        try{
            response.setReturnObject(fileService.getFile(authentication.getName(), fileName));
        }
        catch (Exception e) {
            response.setStatus("400: " + e.getMessage());
        }
        return response;
    }

    @PostMapping("delete")
    public GeneralHttpResponse<String> addFile(@RequestBody FileInfoDto fileInfoDto, Authentication authentication) {
        GeneralHttpResponse<String> response = new GeneralHttpResponse<>("200", null);
        try{
            if(!fileInfoDto.getUsername().equals(authentication.getName())) throw new Exception("No Permissions!");

            fileService.deleteFile(fileInfoDto);
        }
        catch (Exception e) {
            response.setStatus("400");
            response.setReturnObject(e.getMessage());
        }
        return response;
    }
}
