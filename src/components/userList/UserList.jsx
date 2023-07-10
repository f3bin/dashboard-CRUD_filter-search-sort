import React, { useEffect } from "react";
import "./UserList.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/userSlice";
import { searchItem } from "../../redux/filterSort";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const searchedValue = useSelector(state => state.search)
  console.log(searchedValue.length)

  const filteredData = users.filter((item) =>
  item.name.toLowerCase().includes(searchedValue.toLowerCase())
);


 
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="UserList">
      <h2>Dashboard</h2>
      {loading && <p>Loading ...</p>}
      {error && <p>Error ...</p>}
      <div className="search-sort-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchedValue}
          onChange={(e) => dispatch(searchItem(e.target.value))}
        />
        <select>
          <option value="">Sort By</option>
          <option value="name">Ascending</option>
          <option value="dob">Discending</option>
        </select>
      </div>
      <table>
        <tr>
          <th>Name</th>
          <th>Dob</th>
        </tr>
        {filteredData &&
          filteredData.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.birthDate}</td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default UserList;
