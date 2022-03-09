import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, customCategoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
  category: string;
  customCategory?: string;
}
function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [toDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const [customCategoryArr, setCustomCategory] =
    useRecoilState(customCategoryState);

  useEffect(() => {
    localStorage.setItem("storedToDo", JSON.stringify(toDos));
  }, [toDos]);

  const onValid = (TODOS: IForm) => {
    setToDos((prev) => [
      {
        text: TODOS.toDo,
        id: Date.now(),
        category,
        customCategory: TODOS.customCategory,
      },
      ...prev,
    ]);
    // setCategory를 통해 커스텀 카테고리 입력
    if (TODOS.customCategory !== "") {
      setCustomCategory((prev) => [TODOS.customCategory + "", ...prev]);
    }

    // hook-form의 객체 중  "toDo" 프로퍼티의 값을 변경
    setValue("toDo", "");
    setValue("category", "");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          placeholder="What to do?"
          {...register("toDo", {
            required: true,
            minLength: { value: 5, message: "too short" },
          })}
        />
        <input placeholder="Custom Category" {...register("customCategory")} />
        <button>Add</button>
      </form>
    </>
  );
}

export default CreateToDo;
