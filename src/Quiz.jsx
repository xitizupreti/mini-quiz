import axios from "axios";
import React, { useEffect, useState } from "react";
import { Blocks } from "react-loader-spinner";

const url = "https://opentdb.com/api.php?amount=5";

const Quiz = () => {
  const [questionList, setQuestionList] = useState({});
  const [qqq, setqqq] = useState({});
  const [loading, setLoading] = useState(true);
  const [number, setNumber] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function Data() {
      const response = await axios.get(`${url}`);
      const { results } = response.data;
      setQuestionList(results);
      setqqq(results);
      setLoading(false);
    }
    Data();
  }, [showScore]);

  const handleQuestion = () => {
    setNumber(number + 1);
    if (number >= qqq.length - 1) {
      setShowScore(true);
      setNumber(0);
    }
  };
  // const getRandomProperty = (qqq) => {
  //   const keys = Object.keys(qqq);
  //   return keys[Math.floor(Math.random() * keys.length)];
  // };
  // console.log(getRandomProperty(qqq));
  // console.log(getRandomProperty(qqq));
  // console.log(getRandomProperty(qqq));

  if (loading) {
    return (
      <div>
        <Blocks
          visible={true}
          height="100%"
          width="500px"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
      </div>
    );
  }
  const { question, category, difficulty } = questionList[number];
  const { correct_answer, incorrect_answers } = qqq[number];
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
            You Scored {score}/{qqq.length}
          </h1>
        </div>
      ) : (
        <div className="container">
          <h1 id="q">
            ({category}) <br />
            Q. {question} <br /> ({difficulty})
          </h1>

          <div
            onClick={() => {
              setScore(score + 1);
              handleQuestion();
            }}
          >
            <label id="correct">{correct_answer}</label>
          </div>

          {incorrect_answers.map((item, index) => {
            return (
              <div onClick={handleQuestion} key={index}>
                <label id="wrong">{item}</label>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Quiz;
