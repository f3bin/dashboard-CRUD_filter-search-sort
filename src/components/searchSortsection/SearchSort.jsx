import { useSelector, useDispatch } from "react-redux";
import { searchItem, sortOption } from "../../redux/filterSort";

import "./SearchSort.scss";

const SearchSort = () => {
  const dispatch = useDispatch();
  const { searchedValue,sortedValue } = useSelector((state) => state.search);

  return (
    <div className="search-sort-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchedValue}
          onChange={(e) => dispatch(searchItem(e.target.value))}
        />
        <select
         value={sortedValue}
          onChange={(e) => dispatch(sortOption(e.target.value))}
        >
          <option value="">Sort By</option>
          <option value="ascdob">Ascending (DOB)</option>
          <option value="descdob">Descending (DOB)</option>
          <option value="ascname">Ascending (NAME)</option>
          <option value="descname">Descending (NAME)</option>
        </select>
      </div>
  
  );
};

export default SearchSort;
