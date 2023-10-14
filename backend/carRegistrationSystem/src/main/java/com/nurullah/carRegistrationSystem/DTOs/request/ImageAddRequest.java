package com.nurullah.carRegistrationSystem.DTOs.request;

import com.nurullah.carRegistrationSystem.core.utilities.DataResult;
import com.nurullah.carRegistrationSystem.entities.ImageCar;
import lombok.Data;

@Data
public class ImageAddRequest {

    private String url;
    private int carId;


}
