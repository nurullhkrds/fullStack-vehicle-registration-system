package com.nurullah.carRegistrationSystem.DTOs.response;

import com.nurullah.carRegistrationSystem.entities.ImageCar;
import lombok.Data;

@Data
public class ImageResponse {

    private int id;
    private String url;
    private int carId;
    private String carName;
    private String modal;
    private String plaka;
    private String brand;
    private String year;


    public ImageResponse(ImageCar entity) {
        this.id = entity.getId();
        this.carName=entity.getCar().getCarName();
        this.brand=entity.getCar().getBrand();
        this.modal=entity.getCar().getModal();
        this.year=entity.getCar().getYear();
        this.plaka=entity.getCar().getPlate();
        this.url = entity.getUrl();
        this.carId = entity.getCar().getId();
    }
}
