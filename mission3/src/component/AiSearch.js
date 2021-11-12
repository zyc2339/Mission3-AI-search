import { useState } from "react";
import axios from "axios";

const AiSearch = () => {
  const [faqInput, setFaqInput] = useState("");
  // const [ansRes, setAnsRes] = useState();
  const [result, setResult] = useState([]);

  const noPunctuation = (e) => {
    return e.replace(/[^a-zA-Z ]/g, " ");
  };

  const handleFAQSubmit = () => {
    const cleanQuery = noPunctuation(faqInput);

    axios
      .post("http://localhost:3100/query", { queryText: cleanQuery })
      .then((response) => {
        const answerArray = response.data.result.results;
        let getText = [];
        answerArray.forEach((x) => getText.push(x.text));
        setResult(getText);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="faq-container">
      <h2>FAQ Search</h2>
      <p>If you have any questions, ask away!</p>

      <div className="faq-input-wrapper">
        <textarea
          className="faq-text-input"
          onChange={(e) => setFaqInput(e.target.value)}
        />
        <input
          value="SUBMIT QUERY"
          type="button"
          className="faq-submit-btn"
          onClick={() => handleFAQSubmit()}
        />
      </div>

      <div className="faq-output-module">
        {result ? (
          <>
            <h5>RESPONSE</h5>
            {result.map((x) => (
              <p className="disco-answer">{x}</p>
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AiSearch;
