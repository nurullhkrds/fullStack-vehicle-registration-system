package com.nurullah.carRegistrationSystem.DTOs.request;

import com.nurullah.carRegistrationSystem.entities.User;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
public class CreateCarRequest {


    private String carName;

    private String brand;

    private String modal;

    private String year;

    private String plate;

    private int userId;
    private String url;
}
