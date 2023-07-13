import React, { useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/userSlice";
import { useUserTable } from "../../hooks/useUserTable";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineSave, AiOutlineDelete } from "react-icons/ai";
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
                    <AiOutlineSave
                      className="editSave"
                      onClick={handleUpdateItem}
                    />
                  ) : (
                    <FiEdit3
                      className="editSave"
                      onClick={() => handleEditItem(user)}
                    />
                  )}
                  <AiOutlineDelete
                    className="delete-button"
                    size={29}
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
