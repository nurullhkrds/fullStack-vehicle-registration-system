package com.nurullah.carRegistrationSystem.DTOs.request;

import lombok.Data;

@Data
public class UpdateCarRequest {


    private String carName;

    private String brand;

    private String modal;

    private String year;

    private String plate;

}
