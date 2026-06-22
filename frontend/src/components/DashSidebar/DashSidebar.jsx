import { NavLink } from "react-router-dom";
import "./DashSidebar.css";
import img from "@/assets/gidy_logo.png";
import { MdOutlineSpaceDashboard, MdOutlineDataSaverOn } from "react-icons/md";

const DashSidebar = () => {
  return (
    <div className="dash-sidebar">
      <div className="d-flex align-items-center dash-sidebar-header gap-3">
        <img src={img} alt="Gidy Logo" className="sidebar-logo" />
        <h6 className="sidebar-title mb-0">Dashboard</h6>
      </div>
      <div className="sidebar-menu">
        <NavLink to="/" className="sidebar-link" onClick={(e) => e.preventDefault()}>
          <MdOutlineSpaceDashboard />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/dashboard" className="sidebar-link">
          <MdOutlineDataSaverOn />
          <span>Gidy Logs</span>
        </NavLink>
      </div>
      <div className="sidebar-footer mt-auto">
        <div className="dashsidebar-upgrade">
          <p className="mb-0">Upgrade to Pro to get</p>
          <p className="mb-0">access all features!</p>
          <button className="upgrade-btn">Get Pro now!</button>
        </div>
      </div>
    </div>
  );
};

export default DashSidebar;
