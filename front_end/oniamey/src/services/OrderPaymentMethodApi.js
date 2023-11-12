import instance from '../utils/axiosCustomize';

const urlOrder = "api/admin/order-payment-method";

export const createOrderPaymentMethod = async (data) => {
    try {
        const result = await instance.post(`${urlOrder}`, data);
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getOPM = async(idOrder)=>{
    try {
        const result = await instance.get(`${urlOrder}/${idOrder}`);
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}