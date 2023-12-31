import instance from '../utils/axiosCustomize';

const urlOrder = "api/admin/order-history";

export const getOrderHistoryByOrderId = async (id) => {
    try {
        const result = await instance.get(`${urlOrder}/${id}`);
        return result.data;
    } catch (error) {
        console.log(error);
        return [];
    }

}
export const updateOrderStatus = async (data) => {
    try {
        const result = await instance.post(`${urlOrder}/create-order-history`, data );
        return result.data;
    } catch (error) {
        console.log(error);
        return '';
    }
}