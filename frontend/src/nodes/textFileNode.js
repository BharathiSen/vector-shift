import { useState } from 'react';
import { Position } from '@xyflow/react';
import { BaseNode } from './BaseNode';

export const TextFileNode = ({ id, data, selected }) => {
  const [fileName, setFileName] = useState(data?.fileName || 'data.txt');
  
  return (
    <BaseNode 
      id={id} 
      label="Text File" 
      selected={selected}
      handles={[
        { type: 'source', position: Position.Right, id: 'file-content' }
      ]}
    >
      <div className="node-field">
        <label>File Name:</label>
        <input 
          type="text" 
          value={fileName} 
          onChange={(e) => setFileName(e.target.value)} 
          className="node-input"
        />
      </div>
    </BaseNode>
  );
};
