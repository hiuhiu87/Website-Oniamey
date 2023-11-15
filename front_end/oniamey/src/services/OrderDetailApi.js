import instance from '../utils/axiosCustomize';


const urlOrderDetail = "api/admin/order-detail";

export  const createOrderDetail = async (data)=>{
    try {
        const res= await instance.post(urlOrderDetail,data);
        return res.data;
    } catch (error) {
        console.log(error);
        return "";
    }
}
export const getListProductByOrderId =async (idOrder) => {
    try {
        const result =await instance.get(`${urlOrderDetail}/${idOrder}`);
        return result.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}