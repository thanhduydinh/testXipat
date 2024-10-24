import { Frame, Navigation } from "@shopify/polaris";
import { HomeFilledIcon, OrderFilledIcon, SettingsIcon } from "@shopify/polaris-icons";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Frame
      // children={<Outlet />}
      navigation={
        <Navigation location={location.pathname}>
          <Navigation.Section
            items={[
              {
                url: "/dashboard",
                label: "Home",
                icon: HomeFilledIcon,
                selected: location.pathname === "/dashboard",
                onClick: () => navigate("/dashboard")
              },
              {
                url: "/product",
                label: "product",
                icon: OrderFilledIcon,
                selected: location.pathname === "/product",
                onClick: () => navigate("/product")
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
