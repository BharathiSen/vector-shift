import { useState } from 'react';
import { Position } from '@xyflow/react';
import { BaseNode } from './BaseNode';

export const IntegrationNode = ({ id, data, selected }) => {
  const [service, setService] = useState(data?.service || 'Slack');
  
  return (
    <BaseNode 
      id={id} 
      label="Integration" 
      selected={selected}
      handles={[
        { type: 'target', position: Position.Left, id: 'trigger' },
        { type: 'source', position: Position.Right, id: 'status' }
      ]}
    >
      <div className="node-field">
        <label>Service:</label>
        <select value={service} onChange={(e) => setService(e.target.value)} className="node-input">
          <option value="Slack">Slack</option>
          <option value="Discord">Discord</option>
          <option value="Email">Email</option>
          <option value="GitHub">GitHub</option>
        </select>
      </div>
    </BaseNode>
  );
};
