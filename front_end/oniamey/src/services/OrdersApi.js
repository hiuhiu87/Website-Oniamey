import instance from '../utils/axiosCustomize';
const urlOrder="api/admin/orders";

export const getOrdersByStatus= async (page,size,status)=>{
        try {
            const res= await instance.get(
                urlOrder,{params:{
                page,
                size,
                status
            }});
            return res.data;
        } catch (error) {
            console.log(error);
            return {};
        }
}