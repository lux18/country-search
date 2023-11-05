import "./result.css";
import ResultHead from "./resultHead/ResultHead";
import ResultLatlong from "./resultLatlong/ResultLatLong";
import ResultCallingCode from "./resultCallingCode/ResultCallingCode";

const Result = () => {
  return (
    <div className="container resultBody">
      <br />
      <br />
      <ResultHead></ResultHead>
      <ResultLatlong></ResultLatlong>
      <ResultCallingCode></ResultCallingCode>
    </div>
  );
};

export default Result;
