import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleNameChange = (e) => {
    const newValue = e.target.value;
    setCurrName(newValue);
    updateNodeField(id, 'inputName', newValue);
  };

  const handleTypeChange = (e) => {
    const newValue = e.target.value;
    setInputType(newValue);
    updateNodeField(id, 'inputType', newValue);
  };

  const handles = [
    { type: 'source', position: Position.Right, id: 'value' }
  ];

  return (
    <BaseNode 
      id={id} 
      label="Input" 
      selected={selected}
      handles={handles}
    >
      <div className="node-field">
        <label>Name:</label>
        <input 
          type="text" 
          value={currName} 
          onChange={handleNameChange} 
          className="node-input"
        />
      </div>
      <div className="node-field">
        <label>Type:</label>
        <select value={inputType} onChange={handleTypeChange} className="node-input">
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
}
