import { BaseUrl } from '../utils/globals';

interface IStudentDetails {
  studentName: string;
};

function getRequestOptions(method: string = '') {
  return {
    method: method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.REACT_APP_API_KEY
    }
  };
}

function baseFetchApiUtil(url: string): Promise<any> {
  return fetch(BaseUrl + url, getRequestOptions())
    .then(res => res.json())
    .then(json => json)
    .catch(err => {
      throw err;
    });
}

export function fetchStudentDetails(payload: IStudentDetails): Promise<any> {
  return baseFetchApiUtil(`/Students?fields[]=Classes&view=Grid view&maxRecords=${1}&filterByFormula=({Name}="${payload.studentName}")`);
};

export function fetchAllClassesList(): Promise<any> {
  return baseFetchApiUtil(`/Classes?view=Grid view&fields[]=Students&fields[]=Name`);
}

export function fetchAllStudentsList(): Promise<any> {
  return baseFetchApiUtil('/Students?view=Grid view&fields[]=Name');
}

/*
https://airtable.com/app8ZbcPx7dkpOnP0/tblIzakozsIHPiZnI/viwi9EG3HlqIZ0Alh/recoQBxwU83QJq69L?blocks=hide

  ["recr0DOF3YWjN9wAH", "recwrHZ9zBIYFiU07", ]
  
  recr0DOF3YWjN9wAH;recwrHZ9zBIYFiU07;rectGHWsZVmkeRwGh

  IF({REGEX_MATCH({ARRAYJOIN({Classes}, ';')}, recr0DOF3YWjN9wAH)})

  IF({REGEX_MATCH('recr0DOF3YWjN9wAH;recwrHZ9zBIYFiU07;rectGHWsZVmkeRwGh', 'recr0DOF3YWjN9wAH')})
*/