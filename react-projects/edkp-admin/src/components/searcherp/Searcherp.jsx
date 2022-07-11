import "./searcherp.scss"
import React, { useState } from "react";

const Searcherp = () => {
  const [searchItem, setSearchItem] = useState("");

  const handleChange = (e) => {
    console.log(e.target.value);
    setSearchItem(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchItem("");
  };

  return (
    <>
      <div className="search">
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Enter ERP"
            type="text"
            className="search"
            value={searchItem}
            onChange={handleChange}
          />
          {/* <button onClick={handleSubmit}>Submit</button> */}
        </form>
      </div>
    </>
  );
};

export default Searcherp;
