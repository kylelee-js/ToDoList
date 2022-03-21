import GlobalStyle from "./GlobalStyle";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";
import DraggableCard from "./components/DraggableCard";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
`;
function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;

    if (destination?.droppableId == source.droppableId) {
      //same board
      setToDos((prev) => {
        const copiedToDos = [...prev[source.droppableId]];
        copiedToDos.splice(source.index, 1);
        copiedToDos.splice(destination.index, 0, draggableId);
        return { ...prev, [source.droppableId]: copiedToDos };
      });
    } else {
      //cross board
      setToDos((prev) => {
        const destinationToDos = [...prev[destination.droppableId]];
        const sourceToDos = [...prev[source.droppableId]];
        const draggedId = sourceToDos[source.index];
        sourceToDos.splice(source.index, 1);
        destinationToDos.splice(destination.index, 0, draggableId);
        return {
          ...prev,
          [destination.droppableId]: destinationToDos,
          [source.droppableId]: sourceToDos,
        };
      });
    }
  };
  return (
    <>
      <GlobalStyle />

      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((Id) => (
              <Board key={Id} droppableId={Id} toDos={toDos[Id]} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
