package com.shop.oniamey.core.admin.order.model.response;

import java.util.Date;

public interface OrderPaymentMethodResponse {
    String getMethodName();
    Date getNgayThanhToan();
    String getNote();
    Long getSoTienThanhToan();
    String getTenNhanVien();
}
