import React, { useEffect } from "react";
import { FaTrash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/userSlice";
import { useUserTable } from "../../hooks/useUserTable";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillSave } from "react-icons/ai";
import "./UserTable.scss";

const UserTable = () => {
  const { loading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const {
    sortedData,
    handleDeleteItem,
    handleEditItem,
    handleUpdateItem,
    editingUserId,
    editName,
    editBirthDate,
    setEditBirthDate,
    setEditName,
  } = useUserTable();

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
                <td>
                  {editingUserId === user.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editingUserId === user.id ? (
                    <input
                      type="text"
                      value={editBirthDate}
                      onChange={(e) => setEditBirthDate(e.target.value)}
                    />
                  ) : (
                    user.birthDate
                  )}
                </td>
                <td>
                  {editingUserId === user.id ? (
                    <AiFillSave
                      className="editSave"
                      onClick={handleUpdateItem}
                      size={26}
                    />
                  ) : (
                    <MdModeEditOutline
                      className="editSave"
                      size={26}
                      onClick={() => handleEditItem(user)}
                    />
                  )}
                  <FaTrash
                    className="delete-button"
                    size={21}
                    onClick={() => handleDeleteItem(user.id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
