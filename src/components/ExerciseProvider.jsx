import { useReducer } from "react";
import { randomScrambleForEvent } from "cubing/scramble";

import ExerciseContext from "../ExerciseContext";
import { solveFirstBlock } from "../utils";

const initialExerciseState = {
  scramble: "",
  solutions: [],
};

const exerciseReducer = (state, action) => {
  switch (action.type) {
    case "next_requested":
      return {
        ...state,
        scramble: action.scramble,
        solutions: action.solutions,
      };
  }
};

const ExerciseProvider = ({ children }) => {
  const [exercise, dispatch] = useReducer(
    exerciseReducer,
    initialExerciseState
  );

  const next = async () => {
    const scramble = await randomScrambleForEvent("333");
    const solutions = solveFirstBlock(scramble, 1);

    dispatch({
      type: "next_requested",
      scramble: scramble,
      solutions: solutions,
    });
    console.debug("next exercise set:", scramble, solutions);
  };

  return (
    <ExerciseContext value={{ exercise, next }}>{children}</ExerciseContext>
  );
};

export default ExerciseProvider;
