package com.nurullah.carRegistrationSystem.bussiness.concretes;

import com.nurullah.carRegistrationSystem.DTOs.request.ChangePasswordUserRequest;
import com.nurullah.carRegistrationSystem.DTOs.request.CreateUserRequest;
import com.nurullah.carRegistrationSystem.DTOs.response.ChangePasswordResponse;
import com.nurullah.carRegistrationSystem.bussiness.abstractt.IUserService;
import com.nurullah.carRegistrationSystem.core.utilities.*;
import com.nurullah.carRegistrationSystem.entities.User;
import com.nurullah.carRegistrationSystem.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;

@Service
public class UserManager implements IUserService {
    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    public UserManager(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @Override
    public DataResult<List<User>> getAllUser() {

        return new SuccesDataResult<List<User>>("Data Getirildi",userRepository.findAll());
    }

    @Override
    public DataResult<User> getById(int userId) {
        Optional<User> haveIsUser=userRepository.findById(userId);
        if (haveIsUser.isPresent()){
            return new SuccesDataResult<User>("Data getirildi",haveIsUser.get());
        }
        return new ErrorDataResult<User>("Data bulunamadı...!",null);
    }

    @Override
    public DataResult<User> getByUserName(String userName) {
        User haveIsUser=userRepository.findByUserName(userName);
        if(haveIsUser!=null){
            return new SuccesDataResult<User>("Data getirildi",haveIsUser);
        }

        return new ErrorDataResult<User>("Data bulunamadı...!",null);
    }

    @Override
    public DataResult<User> createOneUser(CreateUserRequest createUserRequest) {
        User haveIsUsername= userRepository.findByUserName(createUserRequest.getUserName());
        if(haveIsUsername==null){
            User toSaveUser=new User();
            toSaveUser.setName(createUserRequest.getName());
            toSaveUser.setLastName(createUserRequest.getLastName());
            toSaveUser.setUserName(createUserRequest.getUserName());
            toSaveUser.setPassword(createUserRequest.getPassword());
            userRepository.save(toSaveUser);
            return new SuccesDataResult<User>("Kullanıcı Oluşturuldu...",toSaveUser);

        }
        return new ErrorDataResult<User>("Böyle bir kullanıcı adı zaten var",null);
    }

    @Override
    public ChangePasswordResponse updateOneUser(int userId, ChangePasswordUserRequest changePasswordUserRequest) {
        ChangePasswordResponse message=new ChangePasswordResponse();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        String oldPassword=getById(userId).getData().getPassword();
        User userToUpdate=getById(userId).getData();
        boolean  isPasswordMatch = passwordEncoder.matches(changePasswordUserRequest.getOldPassword(), oldPassword);

        if(isPasswordMatch==true){
                User user=userToUpdate;
                user.setPassword(passwordEncoder.encode(changePasswordUserRequest.getNewPassword()));
                userRepository.save(userToUpdate);
                message.setMessage("Şifre Başarıyla Değiştirildi...");

            return message;


        }else{
            message.setMessage("Mevcut şifre yanlış !");
            return message;

        }






    }

    @Override
    public Result removeById(int userId) {
        Optional<User> haveIsUser=userRepository.findById(userId);
        if (haveIsUser.isPresent()){
            userRepository.deleteById(userId);
            return new SuccessResult("Kullanıcı silindi...");


        }
        return new ErrorResult("Kullanıcı bulunamadı");
    }

}
