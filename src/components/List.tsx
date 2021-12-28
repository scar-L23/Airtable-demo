import React from 'react';

interface IProps {
  list: Array<any>;
};

function WrappedList(wrapperProps: IProps){
  const { list } = wrapperProps;
  return (
    <div className="list-item-wrapper">
      {list.map((item, idx) => (
        <div className={"list-item"} key={idx}>
          <p><b>Name</b></p>
          <p>{item.Name}</p>
          <p><b>Students</b></p>
          <p>{item?.Students?.filter(Boolean).join(", ")}</p>
        </div>
      ))}
    </div>
  );
}

export default function List(props: IProps) {
  const list = props.list;

  if (list.length === 0) {
    return (
      <div className="">
        <p style={{ color: 'red' }}>No classes available</p>
      </div>
    );
  }

  const MemoizedList = React.memo(WrappedList);

  return (
    <div className='list-wrapper'>
      <MemoizedList list={list} />
    </div>
  );
};
