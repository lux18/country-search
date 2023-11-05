import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../result.css";
import globe from "../resultAssets/globe.svg";

const Result = () => {
  const { name } = useParams();

  const [countries, setCountries] = useState("");

  useEffect(() => {
    axios
      .get(`/v3.1/name/${name}?fullText=true`)
      .then((res) => {
        const countryData = res.data[0];
        setCountries(countryData);
      })
      .catch((error) => {
        console.error("Gagal mengambil data negara:", error);
      });
  }, [name]);

  return (
    <div className="row">
      <div className="col-sm-12 col-md-6 mb-4">
        <div className="card shadow p-4 cardLatlong ">
          <h3>Latlong</h3>
          <h1 className="mt-0 mb-3 dataLatlong primaryTextColor">
            {countries.latlng &&
              countries.latlng.map((num) => num.toFixed(2)).join(", ")}
          </h1>
          <img className="globeLatlong" src={globe} alt="" />
        </div>
      </div>
      <div className="col-sm-12 col-md-6 mb-4">
        <div className="card shadow p-4 cardLatlong ">
          <table className="mt-3">
            <tr>
              <td>
                <h4 className="fw-normal m-0 mb-3">Capital</h4>
                <h4 className="fw-normal m-0 mb-3">Region</h4>
                <h4 className="fw-normal m-0 mb-3">Subregion</h4>
              </td>
              <td>
                <h4 className="fw-normal m-0 mb-3 mx-2">:</h4>
                <h4 className="fw-normal m-0 mb-3 mx-2">:</h4>
                <h4 className="fw-normal m-0 mb-3 mx-2">:</h4>
              </td>
              <td>
                <h4 className="fw-semibold m-0 mb-3">{countries.capital}</h4>
                <h4 className="fw-semibold m-0 mb-3">{countries.region}</h4>
                <h4 className="fw-semibold m-0 mb-3">{countries.subregion}</h4>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Result;
