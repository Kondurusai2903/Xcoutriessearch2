import React, { useState, useEffect } from "react";
import "./xcountriessearch.css";
const Countrycards = ({ countryname, imgSrc, imgAlt }) => {
  return (
    <>
      <div className="countryCard">
        <img src={imgSrc} alt={imgAlt} width="100px" height="100px" />
        <h2 style={{ marginTop: ".5rem" }}>{countryname}</h2>
      </div>
    </>
  );
};
const Xcountriessearch = () => {
  const [apidata, setApidata] = useState([]);
  const [inputvalue, setInputvalue] = useState("");
  const [filtersearch, setFiltersearch] = useState([]);
  const [flag, setFlag] = useState(false);
  const API = "https://xcountriesapi.onrender.com/all";
  const res = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      setApidata(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    res();
  }, []);
  const searchresult = (val) => {
    setInputvalue(val);
    let filteredData = apidata.filter((country) =>
      country.name.toLowerCase().includes(val.toLowerCase())
    );
    filteredData.sort();
    setFlag(true);
    setFiltersearch(filteredData);
  };
  console.log(apidata, "this is filterdata");
  return (
    <div>
      <div class="container">
        <center>
          <input
            type="text"
            value={inputvalue}
            onChange={(e) => searchresult(e.target.value)}
            placeholder="Search for Countries"
          />
        </center>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {flag
          ? filtersearch.map((val, ind) => (
              <Countrycards
                countryname={val.name}
                imgSrc={val.flag}
                imgAlt={val.abbr}
                key={ind}
              />
            ))
          : apidata.map((val, ind) => (
              <Countrycards
                countryname={val.name}
                imgSrc={val.flag}
                imgAlt={val.abbr}
                key={ind}
              />
            ))}
      </div>
    </div>
  );
};

export default Xcountriessearch;
