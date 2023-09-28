package com.atahf.IntraLink.file;

import com.atahf.IntraLink.file.FileDto.FileInfoDto;
import com.atahf.IntraLink.file.FileDto.FileSaveDto;
import com.atahf.IntraLink.user.User;
import com.atahf.IntraLink.user.UserDao;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FileService {
    private final FileDao fileDao;
    private final UserDao userDao;

    public FileService(FileDao fileDao, UserDao userDao) {
        this.fileDao = fileDao;
        this.userDao = userDao;
    }

    @Transactional
    public void addFile(FileSaveDto fileSaveDto) throws Exception {
        File tmp = fileDao.findFileByFileNameAndUsername(fileSaveDto.getFileName(), fileSaveDto.getUsername());
        if(tmp != null) throw new Exception("User Cannot Have Files With Same Names!");

        File newFile = new File(fileSaveDto);
        fileDao.save(newFile);
    }

    @Transactional
    public void addFilePP(FileSaveDto fileSaveDto) throws Exception {
        User user = userDao.findUserByUsername(fileSaveDto.getUsername());
        if(user == null) throw new Exception("User Does Not Exist!");

        File tmp = fileDao.findFileByFileNameAndUsername(fileSaveDto.getFileName(), fileSaveDto.getUsername());
        if(tmp != null) throw new Exception("User Cannot Have Files With Same Names!");

        String currentPP = user.getProfilePicture();
        File file = fileDao.findFileByFileNameAndUsername(currentPP, fileSaveDto.getUsername());
        if(file == null) {
            File newFile = new File(fileSaveDto);
            fileDao.save(newFile);
        }
        else {
            file.setFileName(fileSaveDto.getFileName());
            file.setFileData(fileSaveDto.getFileData());
        }
    }

    @Transactional
    public File getFile(String username, String fileName) throws Exception {
        User user = userDao.findUserByUsername(username);
        if(user == null) throw new Exception("User Does Not Exist!");

        File file = fileDao.findFileByFileNameAndUsername(fileName, username);
        if(file == null) throw new Exception("File Does Not Exist!");

        return file;
    }

    @Transactional
    public void deleteFile(FileInfoDto fileInfoDto) throws Exception {
        File file = fileDao.findFileByFileNameAndUsername(fileInfoDto.getFileName(), fileInfoDto.getUsername());
        if(file == null) throw new Exception("File Does Not Exist!");

        fileDao.delete(file);
    }
}
