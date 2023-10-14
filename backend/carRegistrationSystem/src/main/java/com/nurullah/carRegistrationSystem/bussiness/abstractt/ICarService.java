package com.nurullah.carRegistrationSystem.bussiness.abstractt;

import com.nurullah.carRegistrationSystem.DTOs.request.CreateCarRequest;
import com.nurullah.carRegistrationSystem.DTOs.request.UpdateCarRequest;
import com.nurullah.carRegistrationSystem.DTOs.response.CarResponse;
import com.nurullah.carRegistrationSystem.core.utilities.DataResult;
import com.nurullah.carRegistrationSystem.entities.Car;

import java.util.List;
import java.util.Optional;

public interface ICarService {
    DataResult<List<CarResponse>> getAllCarsOrfindByUserIdOrBrandOrModel(Optional<Integer> userId, Optional<String> modal, Optional<String> brand);

    DataResult<Car> getOneCarsByIdHelp(int carId);
    DataResult<CarResponse> getOneCarsByIdApi(int carId);


    DataResult<Car> createOneCar(CreateCarRequest createCarRequest);

    DataResult<Car> updateOneCar(int carId, UpdateCarRequest updateCarRequest);

    DataResult<Integer> removeById(int carId);
}
