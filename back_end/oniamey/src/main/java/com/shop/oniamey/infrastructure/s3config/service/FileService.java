package com.shop.oniamey.infrastructure.s3config.service;

import com.shop.oniamey.infrastructure.s3config.exception.FileDownloadException;
import com.shop.oniamey.infrastructure.s3config.exception.FileUploadException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
public interface FileService {

    String uploadFile(MultipartFile multipartFile) throws FileUploadException, IOException;

    Object downloadFile(String fileName) throws FileDownloadException, IOException;

    boolean delete(String fileName);

}
