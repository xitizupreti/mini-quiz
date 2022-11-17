import axios from "axios";
import React, { useEffect, useState } from "react";
import { Blocks } from "react-loader-spinner";
const url = "https://opentdb.com/api.php?amount=5";

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
    return (
      <div>
        <Blocks
          visible={true}
          height="80%"
          width="400px"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
      </div>
    );
  }
  const { question, category, difficulty, correct_answer, incorrect_answers } =
    questionList[number];

  const answers = [
    { text: correct_answer, correct: true },
    ...incorrect_answers.map((answer) => ({ text: answer, correct: false })),
  ];

  // const shuffle = (array) => {
  //   let currentIndex = array.length,
  //     randomIndex;

  //   // While there remain elements to shuffle.
  //   while (currentIndex !== 0) {
  //     // Pick a remaining element.
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex--;

  //     // And swap it with the current element.
  //     [array[currentIndex], array[randomIndex]] = [
  //       array[randomIndex],
  //       array[currentIndex],
  //     ];
  //   }

  //   return array;
  // };
  const shuffle = (a) => {
    a.sort(() => Math.random() - 0.5);
  };
  shuffle(answers);

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
          <h1 id="q">
            ({category}) <br />
            Q. {question} <br /> ({difficulty})
          </h1>
          {answers.map((item, index) => {
            return (
              <label
                id={`${item.correct ? "correct" : "incorrect"}`}
                onTouchEnd={() => {
                  handleQuestion();
                  if (item.correct) {
                    setScore(score + 1);
                  }
                }}
                onMouseUp={() => {
                  handleQuestion();
                  if (item.correct) {
                    setScore(score + 1);
                  }
                }}
                key={index}
              >
                {item.text}
              </label>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Quiz;
