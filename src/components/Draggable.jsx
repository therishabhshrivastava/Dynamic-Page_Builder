import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import '../styles.css';

const Draggable = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  
  const style = {
    transform
        : transform ? CSS.Translate.toString(transform) 
        : undefined,
  };

  return (
    <div 
        ref={setNodeRef}
        className="toolbar-item"
        style={style}
        {...listeners}
        {...attributes}
    >
      {children}
    </div>
  );
};

export default Draggable;
