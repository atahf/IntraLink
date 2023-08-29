package com.atahf.IntraLink.firebase;

import com.google.cloud.storage.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Service
public class FirebaseService {

    private final Storage storage = StorageOptions.getDefaultInstance().getService();
    private final String bucketName = "intralink-94cfb.appspot.com";

    public String uploadFile(MultipartFile file) throws Exception {
        if(file == null || file.getOriginalFilename() == null) throw new Exception("File Is Empty or Corrupted!");

        BlobId blobId = BlobId.of(bucketName, file.getOriginalFilename());

        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(file.getContentType()).build();
        Blob blob = storage.create(blobInfo, file.getBytes());

        return blob.getName();
    }

    public byte[] downloadFile(String fileName) throws IOException {
        Blob blob = storage.get(BlobId.of(bucketName, fileName));

        if (blob == null) throw new IOException("File Not Found!");

        return blob.getContent();
    }

}

