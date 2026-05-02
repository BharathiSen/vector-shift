import { useState } from 'react';
import { Position } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { LogOut } from 'lucide-react';
import { useStore } from '../store';

export const OutputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'outputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
    updateNodeField(id, 'outputType', e.target.value);
  };

  const handles = [
    { type: 'target', position: Position.Left, id: 'value' }
  ];

  return (
    <BaseNode 
      id={id} 
      label="Output" 
      selected={selected}
      icon={<LogOut size={18} />}
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
        <select value={outputType} onChange={handleTypeChange} className="node-select">
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </div>
    </BaseNode>
  );
}
