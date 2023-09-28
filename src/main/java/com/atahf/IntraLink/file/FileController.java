package com.atahf.IntraLink.file;

import com.atahf.IntraLink.file.FileDto.FileInfoDto;
import com.atahf.IntraLink.file.FileDto.FileSaveDto;
import com.atahf.IntraLink.user.UserService;
import com.atahf.IntraLink.utils.GeneralHttpResponse;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @PostMapping("upload")
    public GeneralHttpResponse<String> addFile(@RequestParam("file") MultipartFile file, Authentication authentication) {
        GeneralHttpResponse<String> response = new GeneralHttpResponse<>("200", null);
        try{
            FileSaveDto fileSaveDto = new FileSaveDto();
            fileSaveDto.setFileData(file.getBytes());
            fileSaveDto.setUsername(authentication.getName());
            fileSaveDto.setFileName(file.getName());
            fileSaveDto.setUploadDate(LocalDateTime.now());

            fileService.addFile(fileSaveDto);
        }
        catch (Exception e) {
            response.setStatus("400");
            response.setReturnObject(e.getMessage());
        }
        return response;
    }

    @PostMapping("add-profile-picture")
    public GeneralHttpResponse<String> addProfilePicture(@RequestParam("file") MultipartFile file, Authentication authentication) {
        GeneralHttpResponse<String> response = new GeneralHttpResponse<>("200", null);
        try{
            FileSaveDto fileSaveDto = new FileSaveDto();
            fileSaveDto.setFileData(file.getBytes());
            fileSaveDto.setUsername(authentication.getName());
            fileSaveDto.setFileName(file.getResource().getFilename());
            fileSaveDto.setUploadDate(LocalDateTime.now());

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
