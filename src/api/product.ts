import axios from "axios";

interface Rule {
  buyFrom: number;
  buyTo: number;
  discountPerItem: number;
}

interface ProductData {
  id: string;
  title: string;
  price: number;
  description: string;
  titleCampaign: string;
  imageUrl: string;
  createdAt: string;
  startDate: number;
  endDate: number;
  rules: Rule[];
}

const API_URL = "https://6650cfde20f4f4c442763130.mockapi.io/products/product";

export const getProducts = async (): Promise<ProductData[] | null> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Có lỗi xảy ra khi gọi API:", error);
    return null;
  }
};

export const createProduct = async (
  newProduct: Partial<ProductData>
): Promise<ProductData | null> => {
  try {
    const response = await axios.post(API_URL, newProduct);
    return response.data;
  } catch (error) {
    console.error("Có lỗi xảy ra khi tạo sản phẩm:", error);
    return null;
  }
};

export const updateProduct = async (
  id: string,
  updatedProduct: Partial<ProductData>
): Promise<ProductData | null> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedProduct);
    return response.data;
  } catch (error) {
    console.error("Có lỗi xảy ra khi sửa sản phẩm:", error);
    return null;
  }
};

export const deleteProduct = async (id: string): Promise<ProductData | null> => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Có lỗi xảy ra khi xóa sản phẩm:", error);
    return null;
  }
};
