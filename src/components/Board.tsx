import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";

interface IBoardProps {
  toDos: IToDo[];
  droppableId: string;
}

interface IForm {
  toDo: string;
}

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    width: 90%;
    margin-bottom: 10px;
  }
`;
const BoardTitle = styled.h2`
  text-align: center;
  font-size: 30px;
  font-weight: 500;
  margin: 10px;
  margin-bottom: 20px;
`;
const CardBoard = styled.div`
  flex-grow: 1;
`;

const Wrapper = styled.div`
  padding: 10px;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.boardColor};
`;

function Board({ toDos, droppableId }: IBoardProps) {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const onValid = ({ toDo }: IForm) => {
    const newTodo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((prev) => {
      const currentToDos = [newTodo, ...prev[droppableId]];
      return { ...prev, [droppableId]: currentToDos };
    });
    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <BoardTitle>{droppableId.toUpperCase().replace("_", "")}</BoardTitle>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder="add tasks"
        />
      </Form>
      <Droppable droppableId={droppableId}>
        {(magic, snapshot) => (
          <CardBoard ref={magic.innerRef} {...magic.droppableProps}>
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                toDo={toDo.text}
                index={index}
                boardId={droppableId}
              />
            ))}

            {magic.placeholder}
          </CardBoard>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
