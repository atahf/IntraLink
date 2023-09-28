package com.atahf.IntraLink.file;

import javax.persistence.*;

import com.atahf.IntraLink.file.FileDto.FileSaveDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "files")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String fileName;
    private LocalDateTime uploadDate;

    @Lob
    private byte[] fileData;

    @ElementCollection
    @CollectionTable(name = "shared-usernames", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "usernames")
    private List<String> sharedUsernames;

    public File(FileSaveDto fileSaveDto) {
        this.username = fileSaveDto.getUsername();
        this.fileName = fileSaveDto.getFileName();
        this.uploadDate = fileSaveDto.getUploadDate();
        this.sharedUsernames = fileSaveDto.getSharedUsernames();
    }
}
