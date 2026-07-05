import axios from "axios";

const baseURL =
  typeof window === "undefined"
    ? `${process.env.BACKEND_URL}/api`
    : "/api";

const serverClient = axios.create({ baseURL });

const getProducts = async (query = {}) => {
  const filter = new URLSearchParams();
  if (query.id) filter.append("id", query.id);
  if (query.status !== undefined) filter.append("status", query.status);
  if (query.limit) filter.append("limit", query.limit);
  if (query.category_slug) filter.append("category_slug", query.category_slug);
  if (query.brand_slug) filter.append("brand_slug", query.brand_slug);
  if (query.color_slug) filter.append("color_slug", query.color_slug);
  if (query.minPrice) filter.append("minPrice", query.minPrice);
  if (query.maxPrice) filter.append("maxPrice", query.maxPrice);
  if (query.sort) filter.append("sort", query.sort);
  const response = await serverClient.get(`product?${filter.toString()}`);
  if (!response.data.success) {
    throw new Error(response.data.message || "API FAIL");
  }
  return response.data;
};

const getCategories = async (query = {}) => {
  try {
    const filter = new URLSearchParams();
    if (query.id) filter.append("id", query.id);
    if (query.status !== undefined) filter.append("status", query.status);
    if (query.limit) filter.append("limit", query.limit);
    if (query.Is_home) filter.append("Is_home", query.Is_home);
    if (query.Is_popular) filter.append("Is_popular", query.Is_popular);
    const url = `category${filter.toString() ? `?${filter.toString()}` : ""}`;
    const response = await serverClient.get(url);
    return response.data?.success ? response.data : { success: false, data: [] };
  } catch (error) {
    console.log("GET CATEGORY ERROR:", error.response?.data || error.message);
    return { success: false, data: [] };
  }
};

const getBrands = async (query = {}) => {
  const filter = new URLSearchParams();
  if (query.id) filter.append("id", query.id);
  if (query.status !== undefined) filter.append("status", query.status);
  if (query.limit) filter.append("limit", query.limit);
  if (query.Is_top) filter.append("Is_top", query.Is_top);
  const response = await serverClient.get(`brand?${filter.toString()}`);
  if (!response.data.success) {
    throw new Error(response.data.message || "API FAIL");
  }
  return response.data;
};

const getColors = async (query = {}) => {
  const filter = new URLSearchParams();
  if (query.id) filter.append("id", query.id);
  if (query.status !== undefined) filter.append("status", query.status);
  if (query.limit) filter.append("limit", query.limit);
  const response = await serverClient.get(`color?${filter.toString()}`);
  if (!response.data.success) {
    throw new Error(response.data.message || "API FAIL");
  }
  return response.data;
};

const findCategoryById = async (id) => {
  const response = await serverClient.get(`category/${id}`);
  if (!response.data.success) {
    throw new Error(response.data.message || "API FAIL");
  }
  return response.data;
};

const findProductById = async (id) => {
  const response = await serverClient.get(`product/${id}`);
  if (!response.data.success) {
    throw new Error(response.data.message || "API FAIL");
  }
  return response.data;
};

export { getProducts, getCategories, getBrands, getColors, findCategoryById, findProductById };