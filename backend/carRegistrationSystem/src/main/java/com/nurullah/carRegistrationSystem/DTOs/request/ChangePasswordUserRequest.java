package com.nurullah.carRegistrationSystem.DTOs.request;

import lombok.Data;

@Data
public class ChangePasswordUserRequest {
    private String oldPassword;
    private String newPassword;
}
