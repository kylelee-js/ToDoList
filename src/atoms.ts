import { atom, selector } from "recoil";

const storedToDo = localStorage.getItem("storedToDo");
const loadedToDo = JSON.parse(storedToDo as string);

interface ICustomCategory {
  category: string;
}

// type categories = "DONE" | "DOING" | "TODO";
// export enum Categories {
//   "TODO" = "TODO",
//   "DOING" = "DOING",
//   "DONE" = "DONE",
// }

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const categoryState = atom<string>({
  key: "category",
  default: "TODO",
});

export const customCategoryState = atom<ICustomCategory[]>({
  key: "customCategory",
  default: [{ category: "TODO" }, { category: "DOING" }, { category: "DONE" }],
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: loadedToDo || [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});

export const categorySelector = selector({
  key: "categorySelector",
  get: ({ get }) => {
    const ccsArr = get(customCategoryState);
    return ccsArr;
  },
});
