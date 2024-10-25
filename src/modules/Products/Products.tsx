import { Button, Text } from "@shopify/polaris";
import ProductTable from "./components/ProductTable";
import { useEffect, useState } from "react";
import { createProduct, getProducts } from "@/api/product";
import AddProductModal from "./components/AddProductModal";
import { ProductDataProps } from "./components/type";

const Product = () => {
  const [products, setProducts] = useState<ProductDataProps[]>([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const toggleModal = () => setIsModalActive(!isModalActive);

  useEffect(() => {
    handleGetProducts();
  }, []);

  const handleGetProducts = async () => {
    const res = await getProducts();
    setProducts(res || []);
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
      <div className='flex justify-between items-center pt-8 pb-6'>
        <Text variant='heading2xl' alignment='start' as='h3'>
          Products
        </Text>

        <Button variant='secondary' size='large' onClick={toggleModal}>
          Add product
        </Button>
      </div>

      <ProductTable data={products} onDataChange={handleGetProducts} />
      <AddProductModal isActive={isModalActive} onClose={toggleModal} onSubmit={handleAddProduct} />
    </div>
  );
};
export default Product;
