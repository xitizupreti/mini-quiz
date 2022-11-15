import axios from "axios";
import React, { useEffect, useState } from "react";
const url = "https://opentdb.com/api.php?amount=5";
import { Blocks } from "react-loader-spinner";

const Quiz = () => {
  const [questionList, setQuestionList] = useState({});
  const [loading, setLoading] = useState(true);
  const [number, setNumber] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function Data() {
      const response = await axios.get(`${url}`);
      const { results } = response.data;
      setQuestionList(results);
      setLoading(false);
    }
    Data();
  }, [showScore]);

  const handleQuestion = () => {
    setNumber(number + 1);
    if (number >= questionList.length - 1) {
      setShowScore(true);
      setNumber(0);
    }
  };
  if (loading) {
    return <div><Blocks
    visible={true}
    height="100%"
    width="500px"
    ariaLabel="blocks-loading"
    wrapperStyle={{}}
    wrapperClass="blocks-wrapper"
  /></div>;
  }
  const { question, correct_answer, incorrect_answers } = questionList[number];
  return (
    <>
      {showScore ? (
        <div>
          <button
            onClick={() => {
              setShowScore(false);
              setScore(0);
            }}
          >
            Play again ?
          </button>
          <h1 id="ans">
            You Scored {score}/{questionList.length}
          </h1>
        </div>
      ) : (
        <div className="container">
          <h1 id="q">Q. {question}</h1>

          <div
            onClick={() => {
              setScore(score + 1);
              handleQuestion();
            }}
          >
            <label>1. {correct_answer}</label>
          </div>

          {incorrect_answers.map((item, index) => {
            return (
              <div onClick={handleQuestion} key={index}>
                <label>
                  {index + 2}. {item}
                </label>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Quiz;
