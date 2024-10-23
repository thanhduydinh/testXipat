import { Button } from "@shopify/polaris";

const Home = () => {
  return (
    <div>
      <h1 className='text-2xl text-[#303030] font-semibold px-4 py-10'>DashBoard</h1>

      <div>
        <Button size='medium'>Add product</Button>
      </div>
    </div>
  );
};
export default Home;
