import { atom, selector } from "recoil";

const storedToDos = localStorage.getItem("ToDos");
const parsedTodos = JSON.parse(storedToDos as string);

export interface IToDo {
  id: number;
  text: string;
}

interface IToDoState {
  // 추후 다양한 키를 가진 커스텀 보드를 생성할 수 있도록
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDoState",
  default: parsedTodos || {
    to_do: [],
    doing: [],
    done: [],
  },
});
