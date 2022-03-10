import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { customCategoryState, IToDo, toDoState } from "../atoms";

const CustomCategory = styled.button`
  border-radius: 50%;
  background-color: whitesmoke;
`;

function ToDo({ text, category, id }: IToDo) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [categories, setCustomeCategory] = useRecoilState(customCategoryState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((prev) => {
      const index = prev.findIndex((toDo) => toDo.id === id);

      const front = prev.slice(0, index);
      const back = prev.slice(index + 1);
      const newToDo = { text, id, category: name as any };
      const newArr = [...front, newToDo, ...back];
      return newArr;
    });
  };

  const onDelete = () => {
    setToDos((prev) => {
      const targetIndex = prev.findIndex((toDo) => toDo.id === id);
      const copyToDos = [...prev];
      copyToDos.splice(targetIndex, 1);
      return copyToDos;
    });
  };
  return (
    <>
      <li>
        <span>* {text}</span>
        {category !== "DOING" && (
          <button name={"DOING"} onClick={onClick}>
            Doing
          </button>
        )}
        {category !== "TODO" && (
          <button name={"TODO"} onClick={onClick}>
            To Do
          </button>
        )}
        {category !== "DONE" && (
          <button name={"DONE"} onClick={onClick}>
            Done
          </button>
        )}
        <button onClick={onDelete}>X</button>
      </li>
    </>
  );
}

export default ToDo;
