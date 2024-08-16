import axios from "axios";

const productApi = axios.create({
  baseURL: " https://trapelkuh.daffazuhdii.my.id",
});

export default productApi;
