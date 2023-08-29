package com.atahf.IntraLink.firebase;

import com.atahf.IntraLink.user.UserService;
import com.atahf.IntraLink.utils.GeneralHttpResponse;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.core.io.ByteArrayResource;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/storage")
public class FirebaseController {

    private final FirebaseService firebaseService;
    private final UserService userService;

    public FirebaseController(FirebaseService firebaseService, UserService userService) {
        this.firebaseService = firebaseService;
        this.userService = userService;
    }

    @PostMapping("upload")
    public GeneralHttpResponse<String> upload(MultipartFile file, String username) {
        GeneralHttpResponse<String> response = new GeneralHttpResponse<>("200", null);
        try{
            String fileName = firebaseService.uploadFile(file);
            userService.setProfilePicture(username, fileName);
            response.setReturnObject("File Successfully Uploaded " + fileName + "!");
        } catch (Exception e) {
            response.setStatus("400: " + e.getMessage());
        }
        return response;
    }

    @GetMapping("download/{fileName}")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable String fileName) throws IOException {
        try {
            byte[] file = firebaseService.downloadFile(fileName);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", fileName);

            ByteArrayResource resource = new ByteArrayResource(file);

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(null);
        }
    }
}

