import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/home/Home";
import Result from "./components/result/Result";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import "./app.css";

// ----------------------------------------------------------------------------------------

axios.defaults.baseURL = "https://restcountries.com/";

// ----------------------------------------------------------------------------------------

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" index element={<Home />} />
          <Route path="/result/:name" element={<Result />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
