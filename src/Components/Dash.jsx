import axios from "axios";
import { useEffect, useState } from "react";
import Search from "../assets/Search.svg";

const Dash = () => {
  const [data, setData] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [searchData, setSearchData] = useState("");
  const [page, setPage] = useState(1);

  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  const handleClick = (e) => {
    setSearchData(e.target.value);
  };

  const handleNext = () => {
    setPage(page + 1);
    fetchData();
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
    fetchData();
  };

  const fetchData = () => {
    axios
      .get(
        `https://api.jikan.moe/v4/characters?page=${page}&limit=15&q=${searchData}&order_by=favorite&sort=desc`
      )
      .then((res) => {
        console.log("test", res?.data);
        if (res?.data?.data?.length === 0) {
          alert("Sorry No Anime found ");
        } else {
          setData(res?.data?.data);
        }
      });
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="main">
      <div>
        <form className="headForm" onChange={handleClick}>
          <input
            type="text"
            placeholder="Enter Here...."
            value={searchString}
            onChange={handleChange}
            className="inputField"
          />

          <img src={Search} onClick={handleClick} className="inputSubmit" />
        </form>
      </div>
      <div className="content">
        {Array.isArray(data) &&
          data?.map(({ name, images }) => {
            return (
              <>
                <div className="contentImage">
                  <img
                    src={images.jpg.image_url}
                    alt="wait"
                    className="image"
                  />
                  <h4 className="title">{name}</h4>
                </div>
              </>
            );
          })}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 50,
          marginLeft: 650,
          marginBottom: 100,
        }}
      >
        <button className="pageButton" onClick={handlePrevious}>
          Previous
        </button>
        <button className="pageButton" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Dash;
