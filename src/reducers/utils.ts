export function getReducedPayload (payload: any, toObject: boolean = false) {
  const map = (arr: Array<any>) => arr.map((cur: any): Array<any> => ({
    ...cur.fields,
    id: cur.id
  }));

  const { records } = payload;

  if (Array.isArray(payload)) {
    return map(payload);
  }
 
  if (!toObject && Array.isArray(records)) {
    return map(records);
  }

  if (records) {
    const fields = records.reduce((acc: object, cur: any): object => ({ ...acc, ...cur.fields, id: cur.id }), {});
    return fields;
  }

  return { ...payload, ...payload.fields }
}

export function update(array: Array<any>, payload: any): Array<any> {
  const newArray = [...array, getReducedPayload(payload)];
  return newArray;
}

/*
  SEARCH(
    "recJKCgej9ihrL2pK",
    ARRAYJOIN({ Classes }, " ")
  ) > -1
*/
