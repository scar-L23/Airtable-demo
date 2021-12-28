import {
  CLASSES_LISTS_REQUEST_BEGINS,
  CLASSES_LISTS_REQUEST_FAILED,
  CLASSES_LISTS_REQUEST_SUCCESS,
  STUDENT_DETAILS_REQUEST_FAILED,
  STUDENT_DETAILS_REQUEST_BEGINS,
  STUDENT_DETAILS_REQUEST_SUCCESS,
  STUDENT_LISTS_REQUEST_BEGINS,
  STUDENT_LISTS_REQUEST_SUCCESS,
  STUDENT_LISTS_REQUEST_FAILED,
  LOGOUT,
  SET_STUDENT_NAMES_MAPPED
} from './types';
import {
  fetchAllClassesList,
  fetchAllStudentsList,
  fetchStudentDetails,
} from '../services';
import { AppDispatch } from '../utils/store';

export interface IActionCreator {
  type: string;
  payload?: any;
};

interface IStatus {
  [key: string]: string;
}

const StatusActionCreator = (status: IStatus) => {
  return {
    'begin': function(): IActionCreator {
      return { type: status.begin };
    },
    'success': function(payload: any = {}): IActionCreator {
      return { type: status.success, payload };
    },
    'failed': function(): IActionCreator {
      return { type: status.failed };
    }
  };
};

// Actions Creators

export const logout = (): IActionCreator => {
  return { type: LOGOUT };
};

export const setMappedStudentNamesWithClasses = (payload: { [key: string]: any }): IActionCreator => {
  return { type: SET_STUDENT_NAMES_MAPPED, payload };
}

// Async Actions

export const requestStudentsList = (): any => {
  const { begin, success, failed } = StatusActionCreator({ 
    begin: STUDENT_LISTS_REQUEST_BEGINS,
    success: STUDENT_LISTS_REQUEST_SUCCESS,
    failed: STUDENT_LISTS_REQUEST_FAILED
  });

  return async (dispatch: AppDispatch) => {
    dispatch(begin());
    try {
      const response = await fetchAllStudentsList();
      dispatch(success(response));
      return response;
    } catch (e) {
      dispatch(failed());
    }
  }
};

export const requestClassesList = () => {
  const { begin, success, failed } = StatusActionCreator({ 
    begin: CLASSES_LISTS_REQUEST_BEGINS,
    success: CLASSES_LISTS_REQUEST_SUCCESS,
    failed: CLASSES_LISTS_REQUEST_FAILED
  });

  return async (dispatch: AppDispatch) => {
    dispatch(begin());
    try {
      const response = await fetchAllClassesList();
      dispatch(success(response));
      return response;
    } catch (e) {
      dispatch(failed());
    }
  }
};

export const requestLoginByStudentName = (payload: any) => {
  const { begin, success, failed } = StatusActionCreator({ 
    begin: STUDENT_DETAILS_REQUEST_BEGINS, 
    success: STUDENT_DETAILS_REQUEST_SUCCESS,
    failed: STUDENT_DETAILS_REQUEST_FAILED
  });

  return async (dispatch: AppDispatch) => {
    dispatch(begin());
    try {
      const response = await fetchStudentDetails(payload);
      dispatch(success(response));
      return response;
    } catch (e) {
      dispatch(failed());
      throw e;
    }
  }

};
