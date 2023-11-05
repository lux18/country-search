import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";
import { Input } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------------------------

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [error, setError] = useState("Not Found");
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/v3.1/all")
      .then((res) => {
        setCountries(res.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data negara:", error);
      });
  }, []);

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    const timeoutId = setTimeout(() => {
      if (search === "") {
        setFilteredCountries([]);
        setError();
        setShowResults(false);
      } else {
        const filtered = countries.filter((country) =>
          country.name.common.toLowerCase().includes(search.toLowerCase()),
        );
        setFilteredCountries(filtered.slice(0, 5));
        setError("Not Found");
        setShowResults(true);
      }
    }, 500);
    setTypingTimeout(timeoutId);
  }, [search, countries]);

  const openResults = (name) => {
    navigate(`/result/${name}`);
  };

  // ----------------------------------------------------------------------------------------

  return (
    <div className="container homeBody">
      <h1 style={{ fontSize: "72px" }}>Country</h1>
      <br />
      <div className="sectionHome1">
        <Input
          size="big"
          icon="search"
          iconPosition="right"
          placeholder="Type any country name"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className={`suggestResults ${showResults ? "active" : ""}`}>
          {filteredCountries.length === 0 ? (
            <p className="notFoundMessage text-danger pointer px-3 py-2">
              {error}
            </p>
          ) : (
            filteredCountries.map((country, index) => (
              <div key={index}>
                <p
                  onClick={() => openResults(country.name.common)}
                  className="px-3 py-2 pointer resultCountry"
                >
                  {country.name.common}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
