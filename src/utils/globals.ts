export const BaseUrl: string = `${process.env.REACT_APP_API_BASE_URL}/${process.env.REACT_APP_BASE_ID}`;

export function findByName(name: string, array: Array<any>): Array<any> {
  return array.find((x: any) => x.Name === name);
};

export function filterListById(list: Array<any>, list2: Array<string>) {
  return list.filter((x: any) => list2.includes(x.id));
};

export function getMappedStudentsNamesWithClasses(students: any, classes: any) {
  let mapped: { [key: string]: any } = {};
  for (let _class of classes) {
    mapped = students.reduce((acc: any, stud: any) => {
      if (_class.Students.includes(stud.id)) {
        return {
          ...acc,
          [_class.id]: {
            ...acc[_class.id],
            Class: _class.Name || "",
            Students: [...((acc[_class.id] && acc[_class.id].Students) || []), stud.Name]
          }
        }
      }
      return acc;
    }, mapped);
  }
  return mapped;
}

export function extractStudentDetailsFromMap(details: any, mapping: { [key: string]: any }): Array<any> {
  if (!details || (details && Object.keys(details).length === 0) || !mapping) return [];

  const list: Array<{ Name: string; Students: Array<string>; }> = [];
  Object.entries(mapping).forEach(([key, _]: Array<string | any>) => {
    if (details.Classes.includes(key)) {
      list.push({
        Name: mapping[key].Class, 
        Students: mapping[key].Students
      });
    }
  });
  return list;
}