const apiUrl = {
  BASE: "/api",
  V1: "/v1",
  USER: "/user",
  CATEGORY: "/category",
  MEDIA: "/media",
  PRODUCT: "/product",
  CART: "/cart",
  ADDRESS: "/address",
  ORDER: "/order",
};

const apiProcess = {
  CREATE: "/create",
  UPDATE: "/update",
  DELETE: "/delete/:id",
  LIST: "/list",
  DETAIL: "/detail/:id",
  EMPTY: "/empty",
  VERIFY_PAYMENT: "/verify-payment",
  USER_ORDERS: "/user-orders",
  SEND_OTP: "/send-otp",
  VERIFY_OTP: "/verify-otp",
  UPDATE_STATUS: "/update-status",
};

const userRole = {
  ADMIN: 0,
  USER: 1,
};

const mediaType = {
  PRODUCT: 0,
  ADS: 1,
  SLIDER: 2,
};

const discountType = {
  PERCENTAGE: 0,
  CURRENCY: 1,
};

const mediaSubType = {
  // Product (type: 0)
  PRODUCT_MAIN: 0,
  PRODUCT_FEATURE: 1,

  // Ads (type: 1)
  ADS_HOME: 0,
  ADS_CATEGORY: 1,
  ADS_PRODUCT_PAGE: 2,
  ADS_LOGIN: 3,
  ADS_REGISTER: 4,
  ADS_ORDER: 5,
  ADS_CART: 6,

  // Slider (type: 2)
  SLIDER_POSITION_1: 0,
  SLIDER_POSITION_2: 1,
  SLIDER_POSITION_3: 2,
  SLIDER_POSITION_4: 3,
};

const deliveryStatus = {
  PENDING: 0,
  SHIPPED: 1,
  DELIVERED: 2,
  CANCELLED: 3,
};

const orderStatus = {
  PENDING: 0,
  CONFIRMED: 1,
  CANCELLED: 2,
};

const paymentMethod = {
  ONLINE: 0,
  COD: 1,
};

const paymentStatus = {
  PENDING: 0,
  PAID: 1,
  FAILED: 2,
  REFUNDED: 3,
};

module.exports = { apiUrl, apiProcess, userRole, mediaType, mediaSubType, discountType, deliveryStatus, orderStatus, paymentMethod, paymentStatus };
