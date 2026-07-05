import { client } from "@/utils/helper";


export const getOrders = async () => {
  const response = await client.get("/order");
  return response.data;
};
export const getSingleOrder = async (id) => {
  const res = await client.get(`/order/${id}`);
  return res.data;
};

export const updateOrderStatus = async (id, data) => {
  const res = await client.put(`/order/status/${id}`, data);
  return res.data;
};
export const getDashboardData = async () => {
  const res = await client.get("/dashboard");
  return res.data;
};






export {getOrders,getSingleOrder,updateOrderStatus,getDashboardData}