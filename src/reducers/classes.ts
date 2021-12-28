import {
  CLASSES_LISTS_REQUEST_BEGINS,
  CLASSES_LISTS_REQUEST_SUCCESS,
  CLASSES_LISTS_REQUEST_FAILED,
} from '../actions/types';
import { IActionCreator } from '../actions';
import { getReducedPayload } from './utils';

interface IInitialState {
  list: Array<any>;
  isLoading: boolean;
  errors: string | any;
};

const initialState: IInitialState = {
  list: [],
  isLoading: false,
  errors: null
};

export default function ClassesReducer(state: IInitialState = initialState, action: IActionCreator) {
  switch(action.type) {
    case CLASSES_LISTS_REQUEST_BEGINS:
      return { ...state, isLoading: true };
    case CLASSES_LISTS_REQUEST_SUCCESS:
      return { ...state, isLoading: false, list: getReducedPayload(action.payload) };
    case CLASSES_LISTS_REQUEST_FAILED:
      return { ...state, isLoading: false, errors: 'Unable to fetch classes' };
    default:
      return state;
  }
};