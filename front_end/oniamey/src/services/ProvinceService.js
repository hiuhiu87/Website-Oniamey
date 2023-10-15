import axios from "axios";

const API_URL = "https://provinces.open-api.vn/api/";

class ProvinceService {
  getProvinces() {
    return axios.get(API_URL + "p/");
  }

  getDistricts(provinceId) {
    return axios.get(API_URL + "p/" + provinceId + "?depth=2");
  }

  getWards(districtId) {
    return axios.get(API_URL + "d/" + districtId + "?depth=2");
  }
}

const provinceService = new ProvinceService();

export default provinceService;
