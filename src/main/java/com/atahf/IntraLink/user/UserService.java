package com.atahf.IntraLink.user;

import com.atahf.IntraLink.user.UserDto.ChangePassword;
import com.atahf.IntraLink.user.UserDto.NewUser;
import com.atahf.IntraLink.user.UserDto.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;

@Service
public class UserService implements UserDetailsService {

    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserDao userDao, PasswordEncoder passwordEncoder) {
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean hasPermission(String username, String permission) throws Exception {
        User user = userDao.findUserByUsername(username);
        if(user == null) throw new Exception("User Does Not Exist!");

        return user.getAuthorities().contains(new SimpleGrantedAuthority(permission));
    }

    public boolean userExist(String username) {
        return null != userDao.findUserByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDao.findUserByUsername(username);

        if(user == null) throw new UsernameNotFoundException(String.format("Username %s not found", username));

        return user;
    }

    public static String generateRandomString(int length) {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[length];
        random.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes).substring(0, length);
    }

    public UserInfo getUser(String username, String submitter) throws Exception {
        User user = userDao.findUserByUsername(username);
        if(user == null) throw new Exception("User Does Not Exist!");

        if(!username.equals(submitter) && !hasPermission(submitter, "user:read")) throw new Exception("Submitter User Does Not Have Permission!");

        return new UserInfo(user);
    };

    @Transactional
    public void addUser(NewUser newUserData, String submitter) throws Exception {
        User user = userDao.findUserByUsername(newUserData.getUsername());
        if(user != null) throw new Exception("Username Already Exists!");

        if(hasPermission(submitter, "user:add")) throw new Exception("Submitter User Does Not Have Permission!");

       User newUser = new User(newUserData);
       newUser.setPassword(passwordEncoder.encode(generateRandomString(10)));
       newUser.setCredentialsExpiration(LocalDateTime.now().plusWeeks(1));

       userDao.save(newUser);
    }

    @Transactional
    public void changePassword(ChangePassword changePassword, String submitter) throws Exception {
        User user = userDao.findUserByUsername(changePassword.getUsername());
        if(user == null) throw new Exception("User Does Not Exist!");

        if(!changePassword.getUsername().equals(submitter) && hasPermission(submitter, "user:edit")) throw new Exception("Submitter User Does Not Have Permission!");

        user.setPassword(passwordEncoder.encode(changePassword.getPassword()));
    }

    @Transactional
    public void resetPassword(String username) throws Exception {
        User user = userDao.findUserByUsername(username);
        if(user == null) throw new Exception("User Does Not Exist!");

        // TODO: send email to user for accepting temporary password
    }

    @Transactional
    public void setProfilePicture(String username, String fileName) throws Exception {
        User user = userDao.findUserByUsername(username);
        if(user == null) throw new Exception("User Does Not Exist!");

        user.setProfilePicture(fileName);
    }

    @Transactional
    public void removeProfilePicture(String username) throws Exception {
        User user = userDao.findUserByUsername(username);
        if(user == null) throw new Exception("User Does Not Exist!");

        user.setProfilePicture(null);
    }

    public String getProfilePicture(String username) throws Exception {
        User user = userDao.findUserByUsername(username);
        if(user == null) throw new Exception("User Does Not Exist!");

        return user.getProfilePicture();
    }

    /*@Transactional
    @PostConstruct
    public void testRun() {
        User user = userDao.findUserByUsername("atahf");
        if(user == null) {
            User ata = new User();
            ata.setIsEnabled(true);
            ata.setIsCredentialsNonExpired(true);
            ata.setIsAccountNonExpired(true);
            ata.setIsAccountNonExpired(true);
            ata.setPassword(passwordEncoder.encode("atta2001"));
            ata.setUsername("atahf");

            userDao.save(ata);
        }
    }*/
}
