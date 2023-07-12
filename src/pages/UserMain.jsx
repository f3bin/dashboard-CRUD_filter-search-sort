import React from "react";
import SearchSort from "../components/searchSortsection/SearchSort";
import './UserMain.scss'
import AddUser from "../components/addUser/AddUser";
import UserTable from "../components/userTable/UserTable";

const UserMain = () => {
  return (
    <div className="userMain-container">
      <h2>Users</h2>
      <div className="header">
      <SearchSort />
      <AddUser />
      </div>
      <UserTable />
    </div>
  );
};

export default UserMain;
