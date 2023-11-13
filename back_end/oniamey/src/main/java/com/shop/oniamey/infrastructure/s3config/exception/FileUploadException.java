package com.shop.oniamey.infrastructure.s3config.exception;

public class FileUploadException extends SpringBootFileUploadException{
    public FileUploadException(String message) {
        super(message);
    }
}
