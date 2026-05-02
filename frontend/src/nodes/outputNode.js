import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { LogOut } from 'lucide-react';

export const OutputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

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
          onChange={(e) => setCurrName(e.target.value)} 
          className="node-input"
        />
      </div>
      <div className="node-field">
        <label>Type:</label>
        <select value={outputType} onChange={(e) => setOutputType(e.target.value)} className="node-input">
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </div>
    </BaseNode>
  );
}
