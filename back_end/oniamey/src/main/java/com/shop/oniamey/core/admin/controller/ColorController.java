package com.shop.oniamey.core.admin.controller;

import com.shop.oniamey.core.admin.model.request.ColorRequest;
import com.shop.oniamey.core.admin.model.response.ColorResponse;
import com.shop.oniamey.core.admin.service.ColorService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/color")
public class ColorController {

    private ColorService colorService;

    @Autowired
    public void setColorService(ColorService colorService) {
        this.colorService = colorService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<ColorResponse>> getAllColor(){
        return new ResponseEntity<>(colorService.getAll(), HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveColor(@Valid @RequestBody ColorRequest request){
        return new ResponseEntity<>(colorService.save(request), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateColor(@PathVariable Long id, @Valid @RequestBody ColorRequest request){
        return new ResponseEntity<>(colorService.update(id, request), HttpStatus.OK);
    }

    @PutMapping("/change-status/{id}")
    @Transactional
    public ResponseEntity<String> changeStatus(@PathVariable Long id, @RequestParam("status") Integer status){
        return new ResponseEntity<>(colorService.changeStatus(id, status), HttpStatus.OK);
    }

}
