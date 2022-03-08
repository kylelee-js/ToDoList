import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm {
  toDo: string;
}
function CreateToDo() {
  const { register, handleSubmit, setValue, setError } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);

  const onValid = ({ toDo }: IForm) => {
    console.log(toDo);
    setToDos((prev) => [
      { text: toDo, id: Date.now(), category: "TODO" },
      ...prev,
    ]);

    // hook-form의 객체 중  "toDo" 프로퍼티의 값을 변경
    setValue("toDo", "");
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
        <button>Add</button>
      </form>
    </>
  );
}

export default CreateToDo;
