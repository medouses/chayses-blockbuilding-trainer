import { experimentalSolve3x3x3IgnoringCenters } from "cubing/search";
import { CubeLib, Solver } from "roux-trainers-utils";
import { faceletsToPattern } from "gan-cube-sample-utils";

const SEARCH_DEPTH_L = 0;
const SEARCH_DEPTH_R = 9;

const fbSolver = Solver.FbSolver();

const solveFirstBlock = (scramble, capacity) => {
  const cube = new CubeLib.CubieCube().apply(scramble);
  const solutions = fbSolver
    .solve(cube, SEARCH_DEPTH_L, SEARCH_DEPTH_R, capacity)
    .map((soln) => soln.moves.map((m) => m.toString()));

  return solutions;
};

const faceletsToScramble = async (facelets) => {
  const kPattern = faceletsToPattern(facelets);
  const solution = await experimentalSolve3x3x3IgnoringCenters(kPattern);
  const scramble = solution.invert().toString();

  return scramble;
};

export { solveFirstBlock, faceletsToScramble };
