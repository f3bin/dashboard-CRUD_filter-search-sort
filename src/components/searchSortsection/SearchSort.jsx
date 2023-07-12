import { useSelector, useDispatch } from "react-redux";
import { searchItem, sortOption } from "../../redux/filterSort";

import "./SearchSort.scss";

const SearchSort = () => {
  const dispatch = useDispatch();
  const { searchedValue } = useSelector((state) => state.search);

  return (
    <div className="search-sort-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchedValue}
          onChange={(e) => dispatch(searchItem(e.target.value))}
        />
        <select
          value={sortOption}
          onChange={(e) => dispatch(sortOption(e.target.value))}
        >
          <option value="">Sort By</option>
          <option value="asc">Ascending (DOB)</option>
          <option value="desc">Descending (DOB)</option>
        </select>
      </div>
  
  );
};

export default SearchSort;
