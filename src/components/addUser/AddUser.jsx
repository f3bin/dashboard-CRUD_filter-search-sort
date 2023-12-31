import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/userSlice";
import "./AddUser.scss";

const AddUser = () => {
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState({ name: "", birthDate: "" });

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

  return (
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
        Add User
      </button>
    </div>
  );
};

export default AddUser;
