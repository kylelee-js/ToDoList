import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggableCard {
  toDo: string;
  index: number;
}

const Card = styled.div`
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 5px;
  background-color: ${(props) => props.theme.cardColor};
`;

function DraggableCard({ toDo, index }: IDraggableCard) {
  return (
    <Draggable key={toDo} index={index} draggableId={toDo}>
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
