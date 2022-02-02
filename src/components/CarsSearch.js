import { useRef } from "react";

const SearchBar = (props) => {
  const ref = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.onSearch(ref.current.value);
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <h4>Search</h4>
      <input type="text" name="search" placeholder="search" ref={ref} />
      <input type="submit" value="Search" />
    </form>
  );
};

export default SearchBar;
