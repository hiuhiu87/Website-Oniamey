import instance from "../utils/axiosCustomize";

const API_UPOAD_AVATER =
  instance.defaults.baseURL + "api/storage/upload-avatar";
const API_DELETE_AVATER =
  instance.defaults.baseURL + "api/storage/delete-avatar";

class ApiUploadAvater {
  uploadAvatar = () => {
    return API_UPOAD_AVATER;
  };

  deleteAvatar = (file) => {
    return instance.delete(API_DELETE_AVATER, { params: { file } });
  };
}

const apiUploadAvater = new ApiUploadAvater();

export default apiUploadAvater;
