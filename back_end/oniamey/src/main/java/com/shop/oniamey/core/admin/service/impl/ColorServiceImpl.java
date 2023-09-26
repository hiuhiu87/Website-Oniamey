package com.shop.oniamey.core.admin.service.impl;

import com.shop.oniamey.core.admin.model.request.ColorRequest;
import com.shop.oniamey.core.admin.model.response.ColorResponse;
import com.shop.oniamey.core.admin.service.ColorService;
import com.shop.oniamey.entity.Color;
import com.shop.oniamey.repository.ColorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ColorServiceImpl implements ColorService {

    private ColorRepository colorRepository;

    @Autowired
    public void setColorRepository(ColorRepository colorRepository) {
        this.colorRepository = colorRepository;
    }

    @Override
    public List<ColorResponse> getAll() {
        return colorRepository.getAll();
    }

    @Override
    public String save(ColorRequest colorRequest) {
        Optional<Color> checkColor = colorRepository.findByColorName(colorRequest.getColorName());

        if (checkColor.isPresent()) {
            return "Màu đã tồn tại trong database";
        }

        Color color = new Color();
        color.setColorName(colorRequest.getColorName());
        color.setStatus(colorRequest.getStatus());
        colorRepository.save(color);
        return "Thêm màu thành công";
    }

    @Override
    public String update(Long id, ColorRequest colorRequest) {
        Optional<Color> checkColor = colorRepository.findById(id);
        if (checkColor.isPresent()) {
            Color color = checkColor.get();
            color.setColorName(colorRequest.getColorName());
            color.setStatus(colorRequest.getStatus());
            colorRepository.save(color);
            return "Cập nhật thành công";
        } else {
            return "Không tìm thấy màu";
        }
    }

    @Override
    public String changeStatus(Long id, Integer status) {
        Optional<Color> checkColor = colorRepository.findById(id);
        if (checkColor.isPresent()) {
            colorRepository.updateColorStatus(id, status);
            return "Cập nhật thành công";
        } else {
            return "Không tìm thấy màu";
        }
    }
}
