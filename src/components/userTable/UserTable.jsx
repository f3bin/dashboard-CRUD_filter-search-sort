import React,{useEffect} from "react";
import { FaTrash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/userSlice";
import { useUserTable } from "../../hooks/useUserTable";
import "./UserTable.scss";

const UserTable = () => {
  const { loading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const {sortedData ,handleDeleteItem} =useUserTable();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="tableAdduserSection">
      {loading && <p>Loading ...</p>}
      {error && <p>Error ...</p>}
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
                  {loading ? (
                    "Deleting..."
                  ) : (
                    <FaTrash
                      className="delete-button"
                      onClick={() => handleDeleteItem(user.id)}
                    />
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
