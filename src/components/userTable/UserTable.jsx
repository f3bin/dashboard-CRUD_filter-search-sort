import React, { useEffect ,useState  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/userSlice";
import { useUserTable } from "../../hooks/useUserTable";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineSave, AiOutlineDelete } from "react-icons/ai";
import "./UserTable.scss";

const UserTable = () => {
  const { loading, error } = useSelector((state) => state.users);
  const {searchedValue} =useSelector(state =>state.search)
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

  useEffect(() => {
    if (searchedValue.length >= 1) {
      goToPage(1);
    }
  }, [searchedValue]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sortedData.length / 6);

    // Get the current page's data
    const slicedData = sortedData.slice(
      (currentPage - 1) * 6,
      currentPage * 6
    );
  
      // Event handler for navigating to the previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Event handler for navigating to the next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Event handler for directly selecting a page
  const goToPage = (page) => {
    setCurrentPage(page);
  };


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
          {slicedData &&
            slicedData.map((user) => (
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


      <div>
      <button
    className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
    onClick={goToPreviousPage}
    disabled={currentPage === 1}
  >
    Previous
  </button>
  {/* Render page numbers */}
  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index + 1}
      className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
      onClick={() => goToPage(index + 1)}
      disabled={currentPage === index + 1}
    >
      {index + 1}
    </button>
  ))}
  <button
    className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
    onClick={goToNextPage}
    disabled={currentPage === totalPages}
  >
    Next
  </button>
      </div>
    </div>
  );
};

export default UserTable;
