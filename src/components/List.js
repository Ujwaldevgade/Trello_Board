import React, { useState } from 'react';
import Card from './Card';
import { useDrop } from 'react-dnd';
import '../styles/List.css';

function List({ list, lists, setLists }) {
  const [editListTitle, setEditListTitle] = useState(list.title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'CARD',
    drop: (draggedCard) => {
      if (draggedCard.list.id !== list.id) {
        const updatedLists = lists.map((lst) => {
          if (lst.id === draggedCard.list.id) {
            return {
              ...lst,
              cards: lst.cards.filter((c) => c.id !== draggedCard.card.id),
            };
          }
          if (lst.id === list.id) {
            return {
              ...lst,
              cards: [...lst.cards, draggedCard.card],
            };
          }
          return lst;
        });
        setLists(updatedLists);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addCard = (title) => {
    const updatedLists = lists.map((lst) =>
      lst.id === list.id
        ? { ...lst, cards: [...lst.cards, { id: Date.now(), title }] }
        : lst
    );
    setLists(updatedLists);
  };

  const deleteList = () => {
    setLists(lists.filter((lst) => lst.id !== list.id));
  };

  const saveListTitle = () => {
    const updatedLists = lists.map((lst) =>
      lst.id === list.id ? { ...lst, title: editListTitle } : lst
    );
    setLists(updatedLists);
    setIsEditingTitle(false);
  };

  const cancelEditListTitle = () => {
    setEditListTitle(list.title); // Reset to original title
    setIsEditingTitle(false); // Exit edit mode
  };

  return (
    <div ref={drop} className={`list ${isOver ? 'list-hover' : ''}`}>
      <div className="list-header">
        {isEditingTitle ? (
          <div className="list-edit-title">
            <input
              type="text"
              value={editListTitle}
              onChange={(e) => setEditListTitle(e.target.value)}
            />
            <button onClick={saveListTitle}>Save</button>
            <button onClick={cancelEditListTitle}>Cancel</button>
          </div>
        ) : (
          <>
            <h2>{list.title}</h2>
            <button onClick={() => setIsEditingTitle(true)}>Edit Title</button>
            <button onClick={deleteList}>Delete List</button>
          </>
        )}
      </div>
      <div className="list-body">
        {list.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            list={list}
            lists={lists}
            setLists={setLists}
          />
        ))}
      </div>
      <div className="add-card">
        <button onClick={() => addCard(prompt('Enter card title'))}>Add Card</button>
      </div>
    </div>
  );
}

export default List;
