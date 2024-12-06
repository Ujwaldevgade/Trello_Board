import React from 'react';
import List from './List';
import { useDrag, useDrop } from 'react-dnd';
import '../styles/Board.css';

function Board({ lists, setLists, addList }) {
  const handleAddList = () => {
    const title = prompt('Enter list title');
    if (title) {
      addList(title);
    }
  };

  // Drag-and-drop logic for lists
  const moveList = (draggedListId, targetListId) => {
    const draggedIndex = lists.findIndex((list) => list.id === draggedListId);
    const targetIndex = lists.findIndex((list) => list.id === targetListId);

    const reorderedLists = [...lists];
    const [draggedList] = reorderedLists.splice(draggedIndex, 1);
    reorderedLists.splice(targetIndex, 0, draggedList);

    setLists(reorderedLists);
  };

  return (
    <div className="board">
      <div className="board-header">
        <button onClick={handleAddList}>Add List</button>
      </div>
      <div className="board-body">
        {lists.map((list) => (
          <DraggableList
            key={list.id}
            list={list}
            lists={lists}
            setLists={setLists}
            moveList={moveList}
          />
        ))}
      </div>
    </div>
  );
}

function DraggableList({ list, lists, setLists, moveList }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'LIST',
    item: { id: list.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'LIST',
    hover: (draggedList) => {
      // Only trigger the move if the dragged list is different from the current list
      if (draggedList.id !== list.id) {
        moveList(draggedList.id, list.id);  // Move the list
      }
    },
  }));

  return (
    <div
      ref={(node) => drag(drop(node))} // Combine drag and drop refs
      className="list-container"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <List list={list} lists={lists} setLists={setLists} />
    </div>
  );
}

export default Board;
