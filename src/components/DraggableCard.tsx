import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

interface IDraggableCard {
  boardId: string;
  toDo: string;
  index: number;
}

const Card = styled.div`
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 5px;
  background-color: ${(props) => props.theme.cardColor};
  display: flex;
  justify-content: space-between;
`;

const DeleteBtn = styled.button``;

function DraggableCard({ toDo, index, boardId }: IDraggableCard) {
  const setToDos = useSetRecoilState(toDoState);
  const deleteCard = () => {
    setToDos((allBoards) => {
      console.log(boardId);
      const currentToDos = [...allBoards[boardId]];
      currentToDos.splice(index, 1);
      return { ...allBoards, [boardId]: currentToDos };
    });
  };
  return (
    <Draggable key={toDo} index={index} draggableId={toDo}>
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDo}
          <DeleteBtn onClick={deleteCard}>X</DeleteBtn>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
