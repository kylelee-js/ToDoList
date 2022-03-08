import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (name: IToDo["category"]) => {
    setToDos((prev) => {
      const index = prev.findIndex((toDo) => toDo.id === id);

      const front = prev.slice(0, index);
      const back = prev.slice(index + 1);
      const newToDo = { text, id, category: name };
      const newArr = [...front, newToDo, ...back];
      return newArr;
    });
  };
  return (
    <>
      <li>
        <span>{text}</span>
        {category !== "DOING" && (
          <button name={category} onClick={() => onClick(category)}>
            Doing
          </button>
        )}
        {category !== "TODO" && (
          <button name={category} onClick={() => onClick(category)}>
            To Do
          </button>
        )}
        {category !== "DONE" && (
          <button name={category} onClick={() => onClick(category)}>
            Done
          </button>
        )}

        <button>To Do</button>
        <button>Done</button>
      </li>
    </>
  );
}

export default ToDo;
