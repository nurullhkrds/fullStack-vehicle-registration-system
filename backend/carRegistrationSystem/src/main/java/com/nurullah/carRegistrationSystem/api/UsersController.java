package com.nurullah.carRegistrationSystem.api;

import com.nurullah.carRegistrationSystem.DTOs.request.ChangePasswordUserRequest;
import com.nurullah.carRegistrationSystem.DTOs.request.CreateUserRequest;
import com.nurullah.carRegistrationSystem.DTOs.response.ChangePasswordResponse;
import com.nurullah.carRegistrationSystem.bussiness.abstractt.IUserService;
import com.nurullah.carRegistrationSystem.core.utilities.DataResult;
import com.nurullah.carRegistrationSystem.core.utilities.Result;
import com.nurullah.carRegistrationSystem.entities.User;
import org.springframework.web.bind.annotation.*;

import javax.xml.crypto.Data;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UsersController {

    private final IUserService userService;

    public UsersController(IUserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public DataResult<List<User>>getAllUsers(){
        return userService.getAllUser();
    }

    @GetMapping("/{userId}")
    public DataResult<User> getById(@PathVariable int userId){
        return userService.getById(userId);

    }



    @PostMapping
    public DataResult<User> createOneUser(@RequestBody CreateUserRequest createUserRequest){
        return userService.createOneUser(createUserRequest);
    }

    @PutMapping("/{userId}")
    public ChangePasswordResponse updateOneUser(@PathVariable int userId, @RequestBody ChangePasswordUserRequest changePasswordUserRequest){
        return userService.updateOneUser(userId,changePasswordUserRequest);
    }

    @DeleteMapping("/{userId}")
    public Result removeById(@PathVariable int userId){
        return userService.removeById(userId);
    }
}
