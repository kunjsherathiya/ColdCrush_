import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Auth
export const sendOtpApi = (data) => api.post("/user/send-otp", data);
export const verifyOtpApi = (data) => api.post("/user/verify-otp", data);

// Category
export const createCategoryApi = (data) => api.post("/category/create", data);
export const updateCategoryApi = (data) => api.put("/category/update", data);
export const deleteCategoryApi = (id) => api.delete(`/category/delete/${id}`);
export const listCategoryApi = () => api.get("/category/list");

// Product
export const createProductApi = (data) => api.post("/product/create", data);
export const updateProductApi = (data) => api.put("/product/update", data);
export const deleteProductApi = (id) => api.delete(`/product/delete/${id}`);
export const listProductApi = () => api.get("/product/list");
export const detailProductApi = (id) => api.get(`/product/detail/${id}`);

// Media
export const createMediaApi = (data) => api.post("/media/create", data);
export const deleteMediaApi = (id) => api.delete(`/media/delete/${id}`);
export const listMediaApi = () => api.get("/media/list");

// Cart
export const createCartApi = (data) => api.post("/cart/create", data);
export const deleteCartApi = (id) => api.delete(`/cart/delete/${id}`);
export const listCartApi = () => api.get("/cart/list");
export const emptyCartApi = () => api.delete("/cart/empty");

// Address
export const createAddressApi = (data) => api.post("/address/create", data);
export const deleteAddressApi = (id) => api.delete(`/address/delete/${id}`);
export const listAddressApi = () => api.get("/address/list");

// Order
export const createOrderApi = (data) => api.post("/order/create", data);
export const verifyPaymentApi = (data) => api.post("/order/verify-payment", data);
export const userOrdersApi = () => api.get("/order/user-orders");
export const listOrderApi = () => api.get("/order/list");
export const updateOrderStatusApi = (data) => api.put("/order/update-status", data);

export default api;
