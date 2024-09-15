import React from 'react';
import { useDroppable } from '@dnd-kit/core';

const Droppable = ({ id, onDrop, children }) => {
  const {  setNodeRef } = useDroppable({ id });

  return (
    <div 
        ref={setNodeRef}
        style={{  width: '100%', height: '100%' }}
        onDrop={onDrop}
    >
      {children}
    </div>
  )
};

export default Droppable;