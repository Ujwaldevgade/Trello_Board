import React, { useState, useEffect } from 'react';
import '../styles/Modal.css';

function Modal({ card, closeModal, updateCardDetails, deleteCard }) {
  // Set initial state when the modal is opened
  const [cardTitle, setCardTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || '');
  const [dueDate, setDueDate] = useState(card.dueDate || '');

  // Effect to reset the state when the card prop changes
  useEffect(() => {
    setCardTitle(card.title);
    setDescription(card.description || '');
    setDueDate(card.dueDate || '');
  }, [card]);

  const handleSave = () => {
    // Save the updated card details
    updateCardDetails({ title: cardTitle, description, dueDate });
    closeModal(); // Close modal after saving
  };

  const handleCancel = () => {
    // Close the modal without saving
    closeModal();
  };

  const handleDelete = () => {
    // Delete the card and close the modal
    deleteCard();
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Card</h2>
        <input
          type="text"
          placeholder="Title"
          value={cardTitle}
          onChange={(e) => setCardTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleDelete} className="delete-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
