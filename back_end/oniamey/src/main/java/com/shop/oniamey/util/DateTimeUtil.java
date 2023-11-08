package com.shop.oniamey.util;

import java.sql.Timestamp;

public class DateTimeUtil {

    public static Long convertDateToTimeStampSecond() {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        return timestamp.getTime();
    }

}