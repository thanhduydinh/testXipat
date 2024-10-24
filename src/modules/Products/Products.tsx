import { Button } from "@shopify/polaris";
import ProductTable from "./components/ProductTable";
import { useEffect, useState } from "react";
import { createProduct, getProducts } from "@/api/product";
import AddProductModal from "./components/AddProductModal";
import { ProductDataProps } from "./components/type";

const Product = () => {
  const [data, setData] = useState<ProductDataProps[]>([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const toggleModal = () => setIsModalActive(!isModalActive);

  useEffect(() => {
    handleGetProducts();
  }, []);

  const handleGetProducts = async () => {
    const res = await getProducts();
    setData(res || []);
  };
  const handleAddProduct = async (productData: ProductDataProps) => {
    const result = await createProduct(productData);
    if (result) {
      await handleGetProducts();
      setIsModalActive(false);
    }
  };

  return (
    <div className='bg-white px-6  min-h-svh'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl text-[#303030] font-semibold py-10'>Products</h1>

        <Button variant='secondary' size='large' onClick={toggleModal}>
          Add product
        </Button>
      </div>

      <ProductTable data={data} onDataChange={handleGetProducts} />
      <AddProductModal isActive={isModalActive} onClose={toggleModal} onSubmit={handleAddProduct} />
    </div>
  );
};
export default Product;
