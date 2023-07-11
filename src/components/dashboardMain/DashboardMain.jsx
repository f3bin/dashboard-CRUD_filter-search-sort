import React from "react";
import "./DashboardMain.scss";
import { Link, Outlet } from "react-router-dom";
import { AiOutlineForm } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { PiCardsBold } from "react-icons/pi";
import { FaChartSimple } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const DashboardMain = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="dashboardMain-container">
      <div className="dashboard-options">
        <Link className="links" to="/dashboard/users">
          <h3>
            <FiUsers />
            Users
          </h3>
        </Link>
        <Link className="links" to="">
          <h3>
            <AiOutlineForm />
            Forms
          </h3>
        </Link>
        <Link className="links" to="">
          <h3>
            <PiCardsBold />
            Cards
          </h3>
        </Link>
        <Link className="links" to="">
          <h3>
            <FaChartSimple />
            Charts
          </h3>
        </Link>
       
      </div>
      <div className="dashboard-content">
      <div className="logout">
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardMain;
