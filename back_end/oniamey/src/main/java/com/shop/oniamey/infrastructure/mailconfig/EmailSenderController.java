package com.articlesproject.infrastructure.configemail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/email")
@CrossOrigin(origins = {"*"})
public class EmailSenderController {

    @Autowired
    private EmailSender emailSender;

    @PostMapping()
    public ResponseEntity<?> sendMail(@RequestBody Email email) {
        emailSender.sendEmail(email.getToEmail(), email.getSubject(), email.getTitleEmail(), email.getBody());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
