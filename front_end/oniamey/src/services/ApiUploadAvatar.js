import axios from "axios";

const API_UPOAD_AVATER = "http://localhost:8088/api/storage/upload-avatar";
const API_DELETE_AVATER = "http://localhost:8088/api/storage/delete-avatar";

class ApiUploadAvatar {
  uploadAvatar = () => {
    return API_UPOAD_AVATER;
  };

  deleteAvatar = (file) => {
    return axios.delete(API_DELETE_AVATER, { params: { file } });
  };
}

const apiUploadAvatar = new ApiUploadAvatar();

export default apiUploadAvatar;
