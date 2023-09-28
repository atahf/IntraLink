package com.atahf.IntraLink.file;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileDao extends JpaRepository<File,Long> {
    File findFileById(Long id);
    List<File> findAllByUsername(String username);
    File findFileByFileNameAndUsername(String fileName, String username);
}