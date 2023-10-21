package com.shop.oniamey.infrastructure.constant;

public enum OrderStatus {
    PENDING,//chờ xác nhận
    CONFIRMED,//đã xác nhận
    SHIPPING,//ĐANG GIAO
    SHIPPED,//ĐÃ GIAO
    SUCCESS,//HOÀN THÁNH
    CANCEL,//HỦY
}
