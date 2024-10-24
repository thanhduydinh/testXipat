import { Button } from "@shopify/polaris";
import IndexTableWithViewsSearchFilterSorting from "./components/ProductTable";
import { useEffect, useState } from "react";
import { getProducts, updateProduct } from "@/api/product";
import AddProductModal from "./components/AddProductModal";

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

  const handleGetProducts = async () => {
    const res = await getProducts();
    setData(res || []);
    setLoading(false);
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  const handleUpdateProduct = async (id: string) => {
    const updatedProduct = {
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/6b50/ed93/353f7e69de6dd5574351137df89a77dc?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PKx9ZELDYVGAnAbYYvpZmgUX0Yk1H3YoH0YP1tHwJ2jCqqh1TcFCGPYhp7R-Hq4OC54zU~-PwGN3SWAm1lGZimDdoDDzx3VDjLXaNLIGl0G508mK6iTcGoEbbGVAyeGZDOSLoPxgbhb0K9a94rseJ69rY4Mak1pnC3VNIzWVlSJWQeb3XdHf~w1nTB~AyJdS7zukYhulPj4Zof3dt4~6~mRipgAJPUNOe5OoR5woAbtzTgBqZLm2I1qMKONZWhlQXAjTmK2Dd8aJpUYOoxRJH58a5fXlGZsgsJpJ1zCbxQEc2HaOZQUPhpw0NUIfqGmuI5dZc6t8q0Y9lmg9MocKbQ__"
    };
    const result = await updateProduct(id, updatedProduct);

    if (result) {
      setData(prevProducts => prevProducts.map(product => (product.id === id ? result : product)));
      console.log("Sản phẩm đã được cập nhật:", result);
    }
  };

  return (
    <div className='bg-white px-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl text-[#303030] font-semibold py-10'>Products</h1>

        {/* chưa css đc button  */}
        <Button variant='secondary' size='large'>
          Add product
        </Button>
      </div>
      {/* <Button variant='secondary' size='large' onClick={() => handleUpdateProduct(data[6]?.id)}>
        Update First Product
      </Button> */}

      <AddProductModal />

      <IndexTableWithViewsSearchFilterSorting data={data} />
    </div>
  );
};
export default Product;
