import { combineReducers } from "redux";

import classes from './classes';
import students from './students';

const rootReducers = combineReducers({
  classes,
  students
});

export default rootReducers;