package com.blood_donation_system.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourseNotFoundExeption extends RuntimeException{
    public ResourseNotFoundExeption(String message){
        super((message));
    }
}
