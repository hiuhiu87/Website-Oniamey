import axios from "axios";

const BASE_API_URL_PROMOTION = "http://localhost:8088/api/admin/promotion";

class PromotionService {

    createPromotion(promotion) {
        return axios.post(BASE_API_URL_PROMOTION + "/create-promotion", promotion);
    }

    updatePromotion(promotion, id) {
        return axios.put(
            BASE_API_URL_PROMOTION + "/update-promotion/" + id,
            promotion
        );
    }
    
    changeStatusPromotion(id) {
        return axios.put(BASE_API_URL_PROMOTION + "/update-promotion-deleted/" + id);
    }
    
    getAllPromotion() {
        return axios.get(BASE_API_URL_PROMOTION + "/get-all-promotion");
    }

    getDetailPromotion(id) {
        return axios.get(BASE_API_URL_PROMOTION + "/get-promotion-by-id/" + id);
    }
    
    getProductDetailsByPromotionID(id){
        return axios.get(BASE_API_URL_PROMOTION + "/get-product-by-promotion-id/" + id);
    }
}

const promotionService = new PromotionService();

export default promotionService;
