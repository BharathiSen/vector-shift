import { useState } from 'react';
import { Position } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const DatabaseNode = ({ id, data, selected }) => {
  const [dbType, setDbType] = useState(data?.dbType || 'Postgres');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleDbTypeChange = (e) => {
    const newValue = e.target.value;
    setDbType(newValue);
    updateNodeField(id, 'dbType', newValue);
  };
  
  return (
    <BaseNode 
      id={id} 
      label="Database" 
      selected={selected}
      handles={[
        { type: 'target', position: Position.Left, id: 'query' },
        { type: 'source', position: Position.Right, id: 'results' }
      ]}
    >
      <div className="node-field">
        <label>DB Type:</label>
        <select value={dbType} onChange={handleDbTypeChange} className="node-input">
          <option value="Postgres">Postgres</option>
          <option value="MongoDB">MongoDB</option>
          <option value="Redis">Redis</option>
        </select>
      </div>
    </BaseNode>
  );
};
