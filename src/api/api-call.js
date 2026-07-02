import { client } from "@/utils/helper";


const getProducts = async(query ={})=>{

   const filter = new URLSearchParams();
    if(query.id) filter.append("id",query.id)
    if(query.status !==undefined) filter.append("status",query.status)
    if(query.limit) filter.append("limit",query.limit)
    if(query.category_slug) filter.append("category_slug",query.category_slug)
    if(query.brand_slug) filter.append("brand_slug",query.brand_slug)
    if(query.color_slug) filter.append("color_slug",query.color_slug)
    if(query.minPrice) filter.append("minPrice",query.minPrice)
    if(query.maxPrice) filter.append("maxPrice",query.maxPrice)
    if(query.sort) filter.append("sort",query.sort)
  const response = await client.get(`product?${filter.toString()}`);
  if(!response.data.success){
    throw new Error(response.data.message || "API FAIL")
  }
  return response.data

}



const getBrands = async (query ={})=>{
  const filter = new URLSearchParams();
   if(query.id) filter.append("id",query.id)
  if(query.status !==undefined) filter.append("status",query.status)
  if(query.limit) filter.append("limit",query.limit)
  if(query.Is_top) filter.append("Is_top",query.Is_top)
  
  const response =  await client.get(`brand?${filter.toString()}`);
  
  if(!response.data.success){
   throw new Error(response.data.message || "API FAIL")

  }
  return response.data
  
}
  const getColors = async (query ={})=>{
    const filter = new URLSearchParams();
    if(query.id) filter.append("id",query.id)
    if(query.status !==undefined) filter.append("status",query.status)
    if(query.limit) filter.append("limit",query.limit)
  
    const response =  await client.get(`color?${filter.toString()}`);
    
    if(!response.data.success){
    throw new Error(response.data.message || "API FAIL")

    }
    return response.data
    
  }
const findCategoryById = async (id)=>{
 const response =  await client.get(`category/${id}`);
  
  if(!response.data.success){
   throw new Error(response.data.message || "API FAIL")

  }
  return response.data
  
}
const findProductById = async (id)=>{
 const response =  await client.get(`product/${id}`);
  
  if(!response.data.success){
   throw new Error(response.data.message || "API FAIL")

  }
  return response.data
  
}
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






export {getColors,getBrands,getProducts, findCategoryById,findProductById,getOrders,getSingleOrder,updateOrderStatus,getDashboardData}