package com.nurullah.carRegistrationSystem.api;

import com.nurullah.carRegistrationSystem.DTOs.request.CreateCarRequest;
import com.nurullah.carRegistrationSystem.DTOs.request.UpdateCarRequest;
import com.nurullah.carRegistrationSystem.DTOs.response.CarResponse;
import com.nurullah.carRegistrationSystem.bussiness.abstractt.ICarService;
import com.nurullah.carRegistrationSystem.core.utilities.DataResult;
import com.nurullah.carRegistrationSystem.core.utilities.Result;
import com.nurullah.carRegistrationSystem.entities.Car;
import org.springframework.web.bind.annotation.*;

import javax.xml.crypto.Data;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cars")
public class CarsController {
    private final ICarService carService;

    public CarsController(ICarService carService) {
        this.carService = carService;
    }

    @GetMapping
    public DataResult<List<CarResponse>> getAllCarsOrfindByUserIdOrBrandOrModel
            (@RequestParam Optional<Integer> userId,@RequestParam Optional<String> brand,@RequestParam Optional<String> modal){
        return carService.getAllCarsOrfindByUserIdOrBrandOrModel(userId,modal,brand);
    }


    @GetMapping("/{carId}")
    public DataResult<CarResponse> getOneCarsById(@PathVariable int carId){
        return carService.getOneCarsByIdApi(carId);
    }

    @PostMapping
    public DataResult<Car> createOneCar(@RequestBody CreateCarRequest createCarRequest){
        return carService.createOneCar(createCarRequest);
    }

    @PutMapping("/{carId}")
    public DataResult<Car> updateOneCar(@PathVariable int carId,@RequestBody UpdateCarRequest UpdateCarRequest){
        return carService.updateOneCar(carId,UpdateCarRequest);
    }

    @DeleteMapping("{carId}")
    public DataResult<Integer> removeById(@PathVariable int carId){
        return carService.removeById(carId);
    }
}
