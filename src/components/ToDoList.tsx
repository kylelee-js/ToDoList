import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  toDoState,
  toDoSelector,
  categoryState,
  customCategoryState,
} from "../atoms";
import CreateNewCategory from "./CreateNewCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const TODOS = useRecoilValue(toDoSelector);
  const [category, setCategoryState] = useRecoilState(categoryState);
  const [customCategoryArr, setCustomCategory] =
    useRecoilState(customCategoryState);
  useEffect(() => {
    if (toDos.length === 0) {
      const storedToDo = localStorage.getItem("storedToDo");
      const loadedToDo = JSON.parse(storedToDo as string);
      setToDos(loadedToDo);
    }
  }, []);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategoryState(event.currentTarget.value as any);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <select value={category} onInput={onInput}>
        {customCategoryArr.map((customCate, idx) => (
          <option key={idx} value={customCate.category}>
            {customCate.category}
          </option>
        ))}
      </select>
      <CreateNewCategory />
      <CreateToDo />
      <ul>{TODOS && TODOS.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}</ul>
    </div>
  );
}

export default ToDoList;
