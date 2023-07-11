import React, { useEffect, useState } from "react";
import "./UserList.scss";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getUsers } from "../../redux/userSlice";
import { searchItem } from "../../redux/filterSort";

import { AiFillDelete } from "react-icons/ai";
import { deleteUser } from "../../redux/userSlice";
import { v4 as uuid } from "uuid";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const searchedValue = useSelector((state) => state.search);
  const [sortOption, setSortOption] = useState("");
  const [newUser, setNewUser] = useState({
    id: uuid(),
    name: "",
    birthDate: "",
  });

  const filteredData = users.filter((item) =>
    item.name.toLowerCase().includes(searchedValue.toLowerCase())
  );

  // Sorting the data
  const sortData = (data) => {
    const compareDates = (date1, date2) => new Date(date1) - new Date(date2);

    if (sortOption === "asc") {
      return [...data].sort((a, b) => compareDates(a.birthDate, b.birthDate));
    }
    if (sortOption === "desc") {
      return [...data].sort((a, b) => compareDates(b.birthDate, a.birthDate));
    }
    return data;
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteUser(id));
  };

  const sortedData = sortData(filteredData);

  const handleSort = (event) => {
    setSortOption(event.target.value);
  };

  const handleNameChange = (e) => {
    setNewUser((prev) => ({ ...prev, name: e.target.value }));
  };
  const handleDateChange = (e) => {
    setNewUser((prev) => ({ ...prev, birthDate: e.target.value }));
  };

  const handleAddNewUser = () => {
    dispatch(addUser(newUser));
    setNewUser({ name: "", birthDate: "" });
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="UserList">
      <h2>Users</h2>
      {loading && <p>Loading ...</p>}
      {error && <p>Error ...</p>}
      <div className="search-sort-container">
        <div className="searchSort-1">
          <input
            type="text"
            placeholder="Search by name"
            value={searchedValue}
            onChange={(e) => dispatch(searchItem(e.target.value))}
          />
          <select value={sortOption} onChange={handleSort}>
            <option value="">Sort By</option>
            <option value="asc">Ascending (DOB)</option>
            <option value="desc">Descending (DOB)</option>
          </select>
        </div>
        <div className="searchSort-2">
          <div className="addUser-input">
            <label>Name</label>
            <input
              type="text"
              value={newUser.name}
              required
              placeholder="enter name"
              onChange={handleNameChange}
            />
            <label>Dob</label>
            <input
              required
              type="date"
              value={newUser.birthDate}
              onChange={handleDateChange}
            />
            <button
              onClick={handleAddNewUser}
              disabled={!newUser.name || !newUser.birthDate}
            >
              Add new User
            </button>
          </div>
        </div>
      </div>
      <div className="tableAdduserSection">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Dob</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedData &&
              sortedData.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.birthDate}</td>
                  <td>
                    <AiFillDelete
                      className="delete-button"
                      size={25}
                      onClick={() => handleDeleteItem(user.id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
