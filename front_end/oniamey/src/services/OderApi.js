
import instance from '../utils/axiosCustomize';
const urlOrder="api/admin/orders";
export  const createOrder = async (data)=>{
    try {
        const res= await instance.post(urlOrder,data);
        return res.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

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


export const getCountStatus= async ()=>{
    try {
        const res = await instance.get(`${urlOrder}/get-count-status`);
        return res.data;
    } catch (error) {
        console.log(error);
        return {};
    }
}

export const getByStatus= async(status)=>{
    try {
        const res= await instance.get(`${urlOrder}/get-by-status`,{params:{
                status
            }});
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}