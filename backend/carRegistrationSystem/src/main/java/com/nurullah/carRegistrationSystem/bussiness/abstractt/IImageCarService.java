package com.nurullah.carRegistrationSystem.bussiness.abstractt;


import com.nurullah.carRegistrationSystem.DTOs.request.ImageAddRequest;
import com.nurullah.carRegistrationSystem.DTOs.response.ImageResponse;
import com.nurullah.carRegistrationSystem.core.utilities.DataResult;
import com.nurullah.carRegistrationSystem.entities.ImageCar;

import java.util.List;
import java.util.Optional;

public interface IImageCarService {
    DataResult<List<ImageResponse>> getAllOrByCarId(Optional<Integer> carId);

    DataResult<ImageResponse> getImageById(int imageId);

    DataResult<ImageResponse> addOneImage(ImageAddRequest imageAddRequest);

    DataResult<Integer> removeOneImage(int imageId);
}
