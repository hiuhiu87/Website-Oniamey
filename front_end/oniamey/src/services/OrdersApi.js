import instance from '../utils/axiosCustomize';

const urlOrder = "api/admin/orders";
export const getOrdersByStatus = async (page, size, status, orderType, keySearch) => {

    try {
        const res = await instance.get(
            urlOrder, {
            params: {
                page,
                size,
                status,
                orderType,
                keySearch
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
        return {};
    }
}
export const detail = async (id) => {
    try {
        const result = await instance.get(`${urlOrder}/detail/${id}`)
        return result.data;
    } catch (error) {
        console.log(error);
        return {};
    }
}
export const getCountStatus = async (orderType, keySearch) => {
    try {
        const res = await instance.get(`${urlOrder}/get-count-status`, {
            params: {
                orderType, 
                keySearch
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
        return {};
    }
}

export const getByStatus = async (status) => {
    try {
        const res = await instance.get(`${urlOrder}/get-by-status`, {
            params: {
                status
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}
export const formatDateTime = (Time) => {
    // Tách ngày và giờ từ chuỗi đầu vào
    const dateTimeParts = Time.split('T');
    const datePart = dateTimeParts[0];
    const timePart = dateTimeParts[1].split('.')[0]; // Loại bỏ phần millisecond

    // Tách thành các thành phần riêng lẻ (năm, tháng, ngày, giờ, phút, giây)
    const [year, month, day] = datePart.split('-');
    const [hour, minute, second] = timePart.split(':');

    // Tạo chuỗi định dạng theo yêu cầu
    const formattedDateTime = `${day}-${month}-${year} ${hour}:${minute}:${second}`;

    return formattedDateTime;
}