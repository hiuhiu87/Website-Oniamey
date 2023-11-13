package com.shop.oniamey.infrastructure.s3config.exception;

public class FileEmptyException extends SpringBootFileUploadException {
    public FileEmptyException(String message) {
        super(message);
    }
}
