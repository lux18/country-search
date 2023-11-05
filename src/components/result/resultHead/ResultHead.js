import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../result.css";

const ResultHead = () => {
  const { name } = useParams();
  const [countries, setCountries] = useState("");
  const [flagsSVG, setFlags] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/v3.1/name/${name}?fullText=true`)
      .then((res) => {
        const countryData = res.data[0];
        setCountries(countryData);
        setFlags(countryData.flags.svg);
      })
      .catch((error) => {
        console.error("Gagal mengambil data negara:", error);
      });
  }, [name]);

  return (
    <div>
      <button
        onClick={() => navigate("/")}
        className="btn btn-secondary botder-0 primarybgColor d-flex align-items-center px-4"
      >
        <FaArrowLeft className="me-2" />
        Back to Homepage
      </button>
      <br />
      <div className="d-flex align-items-center mb-3 py-2">
        <h1 className="mb-0">
          {countries && countries.name && countries.name.common}
        </h1>
        <img
          className="ms-3 shadow"
          style={{ height: "30px", width: "50px" }}
          src={flagsSVG}
          alt=""
        />
      </div>
      <div className="countryTagContainer">
        <div className="d-flex countryTagWrap justify-content-start mb-2">
          {countries.altSpellings &&
            countries.altSpellings.map(
              (altSpelling, index) =>
                altSpelling.length > 0 && (
                  <div key={index} className="me-2 countryTag">
                    {altSpelling}
                  </div>
                ),
            )}
        </div>
      </div>
      <br />
    </div>
  );
};

export default ResultHead;
