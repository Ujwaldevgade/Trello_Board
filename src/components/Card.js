import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import Modal from './Modal';
import '../styles/Card.css';

function Card({ card, list, lists, setLists }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CARD',
    item: { card, list },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const openModal = () => {
    setModalOpen(true);
  };

  const deleteCard = () => {
    const updatedLists = lists.map((lst) =>
      lst.id === list.id
        ? {
            ...lst,
            cards: lst.cards.filter((c) => c.id !== card.id),
          }
        : lst
    );
    setLists(updatedLists);
    setModalOpen(false);
  };

  const updateCardDetails = (updatedDetails) => {
    const updatedLists = lists.map((lst) =>
      lst.id === list.id
        ? {
            ...lst,
            cards: lst.cards.map((c) =>
              c.id === card.id ? { ...c, ...updatedDetails } : c
            ),
          }
        : lst
    );
    setLists(updatedLists);
    setModalOpen(false);
  };

  return (
    <div
      ref={drag}
      className="card"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={openModal}
    >
      {card.title}
      {isModalOpen && (
        <Modal
          card={card}
          closeModal={() => setModalOpen(false)}
          deleteCard={deleteCard}
          updateCardDetails={updateCardDetails}
        />
      )}
    </div>
  );
}

export default Card;