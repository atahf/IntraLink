package com.atahf.IntraLink.user;

import com.atahf.IntraLink.mailSender.MailService;
import com.atahf.IntraLink.user.ConfirmationToken.ConfirmationToken;
import com.atahf.IntraLink.user.ConfirmationToken.ConfirmationTokenDao;
import com.atahf.IntraLink.user.ConfirmationToken.ConfirmationTokenDto.ConfirmationTokenDto;
import com.atahf.IntraLink.user.ResetConfirmationToken.ResetConfirmationToken;
import com.atahf.IntraLink.user.ResetConfirmationToken.ResetConfirmationTokenDao;
import com.atahf.IntraLink.user.ResetConfirmationToken.ResetConfirmationTokenDto.ResetConfirmationTokenDto;
import com.atahf.IntraLink.user.UserDto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;
    private final ConfirmationTokenDao confirmationTokenDao;
    private final ResetConfirmationTokenDao resetConfirmationTokenDao;

    @Autowired
    public UserService(UserDao userDao, PasswordEncoder passwordEncoder, MailService mailService, ConfirmationTokenDao confirmationTokenDao, ResetConfirmationTokenDao resetConfirmationTokenDao) {
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
        this.mailService = mailService;
        this.confirmationTokenDao = confirmationTokenDao;
        this.resetConfirmationTokenDao = resetConfirmationTokenDao;
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
    }

    public List<UserInfo> getAllUser(String submitter) throws Exception {
        if(!hasPermission(submitter, "user:read")) throw new Exception("Submitter User Does Not Have Permission!");

        List<User> users = userDao.findAll();
        List<UserInfo> userInfos = new ArrayList<>();

        for(User user:users) {
            UserInfo userInfo = new UserInfo(user);
            userInfos.add(userInfo);
        }

        return userInfos;
    }

    public List<UserInfoForAll> getAllUserForAll() {
        List<User> users = userDao.findAll();
        List<UserInfoForAll> res = new ArrayList<>();

        for(User u: users) {
            res.add(new UserInfoForAll(u));
        }

        return res;
    }

    @Transactional
    public void addUser(NewUser newUserData, String submitter) throws Exception {
        User user = userDao.findUserByUsername(newUserData.getUsername());
        if(user != null) throw new Exception("Username Already Exists!");

        if(!hasPermission(submitter, "user:add")) throw new Exception("Submitter User Does Not Have Permission!");

        User newUser = new User(newUserData);
        String tmpPass = generateRandomString(10);
        newUser.setPassword(passwordEncoder.encode(tmpPass));
        newUser.setCredentialsExpiration(LocalDateTime.now().plusWeeks(1));

        userDao.save(newUser);

        ConfirmationToken confirmationToken = new ConfirmationToken(newUser);
        confirmationTokenDao.save(confirmationToken);

        String confirmationUrl = "https://intralinkk-4f8233098a40.herokuapp.com/general/activation?token="+confirmationToken.getToken();
        ConfirmationTokenDto confirmationMail = new ConfirmationTokenDto(newUser.getEmail(), confirmationUrl, tmpPass);

        mailService.sendSignupConfirmation(confirmationMail);
    }

    @Transactional
    public void editUser(EditUser editUser, String submitter) throws Exception {
        User user = userDao.findUserByUsername(editUser.getUsername());
        if(user == null) throw new Exception("User Does Not Exist!");

        if(!hasPermission(submitter, "user:edit") && !editUser.getUsername().equals(submitter)) throw new Exception("Submitter User Does Not Have Permission!");

        if(!editUser.getFirstName().equals("-")) {
            user.setFirstName(editUser.getFirstName());
        }
        if(!editUser.getLastName().equals("-")) {
            user.setLastName(editUser.getLastName());
        }
        if(editUser.getBirthdate() != null) {
            user.setBirthdate(editUser.getBirthdate());
            user.setAge((int) ChronoUnit.YEARS.between(editUser.getBirthdate(), LocalDateTime.now()));
        }
        if(!editUser.getPhoneNumber().equals("-")) {
            user.setPhoneNumber(editUser.getPhoneNumber());
        }
        if(!editUser.getAddress().equals("-")) {
            user.setAddress(editUser.getAddress());
        }
    }

    @Transactional
    public void banUser(String username, String submitter) throws Exception {
        User user = userDao.findUserByUsername(username);
        if(user == null) throw new Exception("User Does Not Exist!");

        if(!hasPermission(submitter, "user:delete")) throw new Exception("Submitter Has No Permission To Ban!");

        user.setIsEnabled(false);
    }

    @Transactional
    public void unbanUser(String username, String submitter) throws Exception {
        User user = userDao.findUserByUsername(username);
        if(user == null) throw new Exception("User Does Not Exist!");
        if(user.getIsEnabled()) throw new Exception("Users is already active!");

        if(!hasPermission(submitter, "user:delete")) throw new Exception("Submitter Has No Permission To Unban!");

        user.setIsEnabled(true);
    }

    @Transactional
    public void changePassword(ChangePassword changePassword, String submitter) throws Exception {
        User user = userDao.findUserByUsername(submitter);
        if(user == null) throw new Exception("User Does Not Exist!");

        if(!passwordEncoder.matches(changePassword.getOldPassword(), user.getPassword())) throw new Exception("Old Password Is Wrong!");

        user.setPassword(passwordEncoder.encode(changePassword.getNewPassword()));
    }

    @Transactional
    public void resetPassword(String username) throws Exception {
        User user = userDao.findUserByUsername(username);
        if(user == null) throw new Exception("User Does Not Exist!");

        ResetConfirmationToken resetConfirmationToken = resetConfirmationTokenDao.findResetConfirmationTokenByUser(user);
        String tmpPass = generateRandomString(10);
        String tmpPassEncoded = passwordEncoder.encode(tmpPass);
        if(resetConfirmationToken == null) {
            resetConfirmationToken = new ResetConfirmationToken(user, tmpPassEncoded);
            resetConfirmationTokenDao.save(resetConfirmationToken);
        }
        else {
            if(resetConfirmationToken.isConfirmed()) {
                ResetConfirmationToken tmp = new ResetConfirmationToken(user, tmpPassEncoded);

                resetConfirmationToken.setToken(tmp.getToken());
                resetConfirmationToken.setTmpPass(tmp.getTmpPass());
                resetConfirmationToken.setExpiresAt(tmp.getExpiresAt());
                resetConfirmationToken.setConfirmed(tmp.isConfirmed());
            }
            else {
                resetConfirmationToken.setExpiresAt(LocalDateTime.now().plusMinutes(15));
                resetConfirmationToken.setConfirmed(false);
            }
        }

        String mailBody = "Dear " + user.getFirstName() + " " + user.getLastName() + ","
                +"\n\nClick following link to reset your password: "
                +"https://intralinkk-4f8233098a40.herokuapp.com/general/reset?token="+resetConfirmationToken.getToken()
                +"\nAfter clicking the link, your password will be: "+tmpPass
                +"\nPlease after logging in, change your password!"
                +"\n\n\n*** The link will be expired within 15 minutes!";

        ResetConfirmationTokenDto resetConfirmationMail = new ResetConfirmationTokenDto(user.getEmail(), mailBody);

        mailService.sendResetPasswordConfirmation(resetConfirmationMail);
    }

    @Transactional
    public void setProfilePicture(String username, Long fileId) throws Exception {
        User user = userDao.findUserByUsername(username);
        if(user == null) throw new Exception("User Does Not Exist!");

        user.setProfilePicture(fileId.toString());
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

    /*
    @Transactional
    @PostConstruct
    public void testRun() {
        for(int i = 1; i <= 10; i++) {
            User newUser = new User();

            newUser.setUsername("test-user" + i);
            newUser.setAddress("test" + i);
            newUser.setAge(i + 20);
            newUser.setBirthdate(LocalDate.now().minusYears(i + 20));
            newUser.setCredentialsExpiration(LocalDateTime.now().plusMonths(3));
            newUser.setDepartment("test");
            newUser.setEmail("test" + i + "@test.com");
            newUser.setFirstName("dummy" + i);
            newUser.setGender("other");
            newUser.setIsAccountNonExpired(true);
            newUser.setIsAccountNonLocked(true);
            newUser.setIsCredentialsNonExpired(true);
            newUser.setIsEnabled(true);
            newUser.setLastName("test");
            newUser.setPassword(passwordEncoder.encode("testPass"));
            newUser.setPhoneNumber("05XXXXXXXXX");
            newUser.setProfilePicture("");
            newUser.setRole("EMPLOYEE");
            newUser.setTitle("tester");

            userDao.save(newUser);
        }
    }
    */
}
