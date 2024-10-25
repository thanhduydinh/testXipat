import { Frame, Navigation } from "@shopify/polaris";
import { HomeFilledIcon, OrderFilledIcon, SettingsIcon } from "@shopify/polaris-icons";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Frame
      navigation={
        <Navigation location={location.pathname}>
          <Navigation.Section
            items={[
              {
                url: "/dashboard",
                label: "Dashboard",
                icon: HomeFilledIcon,
                selected: location.pathname === "/dashboard",
                onClick: () => navigate("/dashboard")
              },
              {
                url: "/products",
                label: "Products",
                icon: OrderFilledIcon,
                selected: location.pathname === "/products",
                onClick: () => navigate("/products")
              },
              {
                url: "/settings",
                label: "Settings",
                icon: SettingsIcon,
                selected: location.pathname === "/settings",
                onClick: () => navigate("/settings")
              }
            ]}
          />
        </Navigation>
      }
    >
      <Outlet />
    </Frame>
  );
};
export default MainLayout;
