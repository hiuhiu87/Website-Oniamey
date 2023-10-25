package com.shop.oniamey.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHash {

    public static String hashPassword(String originPassword) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        if (originPassword == null || originPassword.isEmpty()) {
            return null;
        }
        return bCryptPasswordEncoder.encode(originPassword);
    }

//    public static void main(String[] args) {
//        System.out.println(hashPassword("11111"));
//    }
}
