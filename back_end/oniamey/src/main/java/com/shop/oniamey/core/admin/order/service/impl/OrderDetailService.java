package com.shop.oniamey.core.admin.order.service.impl;

import com.shop.oniamey.core.admin.order.model.request.OrderDetailRequest;
import com.shop.oniamey.core.admin.order.model.response.OrderDetailResponse;
import com.shop.oniamey.core.admin.order.service.IOrderDetailService;
import com.shop.oniamey.entity.OrderDetail;
import com.shop.oniamey.entity.ProductDetail;
import com.shop.oniamey.repository.order.OrderDetailRepository;
import com.shop.oniamey.repository.order.OrderRepository;
import com.shop.oniamey.repository.product.ProductDetailRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailService implements IOrderDetailService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;
    @Autowired
    private PaymentMethodService paymentMethodService;
    @Autowired
    private ProductDetailRepository productDetailRepository;
    @Override
    public List<OrderDetailResponse> getOderDetailByOrderId(Long id) {
        paymentMethodService.generate2Method();
        if(orderRepository.findById(id).isPresent()){
            return orderDetailRepository.getOrderDetailByOrderId(id);
        }
        return null;
    }
    @Transactional
    @Override
    public String createOrderDetail(List<OrderDetailRequest> listOrderDetail){
        for (OrderDetailRequest  orderDetailRequest:
                listOrderDetail) {
            if(orderRepository.findById(orderDetailRequest.getIdOrder()).isEmpty()){
                return "id order không tồn tại";
            }
            if(productDetailRepository.findById(orderDetailRequest.getIdProductDetail()).isEmpty()){
                return "id product detail không tồn tại";
            }
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setOrder(orderRepository.findById(orderDetailRequest.getIdOrder()).get());
            orderDetail.setProductDetail(productDetailRepository.findById(orderDetailRequest.getIdProductDetail()).get());
            orderDetail.setPrice(orderDetailRequest.getPrice());
            orderDetail.setQuantity(orderDetailRequest.getQuantity());
            orderDetail.setTotalMoney(orderDetailRequest.getTotalMoney());
            ProductDetail productDetail=productDetailRepository.findById(orderDetailRequest.getIdProductDetail()).get();
            if (productDetail.getQuantity()-orderDetailRequest.getQuantity()>=0){
                productDetail.setQuantity(productDetail.getQuantity()-orderDetailRequest.getQuantity());
            }else {
                return "số lượng trong kho không đủ";
            }
            orderDetailRepository.save(orderDetail);
        }
        return "create order detail success";
    }
}
