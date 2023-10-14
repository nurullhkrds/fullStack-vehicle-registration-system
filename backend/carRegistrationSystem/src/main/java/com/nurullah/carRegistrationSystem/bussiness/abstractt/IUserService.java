package com.nurullah.carRegistrationSystem.bussiness.abstractt;

import com.nurullah.carRegistrationSystem.DTOs.request.ChangePasswordUserRequest;
import com.nurullah.carRegistrationSystem.DTOs.request.CreateUserRequest;
import com.nurullah.carRegistrationSystem.DTOs.response.ChangePasswordResponse;
import com.nurullah.carRegistrationSystem.core.utilities.DataResult;
import com.nurullah.carRegistrationSystem.core.utilities.Result;
import com.nurullah.carRegistrationSystem.entities.User;

import java.util.List;

public interface IUserService {
    DataResult<List<User>> getAllUser();

    DataResult<User> getById(int userId);

    DataResult<User> getByUserName(String userName);

    DataResult<User> createOneUser(CreateUserRequest createUserRequest);

   ChangePasswordResponse updateOneUser(int userId, ChangePasswordUserRequest changePasswordUserRequest);

    Result removeById(int userId);
}
