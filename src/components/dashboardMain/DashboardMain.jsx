import React from "react";
import "./DashboardMain.scss";
import { Link, Outlet } from "react-router-dom";
import { AiOutlineHome, AiOutlineForm } from "react-icons/ai";
import { PiCardsBold } from 'react-icons/pi';
import {FaChartSimple} from 'react-icons/fa6';


const DashboardMain = () => {
  return (
    <div className="dashboardMain-container">
      <div className="dashboard-options">
        <Link className="links" to="/dashboard/users">
          <h3>
            <AiOutlineHome />
            Dashboard
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
            <PiCardsBold/>
            Cards
          </h3>
        </Link>
        <Link className="links" to="">
          <h3>
            <FaChartSimple/>
            Charts
          </h3>
        </Link>
      </div>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardMain;
