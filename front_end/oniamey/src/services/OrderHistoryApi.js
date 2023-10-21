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