package com.shop.oniamey.entity.base;

import com.shop.oniamey.entity.Voucher;
import com.shop.oniamey.repository.VoucherRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Component
public class FakeData {

    @Autowired
    private VoucherRepository voucherRepository;

    // voucher
    @PostConstruct
    public void fakeDataVoucher() throws ParseException {
        Voucher voucher = new Voucher();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        fake1(voucher, sdf);
    }

    @PostConstruct
    public void fakeDataVoucher1() throws ParseException {
        Voucher voucher = new Voucher();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        fake2(voucher, sdf);
    }

    @PostConstruct
    public void fakeDataVoucher2() throws ParseException {
        Voucher voucher = new Voucher();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        fake3(voucher, sdf);
    }

    public void fake3(Voucher voucher, SimpleDateFormat sdf) throws ParseException {
        Date startDate;
        Date endDate;
        voucher.setVoucherName("Tên Voucher 1");
        voucher.setVoucherCode("Mã Voucher 2");
        voucher.setQuantity(30L);
        voucher.setMinimumDiscount(30.0);
        voucher.setMaximumDiscount(100.0);
        // Đặt thời gian bắt đầu và kết thúc
        startDate = sdf.parse("2023-10-25"); // Điền thời gian bắt đầu
        endDate = sdf.parse("2023-12-31"); // Điền thời gian kết thúc
        voucher.setStartDate(startDate);
        voucher.setEndDate(endDate);
        voucher.setType("x3xx");
        this.voucherRepository.save(voucher);
    }

    public void fake2(Voucher voucher, SimpleDateFormat sdf) throws ParseException {
        Date startDate;
        Date endDate;
        voucher.setVoucherName("Tên Voucher 1");
        voucher.setVoucherCode("Mã Voucher 1");
        voucher.setQuantity(30L);
        voucher.setMinimumDiscount(30.0);
        voucher.setMaximumDiscount(100.0);
        // Đặt thời gian bắt đầu và kết thúc
        startDate = sdf.parse("2023-11-25"); // Điền thời gian bắt đầu
        endDate = sdf.parse("2023-12-31"); // Điền thời gian kết thúc
        voucher.setStartDate(startDate);
        voucher.setEndDate(endDate);
        voucher.setType("x2xx");
        this.voucherRepository.save(voucher);
    }

    private void fake1(Voucher voucher, SimpleDateFormat sdf) throws ParseException {
        voucher.setVoucherName("Tên Voucher n");
        voucher.setVoucherCode("Mã Voucher1 ");
        voucher.setQuantity(30L);
        voucher.setMinimumDiscount(50.0);
        voucher.setMaximumDiscount(100.0);
        // Đặt thời gian bắt đầu và kết thúc
        Date startDate = sdf.parse("2023-09-25"); // Điền thời gian bắt đầu
        Date endDate = sdf.parse("2023-12-31"); // Điền thời gian kết thúc
        voucher.setStartDate(startDate);
        voucher.setEndDate(endDate);
        voucher.setType("x1xx");
        this.voucherRepository.save(voucher);
    }

}
