import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

interface IBoardProps {
  toDos: string[];
  droppableId: string;
}
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
  return (
    <Wrapper>
      <BoardTitle>{droppableId.toUpperCase().replace("_", "")}</BoardTitle>
      <Droppable droppableId={droppableId}>
        {(magic, snapshot) => (
          <CardBoard ref={magic.innerRef} {...magic.droppableProps}>
            {toDos.map((toDo, index) => (
              <DraggableCard key={index} toDo={toDo} index={index} />
            ))}

            {magic.placeholder}
          </CardBoard>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
