package com.nurullah.carRegistrationSystem.repository;

import com.nurullah.carRegistrationSystem.entities.ImageCar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface ImageCarRepository extends JpaRepository<ImageCar,Integer> {
    List<ImageCar> findByCarId(Integer carId);
}
