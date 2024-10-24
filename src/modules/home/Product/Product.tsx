import { Button } from "@shopify/polaris";
import IndexTableWithViewsSearchFilterSorting from "./_component/Table";
import axios from "axios";
import { useEffect, useState } from "react";
import LargeModal from "./_component/Modal";

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

const Product = () => {
  const [data, setData] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://6650cfde20f4f4c442763130.mockapi.io/products/product"
        );
        setData(response.data);
      } catch (error) {
        console.error("Có lỗi xảy ra:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateData = async (id: string, updatedProduct: Partial<ProductData>) => {
    try {
      const response = await axios.put(
        `https://6650cfde20f4f4c442763130.mockapi.io/products/product/${id}`,
        updatedProduct
      );
      setData(prevData => prevData.map(item => (item.id === id ? response.data : item)));
    } catch (error) {
      console.error("Có lỗi xảy ra khi sửa dữ liệu:", error);
    }
  };

  const handleUpdate = (id: string) => {
    const updatedProduct = {
      description: ""
    };
    updateData(id, updatedProduct);
  };

  // const updateData = async (id: string, updatedProduct: Partial<ProductData>) => {
  //   try {
  //     const response = await axios.put(
  //       `https://6650cfde20f4f4c442763130.mockapi.io/products/product/${id}`,
  //       updatedProduct
  //     );
  //     // Cập nhật lại dữ liệu sau khi sửa
  //     setData(prevData => prevData.map(item => (item.id === id ? response.data : item)));
  //   } catch (error) {
  //     console.error("Có lỗi xảy ra khi sửa dữ liệu:", error);
  //   }
  // };
  // const convertRules = (oldRules: any[]) => {
  //   return oldRules.map((rule, index) => {
  //     return {
  //       buyFrom: rule * (index + 1), // Logic tùy ý
  //       buyTo: rule * (index + 2), // Logic tùy ý
  //       discountPerItem: rule * 0.1 // Tỷ lệ giảm giá giả sử
  //     };
  //   });
  // };
  // const handleUpdate = (id: string) => {
  //   // Giả sử bạn muốn sửa title của sản phẩm và cập nhật rules
  //   const updatedProduct: Partial<ProductData> = {
  //     title: "Maven Lounge Chair",
  //     rules: [
  //       { buyFrom: 1, buyTo: 10, discountPerItem: 10 },
  //       { buyFrom: 1, buyTo: 10, discountPerItem: 10 }
  //     ] // Cập nhật rules mới
  //   };
  //   updateData(id, updatedProduct);
  // };

  return (
    <div className='bg-white px-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl text-[#303030] font-semibold py-10'>Products</h1>

        {/* chưa css đc button  */}
        <Button variant='secondary' size='large'>
          Add product
        </Button>
      </div>
      <Button variant='secondary' size='large' onClick={() => handleUpdate(data[0]?.id)}>
        Update First Product
      </Button>

      {/* <LargeModal /> */}

      <IndexTableWithViewsSearchFilterSorting data={data} />
    </div>
  );
};
export default Product;
