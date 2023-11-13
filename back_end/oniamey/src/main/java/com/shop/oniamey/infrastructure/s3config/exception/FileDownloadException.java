package com.shop.oniamey.infrastructure.s3config.exception;

public class FileDownloadException extends SpringBootFileUploadException {
    public FileDownloadException(String message) {
        super(message);
    }
}
