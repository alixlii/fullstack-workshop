import React from 'react';

const ListEntry = props => (
  <div>
    {props.todo.name}
    <button onClick={() => {props.delete(props.todo.name)}}>DONE</button>
  </div>
)

export default ListEntry;