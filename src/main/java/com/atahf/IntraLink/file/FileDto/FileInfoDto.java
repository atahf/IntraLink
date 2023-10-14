package com.atahf.IntraLink.file.FileDto;

import com.atahf.IntraLink.file.File;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FileInfoDto {
    private Long id;
    private String fileName;
    private String username;
    private String sharedUsernames;

    public FileInfoDto(File file) {
        this.id = file.getId();
        this.fileName = file.getFileName();
        this.username = file.getUsername();
        this.sharedUsernames = file.getSharedUsernames();
    }
}
