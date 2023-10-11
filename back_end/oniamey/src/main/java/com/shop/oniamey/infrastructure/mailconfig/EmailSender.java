package com.shop.oniamey.infrastructure.mailconfig;

import com.shop.oniamey.infrastructure.constant.MailConstant;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;

@Slf4j
@Service
public class EmailSender {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String sender;

    @Async
    public void sendEmail(String[] toEmails, String subject, String titleEmail, String bodyEmail) {
//        String htmlBody = MailConstant.BODY_STARTS +
//                titleEmail +
//                MailConstant.BODY_BODY +
//                bodyEmail +
//                MailConstant.BODY_END;
        String htmlBody = "<b>Chào Mừng bạn đến với shop bán hàng phông Oniemay</b>" +
                "<p>Chúng tôi rất vui khi bạn đã đăng ký tài khoản thành công trên hệ thống của chúng tôi</p>" +
                "<p>Chúng tôi sẽ gửi đến bạn những thông tin mới nhất về sản phẩm của chúng tôi</p>";
        sendSimpleMail(toEmails, htmlBody, subject);
    }

    private void sendSimpleMail(String[] recipients, String msgBody, String subject) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, StandardCharsets.UTF_8.toString());
            ClassPathResource resource = new ClassPathResource(MailConstant.LOGO_PATH);
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setBcc(recipients);
            mimeMessageHelper.setText(msgBody, true);
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.addInline("logoImage", resource);
            javaMailSender.send(mimeMessage);
        } catch (Exception e) {
            log.error("ERROR WHILE SENDING MAIL: {}", e.getMessage());
        }
    }
}