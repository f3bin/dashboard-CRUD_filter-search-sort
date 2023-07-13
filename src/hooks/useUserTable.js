import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../redux/userSlice"
import { updateUser } from "../redux/userSlice";

export const useUserTable = () => {

     const dispatch = useDispatch();
     const { searchedValue, sortedValue } = useSelector((state) => state.search);
     const { users } = useSelector((state) => state.users);

     //for editing username and user dob
     const [editingUserId, setEditingUserId] = useState(null);
     const [editName, setEditName] = useState("");
     const [editBirthDate, setEditBirthDate] = useState("");


     //Data will be filtered according to the searched value
     const filteredData = users.filter((item) =>
          item.name.toLowerCase().includes(searchedValue.toLowerCase())
     );

//creating a function named sort data with sorting date functonality
     const sortData = (data) => {
          const compareDates = (date1, date2) => new Date(date1) - new Date(date2);

          if (sortedValue === "asc") {
               return [...data].sort((a, b) => compareDates(a.birthDate, b.birthDate));
          }
          if (sortedValue === "desc") {
               return [...data].sort((a, b) => compareDates(b.birthDate, a.birthDate));
          }
          return data;
     };

     //passing the filtered data which filtered by name pass through the sortdata function for making it sort
     const sortedData = sortData(filteredData);

     const handleDeleteItem = (id) => {
          dispatch(deleteUser(id));
     };

     //for editing username and dob and also for updation
     const handleEditItem = (user) => {
          setEditingUserId(user.id);
          setEditName(user.name);
          setEditBirthDate(user.birthDate);
     };

     //for updating the values which got edited
     const handleUpdateItem = () => {
          if (editName && editBirthDate) {
               dispatch(
                    updateUser({
                         id: editingUserId,
                         name: editName,
                         birthDate: editBirthDate,
                    })
               );
               setEditingUserId(null);
               setEditName("");
               setEditBirthDate("");
          }
     };

     return {
          sortedData, handleDeleteItem, handleEditItem, handleUpdateItem,
          editingUserId, editName, editBirthDate, setEditName, setEditBirthDate
     }
}