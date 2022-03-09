import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { toDoState, toDoSelector, categoryState, Categories } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const TODOS = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  useEffect(() => {
    if (toDos.length === 0) {
      const storedToDo = localStorage.getItem("storedToDo");
      const loadedToDo = JSON.parse(storedToDo as string);
      setToDos(loadedToDo);
    }
  }, []);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <select value={category} onInput={onInput}>
        <option value={Categories.TODO}>{Categories.TODO}</option>
        <option value={Categories.DOING}>{Categories.DOING}</option>
        <option value={Categories.DONE}>{Categories.DONE}</option>
      </select>
      <CreateToDo />
      <ul>{TODOS && TODOS.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}</ul>
    </div>
  );
}

export default ToDoList;
