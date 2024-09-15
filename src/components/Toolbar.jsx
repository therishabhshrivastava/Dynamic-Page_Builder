import React from 'react';
import Draggable from './Draggable';
import '../styles.css';

const Toolbar = () => {
  return (
    <div className="toolbar">
      <Draggable id="label">Label</Draggable>
      <Draggable id="input" >Input Box</Draggable>
      <Draggable id="checkbox" >Check Box</Draggable>
      <Draggable id="button">Button</Draggable>
    </div>
  )
};

export default Toolbar;