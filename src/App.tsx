import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './utils/store';

import { Header, LoginForm, List, Loader } from './components';
import {
  requestLoginByStudentName,
  requestClassesList,
  requestStudentsList,
  logout,
  setMappedStudentNamesWithClasses
} from './actions';
import { getMappedStudentsNamesWithClasses, extractStudentDetailsFromMap } from './utils/globals';
import './App.css';

interface IProps {};
interface IStudentState {
  isLoading: boolean;
  isLoggedIn: boolean;
  details: any;
  list: Array<any>;
  studentClassesMapping: { [key: string]: any };
};

interface IClassesState {
  isLoading: boolean;
  list: Array<any>;
};

function App(props: IProps) {
  const dispatch = useDispatch();
  const {
    isLoading,
    details,
    isLoggedIn,
    list: studentList,
    studentClassesMapping,
  }: IStudentState = useSelector((state: RootState): any => state.students);
  const {
    isLoading: isClassesLoading,
    list: classesList
  }: IClassesState = useSelector((state: RootState): any => state.classes);


  React.useEffect(() => {
    if (studentList.length > 0 && classesList.length > 0 && isLoggedIn) {
      const mapped = getMappedStudentsNamesWithClasses(studentList, classesList);
      dispatch(setMappedStudentNamesWithClasses(mapped));
    }
  }, [isLoggedIn, studentList, classesList, dispatch]);

  const handleStudentLogin = (payload: { studentName: string }) => {
    dispatch(requestLoginByStudentName(payload));
    dispatch(requestStudentsList());
    dispatch(requestClassesList());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isLoading || isClassesLoading) {
    return <Loader />;
  }

  const loggedInStudentDetails: Array<any> = extractStudentDetailsFromMap(details, studentClassesMapping);

  return (
    <div className="App">
      <Header logout={handleLogout} isLoggedIn={isLoggedIn}/>
      <div className="container">
        {!isLoggedIn && <LoginForm onSubmit={handleStudentLogin} />}
        {isLoggedIn && <List list={loggedInStudentDetails} />}
      </div>
    </div>
  );
}

export default App;
