package com.shop.oniamey.infrastructure.s3config.web;

import com.shop.oniamey.infrastructure.s3config.exception.FileDownloadException;
import com.shop.oniamey.infrastructure.s3config.exception.FileEmptyException;
import com.shop.oniamey.infrastructure.s3config.exception.FileUploadException;
import com.shop.oniamey.infrastructure.s3config.service.FileService;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@RestController
@Slf4j
@RequestMapping("/api/v1/file")
@Validated
public class FileUploadController {
    private final FileService fileService;


    public FileUploadController(FileService fileUploadService) {
        this.fileService = fileUploadService;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile multipartFile) throws FileEmptyException, FileUploadException, IOException {
        if (multipartFile.isEmpty()){
            throw new FileEmptyException("File is empty. Cannot save an empty file");
        }
        boolean isValidFile = isValidFile(multipartFile);
        List<String> allowedFileExtensions = new ArrayList<>(Arrays.asList("pdf", "txt", "epub", "csv", "png", "jpg", "jpeg", "srt"));

        if (isValidFile && allowedFileExtensions.contains(FilenameUtils.getExtension(multipartFile.getOriginalFilename()))){
            String fileName = fileService.uploadFile(multipartFile);
            APIResponse apiResponse = APIResponse.builder()
                    .message("file uploaded successfully. File unique name =>" + fileName)
                    .isSuccessful(true)
                    .statusCode(200)
                    .build();
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } else {
            APIResponse apiResponse = APIResponse.builder()
                    .message("Invalid File. File extension or File name is not supported")
                    .isSuccessful(false)
                    .statusCode(400)
                    .build();
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/download")
    public ResponseEntity<?> downloadFile(@RequestParam("fileName")  @NotBlank @NotNull String fileName) throws FileDownloadException, IOException {
        Object response = fileService.downloadFile(fileName);
        if (response != null){
            return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"").body(response);
        } else {
            APIResponse apiResponse = APIResponse.builder()
                    .message("File could not be downloaded")
                    .isSuccessful(false)
                    .statusCode(400)
                    .build();
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@RequestParam("fileName") @NotBlank @NotNull String fileName){
        boolean isDeleted = fileService.delete(fileName);
        if (isDeleted){
            APIResponse apiResponse = APIResponse.builder().message("file deleted!")
                    .statusCode(200).build();
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } else {
            APIResponse apiResponse = APIResponse.builder().message("file does not exist")
                    .statusCode(404).build();
            return new ResponseEntity<>("file does not exist", HttpStatus.NOT_FOUND);
        }
    }

    private boolean isValidFile(MultipartFile multipartFile){
        log.info("Empty Status ==> {}", multipartFile.isEmpty());
        if (Objects.isNull(multipartFile.getOriginalFilename())){
            return false;
        }
        return !multipartFile.getOriginalFilename().trim().equals("");
    }
}
