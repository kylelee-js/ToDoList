import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { customCategoryState } from "../atoms";

interface IForm {
  newCategory: string;
}

function CreateNewCategory() {
  const setNewCategory = useSetRecoilState(customCategoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValue = ({ newCategory }: IForm) => {
    setNewCategory((categories) => [{ category: newCategory }, ...categories]);

    setValue("newCategory", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValue)}>
      <input
        {...register("newCategory", {
          required: "New Category",
        })}
        type="text"
        placeholder="Write a new category do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateNewCategory;
