package com.shop.oniamey.core.admin.order.service.impl;

import com.shop.oniamey.core.admin.order.model.request.OrderRequest;
import com.shop.oniamey.core.admin.order.model.response.CountStatusResponse;
import com.shop.oniamey.core.admin.order.model.response.OrderResponse;
import com.shop.oniamey.core.admin.order.service.IOrderService;
import com.shop.oniamey.entity.Orders;
import com.shop.oniamey.entity.base.EnumStatus;
import com.shop.oniamey.infrastructure.exception.RestApiException;
import com.shop.oniamey.repository.customer.CustomerRepository;
import com.shop.oniamey.repository.order.OrderRepository;
import com.shop.oniamey.repository.user.UserRepository;
import com.shop.oniamey.repository.voucher.VoucherRepository;
import com.shop.oniamey.util.QRCodeProduct;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService implements IOrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository UserRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private VoucherRepository voucherRepository;

    public List<OrderResponse> getAllOrder(){
        return orderRepository.findAllOrder();
    }

    @Override
    public Page<OrderResponse> getAllOrder(Pageable pageable) {
        return orderRepository.findAllOrder(pageable);
    }

    @Override
    public OrderResponse getOrderById(Long id) {
         if(orderRepository.getOrdersById(id).isPresent()){
             return orderRepository.getOrdersById(id).get();
         }
         throw new RestApiException("ORDER NOT EXISTS");
    }


    public String createOrder(OrderRequest orderRequest){
        Orders orders= new Orders();
        String randomCode= QRCodeProduct.generateRandomCode();
        orders.setDeleted(false);
        if (UserRepository.findById(orderRequest.getUserId()).isEmpty()){
           return "user not found";
        }
        if(customerRepository.findById(orderRequest.getCustomerId()).isEmpty()){
            return "customer not found";
        }
        if (voucherRepository.findById(orderRequest.getVoucherId()).isEmpty()){
          return "voucher not found";
        }
        orders.setCode(randomCode);
        orders.setUser(UserRepository.findById(orderRequest.getUserId()).get());
        orders.setCustomer(customerRepository.findById(orderRequest.getCustomerId()).get());
        orders.setVoucher(voucherRepository.findById(orderRequest.getVoucherId()).get());
        orders.setPhoneNumber(orderRequest.getPhoneNumber());
        orders.setAddress(orderRequest.getAddress());
        orders.setUserName(orderRequest.getUserName());
        orders.setTotalMoney(orderRequest.getTotalMoney());
        orders.setConfirmationDate(orderRequest.getConfirmationDate());
        orders.setShipDate(orderRequest.getShipDate());
        orders.setReceiveDate(orderRequest.getReceiveDate());
        orders.setCompletionDate(orderRequest.getCompletionDate());
        orders.setType(orderRequest.getType());
        orders.setNote(orderRequest.getNote());
        orders.setMoneyShip(orderRequest.getMoneyShip());
        orders.setStatus(EnumStatus.PENDING);
        orderRepository.save(orders);
        return "Create order success";
    }

    @Transactional
    @Override
    public String deleteOrder(Long id) {
        if (orderRepository.findById(id).isEmpty()){
            return "order id not found";
        }
        orderRepository.deleteOrder(id);
         return "delete order success";
    }

    @Override
    public String updateOrder(Long id, OrderRequest orderRequest) {
        if (orderRepository.findById(id).isEmpty()){
            return "order id not found";
        }
        Orders orders = orderRepository.findById(id).get();
        if (UserRepository.findById(orderRequest.getUserId()).isEmpty()){
            return "user not found";
        }
        if(customerRepository.findById(orderRequest.getCustomerId()).isEmpty()){
            return "customer not found";
        }
        if (voucherRepository.findById(orderRequest.getVoucherId()).isEmpty()){
            return "voucher not found";
        }
        orders.setUser(UserRepository.findById(orderRequest.getUserId()).get());
        orders.setCustomer(customerRepository.findById(orderRequest.getCustomerId()).get());
        orders.setVoucher(voucherRepository.findById(orderRequest.getVoucherId()).get());
        orders.setPhoneNumber(orderRequest.getPhoneNumber());
        orders.setAddress(orderRequest.getAddress());
        orders.setUserName(orderRequest.getUserName());
        orders.setTotalMoney(orderRequest.getTotalMoney());
        orders.setConfirmationDate(orderRequest.getConfirmationDate());
        orders.setShipDate(orderRequest.getShipDate());
        orders.setReceiveDate(orderRequest.getReceiveDate());
        orders.setCompletionDate(orderRequest.getCompletionDate());
        orders.setType(orderRequest.getType());
        orders.setNote(orderRequest.getNote());
        orders.setMoneyShip(orderRequest.getMoneyShip());
        orders.setStatus(EnumStatus.PENDING);
        orderRepository.save(orders);
        return "Update order success";
    }

    @Override
    public CountStatusResponse getCountStatus() {
        return orderRepository.getCountStatus();
    }

    @Override
    public Page<OrderResponse> getOrdersByStatus(Pageable pageable, String status) {
        return orderRepository.getOrdersByStatus(pageable,status);
    }



}
