import React, { useState, useCallback } from 'react';
import { DndContext } from '@dnd-kit/core';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import './styles.css';

const defaultValues = {
  label: 'New Label',
  input: '',
  checkbox: '',
  button: 'Button',
  table: ''
};

const App = () => {

  const [elements, setElements] = useState([]);

  const handleDragEnd = useCallback((event) => {
    const { over, active } = event;

    if (over?.id === 'canvas') {
      const newElement = {
        id: `${active.id}-${Date.now()}`,
        value: defaultValues[active.id] || ''
      };
      setElements((prev) => [...prev, newElement]);
      console.log('Dropped item:', newElement);
    } else {
      console.log('Nothing dropping on Canvas');
    }

  }, []);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="container">
        <Toolbar />
        <Canvas elements={elements} setElements={setElements} />
      </div>
    </DndContext>
  )
};

export default App;
