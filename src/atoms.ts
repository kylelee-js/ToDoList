import { atom, selector } from "recoil";

interface IToDoState {
  // 추후 다양한 키를 가진 커스텀 보드를 생성할 수 있도록
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: "toDoState",
  default: {
    to_do: ["a", "b", "c", "d", "e", "f", "g"],
    doing: ["h", "i"],
    done: ["j", "k", "l"],
  },
});
