package com.atahf.IntraLink.user;

import com.atahf.IntraLink.user.userDto.UserInfoDto;

import com.atahf.IntraLink.utils.Permissions;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserDao userDao;

    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }

    public Permissions getPermissions(Long userID) throws Exception {
        User user = userDao.findUserById(userID);
        if(user == null) throw new Exception("Operator Does Not Exist!");

        return new Permissions(user.getPermissions());
    }

    public User readUser(Long operatorID, Long userID) throws Exception {
        Permissions operatorPermissions = getPermissions(operatorID);
        if(!operatorPermissions.isRead()) throw new Exception("Operator Does Not Have Read Permission!");

        User user = userDao.findUserById(userID);
        if(user == null) throw new Exception("User Does Not Exist!");

        return user;
    }

    @Transactional
    public void addUser(Long operatorID, UserInfoDto userInfoDto) throws Exception {
        User newUser = new User(userInfoDto);
        Permissions operatorPermissions = getPermissions(operatorID);
        if(!operatorPermissions.isAdd()) throw new Exception("Operator Does Not Have Add Permission!");

        // TODO: handle new user data transfer

        userDao.save(newUser);
    }

    @Transactional
    public void changeUser(Long operatorID, Long userID, UserInfoDto userInfoDto) throws Exception {
        Permissions operatorPermissions = getPermissions(operatorID);
        if(!operatorPermissions.isChange()) throw new Exception("Operator Does Not Have Change Permission!");

        User user = userDao.findUserById(userID);
        if(user == null) throw new Exception("User Does Not Exist!");

        if (userInfoDto.getFirstName() != null) user.setFirstName(userInfoDto.getFirstName());
        if (userInfoDto.getLastName() != null) user.setLastName(userInfoDto.getLastName());
        if (userInfoDto.getEmail() != null) user.setEmail(userInfoDto.getEmail());
        if (userInfoDto.getDepartment() != null) user.setDepartment(userInfoDto.getDepartment());
        if (userInfoDto.getTitle() != null) user.setTitle(userInfoDto.getTitle());
        if (userInfoDto.getAge() != null) user.setAge(userInfoDto.getAge());
        if (userInfoDto.getBirthdate() != null) user.setBirthdate(userInfoDto.getBirthdate());
        if (userInfoDto.getGender() != null) user.setGender(userInfoDto.getGender());
        if (userInfoDto.getPhoneNumber() != null) user.setPhoneNumber(userInfoDto.getPhoneNumber());
        if (userInfoDto.getAddress() != null) user.setAddress(userInfoDto.getAddress());
        if (userInfoDto.getProfilePicture() != null) user.setProfilePicture(userInfoDto.getProfilePicture());
        if (userInfoDto.getActive() != null) user.setActive(userInfoDto.getActive());
        if (userInfoDto.getPasswordIsSet() != null) user.setPasswordIsSet(userInfoDto.getPasswordIsSet());
        if (userInfoDto.getPassword() != null) user.setPassword(userInfoDto.getPassword());
        if (userInfoDto.getPasswordValid() != null) user.setPasswordValid(userInfoDto.getPasswordValid());
        if (userInfoDto.getPermissions() != null) user.setPermissions(userInfoDto.getPermissions());

        userDao.save(user);
    }

    @Transactional
    public void deleteUser(Long operatorID, Long userID) throws Exception {
        Permissions operatorPermissions = getPermissions(operatorID);
        if(!operatorPermissions.isDelete()) throw new Exception("Operator Does Not Have Delete Permission!");

        User user = userDao.findUserById(userID);
        if(user == null) throw new Exception("User Does Not Exist!");

        userDao.delete(user);
    }

    @Transactional
    public void setProfilePicture(byte[] image, Long userID) throws Exception {
        User user = userDao.findUserById(userID);
        if(user == null) throw new Exception("User Does Not Exist!");

        user.setProfilePicture(image);
        userDao.save(user);
    }
}
