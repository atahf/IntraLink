package com.atahf.IntraLink.file.FileDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FileSaveDto {
    private String username;
    private String fileName;
    private LocalDateTime uploadDate;
    private byte[] fileData;
    private List<String> sharedUsernames;
}
