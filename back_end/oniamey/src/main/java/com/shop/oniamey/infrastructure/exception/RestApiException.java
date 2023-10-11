package com.shop.oniamey.infrastructure.exception;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RestApiException extends RuntimeException{
    private String message;
    public RestApiException(String mess){
        this.message= mess;
    }
}
