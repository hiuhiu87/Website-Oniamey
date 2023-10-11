import axios from "axios";

const instance = axios.create({
    // Đường link backend muốn gọi tới
    baseURL: 'http://localhost:8088/',

});

export default instance;