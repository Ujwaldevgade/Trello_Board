import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Footer from './components/Footer'; // Import the Footer component
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './styles/App.css';

function App() {
  const [lists, setLists] = useState([]);

  // Load lists from localStorage
  useEffect(() => {
    const savedLists = JSON.parse(localStorage.getItem('trello-lists'));
    if (savedLists) {
      setLists(savedLists);
    }
  }, []);

  // Save lists to localStorage
  useEffect(() => {
    localStorage.setItem('trello-lists', JSON.stringify(lists));
  }, [lists]);

  // Add a new list
  const addList = (title) => {
    const newList = {
      id: Date.now(),
      title,
      cards: [],
    };
    setLists([...lists, newList]);
  };

  // Reset the board
  const resetBoard = () => {
    setLists([]);
    localStorage.removeItem('trello-lists');
  };

  return (
    <DndProvider backend={HTML5Backend}>
    <div className="App">
      <header>
        <h1>Trello Clone</h1>
        <button onClick={resetBoard}>Reset Board</button>
      </header>
      <Board lists={lists} setLists={setLists} addList={addList} />
      <Footer /> {/* Add the Footer component here */}
    </div>
    </DndProvider>
  );
}

export default App;
