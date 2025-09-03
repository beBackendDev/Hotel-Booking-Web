import http from "../utils/http";

const paymentApi = {
  pay: (data) => http.post("/payments", data),
};

export default paymentApi;
