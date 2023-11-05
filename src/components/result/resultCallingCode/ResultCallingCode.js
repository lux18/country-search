import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../result.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const ResultCallingCode = () => {
  const { name } = useParams();

  const [callingCode, setCallingCode] = useState("");
  const [tooltipCallingCode, setTooltipCallingCode] = useState([]);
  const [tooltipCurrency, setTooltipCurrency] = useState([]);
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    axios
      .get(`/v3.1/name/${name}?fullText=true`)
      .then((res) => {
        const countryData = res.data[0];
        const callingCode = countryData.idd.root;
        const suffixes = countryData.idd.suffixes;
        const cleanedCode = callingCode.replace("+", "");
        const formattedCode = cleanedCode + suffixes;

        const CountryCode = Object.keys(res.data[0].currencies);
        console.log(CountryCode);

        setCallingCode(formattedCode);

        axios
          .get(`/v2/callingcode/${formattedCode}`)
          .then((res) => {
            setCurrency(res.data[0].currencies[0].code);

            const tooltipCC = res.data.map((item) => item.name);
            setTooltipCallingCode(tooltipCC);
          })
          .catch((error) => {
            console.error("Gagal mengambil data negara:", error);
          });

        axios
          .get(`/v2/currency/${CountryCode}`)
          .then((res) => {
            console.log(res.data);
            const tooltipCU = res.data.map((item) => item.name);
            setTooltipCurrency(tooltipCU);
          })
          .catch((error) => {
            console.error("Gagal mengambil data mata uang:", error);
          });
      })
      .catch((error) => {
        console.error("Gagal mengambil data negara:", error);
      });
  }, [name]);

  return (
    <div className="row">
      <div className="col-sm-12 col-md-6 mb-4">
        <div className="card p-4 callingCode ">
          <h3>Calling Code</h3>
          <h1 className="mt-0 mb-3 dataLatlong primaryTextColor">
            {callingCode}
          </h1>
          <div className="d-flex">
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip>
                  {Array.isArray(tooltipCallingCode) &&
                    tooltipCallingCode.map((item, index) => (
                      <div className="text-center" key={index}>
                        {item}
                      </div>
                    ))}
                </Tooltip>
              }
            >
              <h3
                variant="default"
                className="m-0 me-2 primaryTextColor text-decoration-underline pointer"
              >
                countries
              </h3>
            </OverlayTrigger>{" "}
            <h3 className="m-0">with this calling code</h3>
          </div>
        </div>
      </div>
      <div className="col-sm-12 col-md-6 mb-4">
        <div className="card p-4 callingCode ">
          <h3>Currency</h3>
          <h1 className="mt-0 mb-3 dataLatlong primaryTextColor">{currency}</h1>
          <div className="d-flex">
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip>
                  {Array.isArray(tooltipCurrency) &&
                    tooltipCurrency.map((item, index) => (
                      <div className="text-center" key={index}>
                        {item}
                      </div>
                    ))}
                </Tooltip>
              }
            >
              <h3
                variant="default"
                className="m-0 me-2 primaryTextColor text-decoration-underline pointer"
              >
                countries
              </h3>
            </OverlayTrigger>{" "}
            <h3 className="m-0">with this calling code</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCallingCode;
