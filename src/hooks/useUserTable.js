
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../redux/userSlice"

export const useUserTable = () => {

     const dispatch = useDispatch();
     const { searchedValue, sortedValue } = useSelector((state) => state.search);
     const { users } = useSelector((state) => state.users);

     //Data will be filtered according to the searched value
     const filteredData = users.filter((item) =>
          item.name.toLowerCase().includes(searchedValue.toLowerCase())
     );



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

     const sortedData = sortData(filteredData);

     const handleDeleteItem = (id) => {
          dispatch(deleteUser(id));
     };

     return { sortedData, handleDeleteItem }
}