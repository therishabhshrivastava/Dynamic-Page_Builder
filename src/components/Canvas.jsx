import React, { useState } from 'react';
import Droppable from './Droppable';
import { database, ref, set, get } from '../firebase';
import '../styles.css';

function Canvas({ elements, setElements }) {

    const [editing, setEditing] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [editId, setEditId] = useState(null);
    const [layoutName, setLayoutName] = useState('');

    const handleEdit = (id, currentValue) => {
        setEditing(true);
        setEditId(id);
        setEditValue(currentValue);
    };

    const handleSave = (id) => {
        setElements((prev) =>
            prev.map((el) =>
                el.id === id ? { ...el, value: editValue } : el
            )
        );
        setEditing(false);
        setEditId(null);
    };


    const handleChangeCheckbox = (id) => {
        setElements((prev) =>
            prev.map((el) =>
                el.id === id ? { ...el, value: !el.value } : el
            )
        );
    };

    const handleInputChange = (id, newValue) => {
        setElements((prev) =>
            prev.map((el) =>
                el.id === id ? { ...el, value: newValue } : el
            )
        );
    };

    const saveLayout = async () => {
        if (!layoutName) {
            alert('Please Enter Your Layout Name.');
            return;
        }
        try {
            await set(ref(database, `layouts/${layoutName}`), elements);
            alert('Layout Saved successfully!');
            setLayoutName('');
        } catch (error) {
            console.error('Error Saving Layout: ', error);
        }
    };

    const loadLayout = async () => {
        if (!layoutName) {
            alert('Please Enter Your Layout Name.');
            return;
        }
        try {
            const layoutRef = ref(database, `layouts/${layoutName}`);
            const snapshot = await get(layoutRef);
            if (snapshot.exists()) {
                setElements(snapshot.val());
            } else {
                alert('No Layout Found with this Name.');
            }
        } catch (error) {
            console.error('Error Loading Layout: ', error);
        }
    };

    const publishLayout = () => {
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Published Canvas</title>
                <style>
                    #canvas { 
                        display: grid; 
                        grid-template-columns: repeat(2, 300px); 
                        grid-auto-rows: 50px; 
                        gap: 10px; 
                        padding: 20px;
                    }
                    .item { 
                        display: flex; 
                        align-items: center; 
                        justify-content: center; 
                        padding: 5px; 
                        box-sizing: border-box; 
                        width: 100%; 
                    }
                    .button {
                        grid-column: 2; 
                    }
                </style>
            </head>
            <body>
                <div id="canvas">
                    ${elements.map(element => {
                    switch (element.id.split('-')[0]) {
                        case 'label':
                            return `<div class="item">
                                        <label>${element.value}</label>
                                    </div>`;

                        case 'input':
                            return `<div class="item">
                                        <input 
                                            type="text" 
                                            value="${element.value}" 
                                        />
                                    </div>`;

                        case 'checkbox':
                            return `<div class="item">
                                        <input 
                                            type="checkbox" 
                                            vale="${element.value ? 'checked' : ''}"
                                        />
                                    </div>`;

                        case 'button':
                            return `<div class="item button">
                                        <button>${element.value}</button>
                                    </div>`;

                        default:
                            return '';
                    }
                    }).join('')}
                </div>
            </body>
            </html>
        `;
    
        const newWindow = window.open('', '_blank');
        newWindow.document.open();
        newWindow.document.write(htmlContent);
    };
  

    return (
        <div className='canvas-container'>
            <div className='canvas-header'>
                <input
                type="text"
                placeholder="Enter layout name"
                value={layoutName}
                onChange={(e) => setLayoutName(e.target.value)}
                />
                <button onClick={saveLayout}>Save Layout</button>
                <button onClick={loadLayout}>Load Layout</button>
                <button onClick={publishLayout}>Publish</button>
            </div>
            <div className='canvas'>
                <Droppable id="canvas" className="droppable-area" >
                    <div
                        style={{
                        minHeight: '400px',
                        width: 'auto',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 300px)',
                        gridAutoRows: '50px',
                        gap: '10px',
                        padding: '20px',
                        boxSizing: 'border-box',
                        margin: 'auto',
                        }}
                    >
                        {elements.map((element) => {
                            const isEditing = editing && editId === element.id;

                            const style = {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '5px',
                                boxSizing: 'border-box',
                                width: '100%',
                                margin: 'auto',
                                overflow: 'hidden',
                            };

                            const handleClick = () => {
                                if (['label', 'button'].includes(element.id.split('-')[0])) {
                                    handleEdit(element.id, element.value);
                                }
                            };

                            if (isEditing) {
                                return (
                                    <div key={element.id} style={style}>
                                        <input
                                            type="text"
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            onBlur={() => handleSave(element.id)}
                                        />
                                    </div>
                                );
                            }

                            switch (element.id.split('-')[0]) {
                                case 'label':
                                    return (
                                        <div
                                            key={element.id}
                                            onClick={handleClick}
                                            style={style}
                                        >
                                        <label>{element.value}</label>
                                        </div>
                                    )

                                case 'input':
                                    return (
                                        <div 
                                            key={element.id}
                                            style={style}
                                        >
                                        <input
                                            type="text"
                                            value={element.value}
                                            onChange={(e) => handleInputChange(element.id, e.target.value)}
                                        />
                                        </div>
                                    )

                                case 'checkbox':
                                    return (
                                        <div 
                                            key={element.id}
                                            onClick={() => handleChangeCheckbox(element.id)}
                                            style={style}
                                        >
                                            <input
                                            type="checkbox"
                                            value={element.value}
                                            />
                                        </div>
                                    )

                                case 'button':
                                    return (
                                        <div 
                                            key={element.id}
                                            onClick={handleClick}
                                            style={{ ...style, gridColumn: '2' }}
                                        >
                                            <button>{element.value}</button>
                                        </div>
                                    )

                                default:
                                    return null;
                            }
                        })}
                    </div>
                </Droppable>
            </div>
        </div>
    )
}

export default Canvas;
