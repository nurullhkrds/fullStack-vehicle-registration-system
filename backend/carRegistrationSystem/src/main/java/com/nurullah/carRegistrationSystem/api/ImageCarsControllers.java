package com.nurullah.carRegistrationSystem.api;


import com.nurullah.carRegistrationSystem.DTOs.request.ImageAddRequest;
import com.nurullah.carRegistrationSystem.DTOs.response.ImageResponse;
import com.nurullah.carRegistrationSystem.bussiness.abstractt.IImageCarService;
import com.nurullah.carRegistrationSystem.core.utilities.DataResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/images")
public class ImageCarsControllers {


    private final IImageCarService iImageCarService;

    public ImageCarsControllers(IImageCarService iImageCarService) {
        this.iImageCarService = iImageCarService;
    }


    @GetMapping
    public DataResult<List<ImageResponse>>getAllOrByCarId(@RequestParam Optional<Integer> carId){
        return iImageCarService.getAllOrByCarId(carId);
    }


    @GetMapping("/{imageId}")
    public DataResult<ImageResponse> getImageById(@PathVariable int imageId){
        return iImageCarService.getImageById(imageId);
    }

    @PostMapping
    public DataResult<ImageResponse> addOneImage(@RequestBody ImageAddRequest imageAddRequest){
        return iImageCarService.addOneImage(imageAddRequest);
    }

    @DeleteMapping("/{imageId}")
    public DataResult<Integer> removeOneImage(@PathVariable int imageId){
        return iImageCarService.removeOneImage(imageId);
    }

}
