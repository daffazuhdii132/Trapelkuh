import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../components/ResponsiveAppBar";

function MainLayout() {
  return (
    <>
      <ResponsiveAppBar />
      <Outlet />
    </>
  );
}

export default MainLayout;
