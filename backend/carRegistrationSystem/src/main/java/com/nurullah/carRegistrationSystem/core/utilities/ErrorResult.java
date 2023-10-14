package com.nurullah.carRegistrationSystem.core.utilities;

public class ErrorResult extends Result{

    public ErrorResult(String message) {
        super(false, message);
    }
}
