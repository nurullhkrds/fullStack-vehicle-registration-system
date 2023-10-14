package com.nurullah.carRegistrationSystem.entities;


import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "cars")
@Data
public class Car {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id",nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Column(name = "carname")
    private String carName;

    @Column(name = "brand")
    private String brand;

    @Column(name = "modal")
    private String modal;

    @Column(name="year")
    private String year;

    @Column(name = "plate")
    private String plate;

    @Temporal(TemporalType.TIMESTAMP)
    Date createDate;


}
