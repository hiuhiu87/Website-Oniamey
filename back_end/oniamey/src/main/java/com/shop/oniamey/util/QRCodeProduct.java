package com.shop.oniamey.util;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.shop.oniamey.entity.Product;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

public class QRCodeProduct {

    public static String generateRandomCode() {
        return "Oniamey-" + UUID.randomUUID().toString().substring(0, 8);
    }

    public static void generateQRCode(Product product) throws IOException, WriterException {
        Path qrDir = Paths.get("qrcode");
        if(!Files.exists(qrDir)) {
            Files.createDirectories(qrDir);
        }
        String qrCodeName =product.getCode() + product.getName()  + "-QRCODE.png";
        var qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(
                "Code: " + product.getCode() + "\n"
                        + "Name: " + product.getName(), BarcodeFormat.QR_CODE, 400, 400);
        Path path = qrDir.resolve(qrCodeName);
        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);
    }

}
