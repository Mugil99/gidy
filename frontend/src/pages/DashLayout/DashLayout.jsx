import DashSidebar from "@/components/DashSidebar/DashSidebar";
import { Outlet } from "react-router-dom";

const DashLayout = () => {
  return (
    <>
      <DashSidebar />
      <main id="main" className="main">
        <div className="py-3 container-fluid pt-0">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default DashLayout;
