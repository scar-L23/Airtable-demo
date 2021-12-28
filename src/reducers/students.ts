import { IActionCreator } from '../actions';
import {
  STUDENT_DETAILS_REQUEST_BEGINS,
  STUDENT_DETAILS_REQUEST_SUCCESS,
  STUDENT_DETAILS_REQUEST_FAILED,
  STUDENT_LISTS_REQUEST_BEGINS,
  STUDENT_LISTS_REQUEST_SUCCESS,
  STUDENT_LISTS_REQUEST_FAILED,
  LOGOUT,
  SET_STUDENT_NAMES_MAPPED
} from '../actions/types';
import { getReducedPayload } from './utils';

interface IInitialState {
  list: Array<any>;
  details: any;
  isLoggedIn: boolean;
  isLoading: boolean;
  errors: string | any;
  studentClassesMapping: { [key: string]: any } | null
};

const initialState: IInitialState = {
  list: [],
  studentClassesMapping: null,
  details: null,
  isLoggedIn: false,
  isLoading: false,
  errors: null
};

export default function StudentsReducer(state: IInitialState = initialState, action: IActionCreator) {
  switch(action.type) {
    case STUDENT_DETAILS_REQUEST_BEGINS:
      return { ...state, isLoading: true };
    case STUDENT_DETAILS_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        details: { ...getReducedPayload(action.payload, true) }
      };
    case STUDENT_DETAILS_REQUEST_FAILED:
      return { ...state, isLoading: false, errors: "Unable to fetch details" };
    case STUDENT_LISTS_REQUEST_BEGINS:
      return { ...state, isLoading: true };
    case STUDENT_LISTS_REQUEST_SUCCESS:
      return { ...state, isLoading: false, list: getReducedPayload(action.payload) };
    case STUDENT_LISTS_REQUEST_FAILED:
      return { ...state, isLoading: false, errors: "Unable to fetch details" };
    case LOGOUT:
      return { ...state, isLoggedIn: false };
    case SET_STUDENT_NAMES_MAPPED:
      return {
        ...state,
        studentClassesMapping: {
          ...state.studentClassesMapping,
          ...action.payload
        }
      };
    default:
      return state;
  }
};