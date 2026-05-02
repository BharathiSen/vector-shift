import { useState } from 'react';
import { Position } from '@xyflow/react';
import { BaseNode } from './BaseNode';

export const LogicNode = ({ id, data, selected }) => {
  const [condition, setCondition] = useState(data?.condition || 'if (x > 0)');
  
  return (
    <BaseNode 
      id={id} 
      label="Logic" 
      selected={selected}
      handles={[
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'true', style: { top: '30%' } },
        { type: 'source', position: Position.Right, id: 'false', style: { top: '70%' } }
      ]}
    >
      <div className="node-field">
        <label>Condition:</label>
        <input 
          type="text" 
          value={condition} 
          onChange={(e) => setCondition(e.target.value)} 
          className="node-input"
        />
      </div>
    </BaseNode>
  );
};
