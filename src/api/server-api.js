import { client } from "@/utils/helper";
import { cookies } from "next/headers";



const getMe = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value ?? null;

    // agar token hi nahi hai
    if (!token) {
      return { user: null, success: false };
    }

    const response = await client.get("user/get", {
      headers: {
        Authorization: token,
      },
    });

    if (!response.data.success) {
      return { user: null, success: false };
    }

    return response.data;
  } catch (error) {
    console.log("GET ME ERROR:", error.response?.data || error.message);

    // 401 ya koi bhi error aaye to app crash nahi karega
    return {
      user: null,
      success: false,
    };
  }
};


const getCategories = async (query ={})=>{
  const cookieStore = await cookies();
  let token = cookieStore.get("jwt")?.value ?? null
  const filter = new URLSearchParams();
  if(query.id) filter.append("id",query.id)
  if(query.status !==undefined) filter.append("status",query.status)
  if(query.limit) filter.append("limit",query.limit)
  if(query.Is_home) filter.append("Is_home",query.Is_home)
  if(query.Is_popular) filter.append("Is_popular",query.Is_popular)


 const response =  await client.get(`category?${filter.toString()}`,{
  headers:{
    Authorization: token
  }
 })
  
  if(!response.data.success){
   throw new Error(response.data.message || "API FAIL")

  }
  return response.data
  
}
export{getMe,getCategories}