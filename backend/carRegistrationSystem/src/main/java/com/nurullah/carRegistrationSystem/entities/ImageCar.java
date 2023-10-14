package com.nurullah.carRegistrationSystem.entities;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name = "images")
@Data
public class ImageCar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String url;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "car_id",nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Car car;
}
