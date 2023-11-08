import instance from "../../utils/axiosCustomize";

const BASE_API_URL_PROMOTION = "api/admin/promotion";
class PromotionService {
  createPromotion(promotion) {
    return instance.post(
      BASE_API_URL_PROMOTION + "/create-promotion",
      promotion
    );
  }

  updatePromotion(promotion, id) {
    return instance.put(
      BASE_API_URL_PROMOTION + "/update-promotion/" + id,
      promotion
    );
  }

  changeStatusPromotion(id) {
    return instance.put(
      BASE_API_URL_PROMOTION + "/update-promotion-deleted/" + id
    );
  }

  getAllPromotion() {
    return instance.get(BASE_API_URL_PROMOTION + "/get-all-promotion");
  }

  getDetailPromotion(id) {
    return instance.get(BASE_API_URL_PROMOTION + "/get-promotion-by-id/" + id);
  }

  getProductDetailsByPromotionID(id) {
    return instance.get(
      BASE_API_URL_PROMOTION + "/get-product-by-promotion-id/" + id
    );
  }

  getPromotionByFilter(dataSearch) {
    return instance({
      method: "GET",
      url: `/api/admin/promotion/get-product-by-search`,
      params: dataSearch,
    });
  }

  getProductByPromotion() {
    return instance({
      method: "GET",
      url: BASE_API_URL_PROMOTION + `/get-product-withProduct`
    });
  }
}

const promotionService = new PromotionService();

export default promotionService;
